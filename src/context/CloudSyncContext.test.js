/**
 * Runs the real providers against a small in-memory stand-in for Firestore,
 * to check what happens to data on sign up, sign in, edits and sign out.
 */
import { render, act, waitFor } from "@testing-library/react";
import { useContext } from "react";

const mockStore = new Map(); // path -> data
const mockListeners = new Set(); // { path, isCollection, cb }
let mockAuthCb = null;

const mockSnapFor = (l) =>
  l.isCollection
    ? {
        docs: [...mockStore.entries()]
          .filter(([p]) => p.startsWith(l.path + "/") && !p.slice(l.path.length + 1).includes("/"))
          .map(([, data]) => ({ data: () => data })),
      }
    : { exists: () => mockStore.has(l.path), data: () => mockStore.get(l.path) };

const mockNotify = () => mockListeners.forEach((l) => l.cb(mockSnapFor(l)));

const mockWrite = (ref, data, opts) => {
  const clean = JSON.parse(JSON.stringify(data));
  mockStore.set(ref.path, opts?.merge ? { ...mockStore.get(ref.path), ...clean } : clean);
};

jest.mock("../firebase", () => ({ db: {}, auth: {} }));

jest.mock("firebase/auth", () => ({
  onAuthStateChanged: (_auth, cb) => {
    mockAuthCb = cb;
    Promise.resolve().then(() => cb(null));
    return () => {};
  },
  createUserWithEmailAndPassword: jest.fn(),
  signInWithEmailAndPassword: jest.fn(),
  sendPasswordResetEmail: jest.fn(),
  signOut: jest.fn(),
}));

jest.mock("firebase/firestore", () => ({
  doc: (parent, ...segs) => ({ path: [parent.path, ...segs].filter(Boolean).join("/") }),
  collection: (_db, ...segs) => ({ path: segs.join("/"), isCollection: true }),
  serverTimestamp: () => "ts",
  getDoc: async (ref) => mockSnapFor(ref),
  setDoc: async (ref, data, opts) => {
    mockWrite(ref, data, opts);
    mockNotify();
  },
  onSnapshot: (ref, cb) => {
    const l = { path: ref.path, isCollection: ref.isCollection, cb };
    mockListeners.add(l);
    Promise.resolve().then(() => mockListeners.has(l) && cb(mockSnapFor(l)));
    return () => mockListeners.delete(l);
  },
  writeBatch: () => {
    const ops = [];
    return {
      set: (ref, data) => ops.push(() => mockWrite(ref, data)),
      delete: (ref) => ops.push(() => mockStore.delete(ref.path)),
      commit: async () => {
        ops.forEach((op) => op());
        mockNotify();
      },
    };
  },
}));

const { AuthProvider } = require("./AuthContext");
const { TeamsProvider, TeamsContext } = require("./TeamsContext");
const { MatchHistoryProvider, useMatchHistory } = require("./MatchHistoryContext");
const { CloudSyncProvider, useCloudSync } = require("./CloudSyncContext");
const { defaultPlayers } = require("../constans");

let app; // latest context values, captured by the probe
const Probe = () => {
  app = { ...useContext(TeamsContext), ...useMatchHistory(), ...useCloudSync() };
  return null;
};

const mount = async () => {
  render(
    <AuthProvider>
      <TeamsProvider>
        <MatchHistoryProvider>
          <CloudSyncProvider>
            <Probe />
          </CloudSyncProvider>
        </MatchHistoryProvider>
      </TeamsProvider>
    </AuthProvider>
  );
  await act(async () => {}); // let the initial "signed out" auth state arrive
};

const setUser = (user) => act(async () => { mockAuthCb(user); });
const synced = () => waitFor(() => expect(app.status).toBe("synced"));
const session = (id, timestamp) => ({ id, timestamp, fixtures: [] });

beforeEach(() => {
  mockStore.clear();
  mockListeners.clear();
  localStorage.clear();
});

test("sign up uploads the players, teams and history already on the device", async () => {
  localStorage.setItem("players", JSON.stringify([{ id: 9, name: "Guest Player" }]));
  localStorage.setItem("matchHistory", JSON.stringify([session("s1", "2026-01-01T00:00:00.000Z")]));
  await mount();
  await setUser({ uid: "u1" });
  await synced();

  expect(mockStore.get("users/u1").players).toEqual([{ id: 9, name: "Guest Player" }]);
  expect(mockStore.get("users/u1").teams.length).toBeGreaterThan(0);
  expect(mockStore.get("users/u1/sessions/s1").id).toBe("s1");
  expect(app.players).toEqual([{ id: 9, name: "Guest Player" }]);
  expect(localStorage.getItem("dataOwner")).toBe("u1");
});

