import { createContext, useContext, useEffect, useRef, useState } from "react";
import {
  doc,
  collection,
  getDoc,
  setDoc,
  onSnapshot,
  writeBatch,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "./AuthContext";
import { TeamsContext } from "./TeamsContext";
import { useMatchHistory } from "./MatchHistoryContext";
import { defaultPlayers, defaultTeams } from "../constans";
import wc2026Teams from "../data/wc2026Teams.json";
import { planInitialSync, diffSessions, sortSessions } from "../sync/initialSync";

/**
 * Keeps players, teams and match history in sync with the signed-in user's
 * account. Signed out, the app works exactly as before (localStorage only).
 *
 * Firestore layout:
 *   users/{uid}                { players: [], teams: [], updatedAt }
 *   users/{uid}/sessions/{id}  one document per saved match session
 */

const OWNER_KEY = "dataOwner"; // uid the data on this device belongs to
const SAVE_DELAY = 600; // ms, groups quick edits into one write
const BATCH_SIZE = 400; // Firestore allows 500 writes per batch

const CloudSyncContext = createContext({ status: "guest" });

// All chunks are queued at once so local listeners never see a half-applied change.
const commitInChunks = (items, apply) => {
  const commits = [];
  for (let i = 0; i < items.length; i += BATCH_SIZE) {
    const batch = writeBatch(db);
    items.slice(i, i + BATCH_SIZE).forEach((item) => apply(batch, item));
    commits.push(batch.commit());
  }
  return Promise.all(commits);
};

const freshSquad = () => ({
  players: defaultPlayers,
  teams: [...defaultTeams, ...wc2026Teams],
  sessions: [],
});

export const CloudSyncProvider = ({ children }) => {
  const { user, loading } = useAuth();
  const { players, teams, setPlayers, setTeams } = useContext(TeamsContext);
  const { sessions, setSessions } = useMatchHistory();
  const uid = user?.uid || null;

  // guest | syncing | synced | error
  const [status, setStatus] = useState("guest");
  const [ready, setReady] = useState(false); // true once cloud data is loaded

  // Latest local state, readable from async code without re-subscribing.
  const local = useRef({ players, teams, sessions });
  local.current = { players, teams, sessions };

  // What the cloud is known to hold, used to skip writes that change nothing.
  const synced = useRef({ players: null, teams: null, sessionIds: new Set() });

  // ── Sign in: reconcile once, then listen for changes from other devices ──
  useEffect(() => {
    if (!uid) {
      setStatus("guest");
      setReady(false);
      // Signed out: the account's data leaves this device (it stays in the
      // cloud) so the next person to use or sign in here starts clean.
      if (!loading && localStorage.getItem(OWNER_KEY)) {
        const fresh = freshSquad();
        setPlayers(fresh.players);
        setTeams(fresh.teams);
        setSessions(fresh.sessions);
        localStorage.removeItem(OWNER_KEY);
      }
      return undefined;
    }

    let cancelled = false;
    const unsubs = [];
    const userRef = doc(db, "users", uid);
    const sessionsRef = collection(db, "users", uid, "sessions");
    const onError = () => !cancelled && setStatus("error");

    setStatus("syncing");
    setReady(false);
    synced.current = { players: null, teams: null, sessionIds: new Set() };

    (async () => {
      const owner = localStorage.getItem(OWNER_KEY);
      let snap = null;
      try {
        snap = await getDoc(userRef);
      } catch (err) {
        // Offline with nothing cached. Safe to carry on only if this device
        // already holds this user's data; the listeners catch up when online.
        if (owner !== uid) throw err;
      }
      if (cancelled) return;

      if (snap) {
        const plan = planInitialSync({ owner, uid, cloudExists: snap.exists() });
        let { players: p, teams: t, sessions: s } = local.current;

        if (plan.resetLocal) {
          ({ players: p, teams: t, sessions: s } = freshSquad());
          setPlayers(p);
          setTeams(t);
          setSessions(s);
        }
        if (plan.uploadSquad) {
          await setDoc(userRef, {
            players: p,
            teams: t,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
          });
        }
        if (plan.uploadLocalSessions && s.length) {
          await commitInChunks(s, (batch, session) =>
            batch.set(doc(sessionsRef, session.id), session)
          );
        }
        if (cancelled) return;
      }
      localStorage.setItem(OWNER_KEY, uid);

      let gotSquad = false;
      let gotSessions = false;
      const markReady = () => {
        if (gotSquad && gotSessions && !cancelled) {
          setReady(true);
          setStatus("synced");
        }
      };

      unsubs.push(
        onSnapshot(
          userRef,
          (docSnap) => {
            const data = docSnap.data() || {};
            ["players", "teams"].forEach((key) => {
              if (!Array.isArray(data[key])) return;
              const json = JSON.stringify(data[key]);
              const localJson = JSON.stringify(local.current[key]);
              const last = synced.current[key];
              // A local edit is waiting to be saved: it wins, so don't let an
              // older snapshot roll it back.
              if (last !== null && localJson !== last) return;
              synced.current[key] = json;
              if (json !== localJson) {
                (key === "players" ? setPlayers : setTeams)(data[key]);
              }
            });
            gotSquad = true;
            markReady();
          },
          onError
        )
      );

      unsubs.push(
        onSnapshot(
          sessionsRef,
          (querySnap) => {
            const cloud = sortSessions(querySnap.docs.map((d) => d.data()));
            synced.current.sessionIds = new Set(cloud.map((s) => s.id));
            const sameIds =
              cloud.length === local.current.sessions.length &&
              cloud.every((s, i) => s.id === local.current.sessions[i].id);
            if (!sameIds) setSessions(cloud);
            gotSessions = true;
            markReady();
          },
          onError
        )
      );
    })().catch(onError);

    return () => {
      cancelled = true;
      unsubs.forEach((u) => u());
    };
  }, [uid, loading, setPlayers, setTeams, setSessions]);

  // ── Local edits → cloud: players and teams ──
  useEffect(() => {
    if (!uid || !ready) return undefined;
    const changes = {};
    const p = JSON.stringify(players);
    const t = JSON.stringify(teams);
    if (p !== synced.current.players) changes.players = players;
    if (t !== synced.current.teams) changes.teams = teams;
    if (!Object.keys(changes).length) return undefined;

    const timer = setTimeout(() => {
      if (changes.players) synced.current.players = p;
      if (changes.teams) synced.current.teams = t;
      setDoc(
        doc(db, "users", uid),
        { ...changes, updatedAt: serverTimestamp() },
        { merge: true }
      ).catch(() => setStatus("error"));
    }, SAVE_DELAY);
    return () => clearTimeout(timer);
  }, [uid, ready, players, teams]);

  // ── Local edits → cloud: match history ──
  useEffect(() => {
    if (!uid || !ready) return;
    const { added, removed } = diffSessions(sessions, synced.current.sessionIds);
    if (!added.length && !removed.length) return;

    const sessionsRef = collection(db, "users", uid, "sessions");
    synced.current.sessionIds = new Set(sessions.map((s) => s.id));
    Promise.all([
      commitInChunks(added, (batch, s) => batch.set(doc(sessionsRef, s.id), s)),
      commitInChunks(removed, (batch, id) => batch.delete(doc(sessionsRef, id))),
    ]).catch(() => setStatus("error"));
  }, [uid, ready, sessions]);

  return <CloudSyncContext.Provider value={{ status }}>{children}</CloudSyncContext.Provider>;
};

export const useCloudSync = () => useContext(CloudSyncContext);
