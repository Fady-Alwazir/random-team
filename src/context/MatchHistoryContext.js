import { createContext, useContext, useState, useEffect } from "react";

const MatchHistoryContext = createContext(null);

export const MatchHistoryProvider = ({ children }) => {
  const [sessions, setSessions] = useState(() => {
    try {
      const raw = localStorage.getItem("matchHistory");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("matchHistory", JSON.stringify(sessions));
    } catch {
      // storage quota exceeded
    }
  }, [sessions]);

  /** Save a completed draw session to history */
  const saveSession = (matches, scores) => {
    const now = new Date();
    const fmt = (side) =>
      side
        ? {
            name: side.team.name,
            image: side.team.image || "",
            ranking: side.team.ranking,
            players: [side.player1?.name, side.player2?.name].filter(Boolean),
          }
        : null;

    const session = {
      id: `s_${now.getTime()}`,
      timestamp: now.toISOString(),
      fixtures: matches.map((match) => {
        const s = scores[match.id] || {};
        return {
          id: match.id,
          teamA: fmt(match.teamA),
          // use manual teamB first, then selected opponent for waiting slots
          teamB: fmt(match.teamB) ?? fmt(s.opponent) ?? null,
          scoreA: typeof s.scoreA === "number" ? s.scoreA : null,
          scoreB: typeof s.scoreB === "number" ? s.scoreB : null,
        };
      }),
    };
    setSessions((prev) => [session, ...prev]);
  };

  const clearHistory = () => setSessions([]);

  return (
    <MatchHistoryContext.Provider value={{ sessions, saveSession, clearHistory }}>
      {children}
    </MatchHistoryContext.Provider>
  );
};

export const useMatchHistory = () => {
  const ctx = useContext(MatchHistoryContext);
  if (!ctx) throw new Error("useMatchHistory must be inside MatchHistoryProvider");
  return ctx;
};