test("signing in to an existing account loads its squad and keeps guest games", async () => {
  mockStore.set("users/u1", { players: [{ id: 1, name: "Cloud Player" }], teams: [{ id: 1, name: "Cloud FC" }] });
  mockStore.set("users/u1/sessions/s0", session("s0", "2026-01-01T00:00:00.000Z"));
  localStorage.setItem("players", JSON.stringify([{ id: 9, name: "Guest Player" }]));
  localStorage.setItem("matchHistory", JSON.stringify([session("s1", "2026-02-01T00:00:00.000Z")]));
  await mount();
  await setUser({ uid: "u1" });
  await synced();

  expect(app.players).toEqual([{ id: 1, name: "Cloud Player" }]);
  expect(app.teams).toEqual([{ id: 1, name: "Cloud FC" }]);
  expect(app.sessions.map((s) => s.id)).toEqual(["s1", "s0"]);
  expect(mockStore.has("users/u1/sessions/s1")).toBe(true);
  expect(mockStore.get("users/u1").players).toEqual([{ id: 1, name: "Cloud Player" }]);
});

test("edits are saved, and a stale snapshot can't undo an unsaved edit", async () => {
  mockStore.set("users/u1", { players: [{ id: 1, name: "A" }], teams: [{ id: 1, name: "T" }] });
  await mount();
  await setUser({ uid: "u1" });
  await synced();

  act(() => app.setPlayers((p) => [...p, { id: 2, name: "B" }]));
  await act(async () => { mockNotify(); }); // server echoes the old data before the save goes out
  expect(app.players.map((p) => p.name)).toEqual(["A", "B"]);

  await waitFor(() =>
    expect(mockStore.get("users/u1").players.map((p) => p.name)).toEqual(["A", "B"])
  );
  expect(mockStore.get("users/u1").teams).toEqual([{ id: 1, name: "T" }]);
});

test("saving and clearing match history is mirrored to the account", async () => {
  mockStore.set("users/u1", { players: [], teams: [] });
  await mount();
  await setUser({ uid: "u1" });
  await synced();

  act(() => app.setSessions([session("s5", "2026-05-01T00:00:00.000Z")]));
  await waitFor(() => expect(mockStore.has("users/u1/sessions/s5")).toBe(true));

  act(() => app.clearHistory());
  await waitFor(() => expect(mockStore.has("users/u1/sessions/s5")).toBe(false));
  expect(app.sessions).toEqual([]);
});

test("a change made on another device shows up here", async () => {
  mockStore.set("users/u1", { players: [{ id: 1, name: "A" }], teams: [] });
  await mount();
  await setUser({ uid: "u1" });
  await synced();

  await act(async () => {
    mockStore.set("users/u1", { players: [{ id: 1, name: "Renamed" }], teams: [] });
    mockStore.set("users/u1/sessions/s7", session("s7", "2026-07-01T00:00:00.000Z"));
    mockNotify();
  });
  expect(app.players).toEqual([{ id: 1, name: "Renamed" }]);
  expect(app.sessions.map((s) => s.id)).toEqual(["s7"]);
});

test("sign out removes the account's data from the device but not the cloud", async () => {
  mockStore.set("users/u1", { players: [{ id: 1, name: "Cloud Player" }], teams: [{ id: 1, name: "Cloud FC" }] });
  mockStore.set("users/u1/sessions/s0", session("s0", "2026-01-01T00:00:00.000Z"));
  await mount();
  await setUser({ uid: "u1" });
  await synced();
  await setUser(null);

  expect(app.status).toBe("guest");
  expect(app.players).toEqual(defaultPlayers);
  expect(app.sessions).toEqual([]);
  expect(localStorage.getItem("dataOwner")).toBeNull();
  await new Promise((r) => setTimeout(r, 800)); // past the save delay: nothing may be written
  expect(mockStore.get("users/u1").players).toEqual([{ id: 1, name: "Cloud Player" }]);
  expect(mockStore.has("users/u1/sessions/s0")).toBe(true);
});

test("guests are never synced", async () => {
  await mount();
  await setUser(null);
  act(() => app.setPlayers([{ id: 3, name: "Local Only" }]));
  await new Promise((r) => setTimeout(r, 800));
  expect(mockStore.size).toBe(0);
  expect(app.status).toBe("guest");
});
