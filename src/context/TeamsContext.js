import React, { createContext, useEffect, useState } from "react";
import { defaultPlayers, defaultTeams } from "../constans";
import wc2026Teams from "../data/wc2026Teams.json";

const TeamsContext = createContext();

const TeamsProvider = ({ children }) => {
  const [teams, setTeams] = useState(() => {
    const stored = JSON.parse(localStorage.getItem("teams")) || defaultTeams;
    const hasWC = stored.some((t) => t.wc2026 === true);
    return hasWC ? stored : [...stored, ...wc2026Teams];
  });

  const [players, setPlayers] = useState(
    JSON.parse(localStorage.getItem("players")) || defaultPlayers
  );
  const [selectedTeams, setSelectedTeams] = useState([]);

  useEffect(() => {
    localStorage.setItem("players", JSON.stringify(players));
  }, [players]);

  useEffect(() => {
    localStorage.setItem("teams", JSON.stringify(teams));
  }, [teams]);

  return (
    <TeamsContext.Provider
      value={{ teams, players, setTeams, setPlayers, selectedTeams, setSelectedTeams }}
    >
      {children}
    </TeamsContext.Provider>
  );
};

export { TeamsContext, TeamsProvider };
