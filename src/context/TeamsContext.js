import React, { createContext, useEffect, useState } from "react";
import { defaultPlayers, defaultTeams } from "../constans";

// Create a context
const TeamsContext = createContext();

const TeamsProvider = ({ children }) => {
  const storedTeams = JSON.parse(localStorage.getItem("teams"));
  const storedPlayers = JSON.parse(localStorage.getItem("players"));

  const [teams, setTeams] = useState(storedTeams || defaultTeams);
  const [players, setPlayers] = useState(storedPlayers || defaultPlayers);

  useEffect(() => {
    localStorage.setItem("players", JSON.stringify(players));
  }, [players]);

  useEffect(() => {
    localStorage.setItem("teams", JSON.stringify(teams));
  }, [teams]);

  return (
    <TeamsContext.Provider value={{ teams, players, setTeams, setPlayers }}>
      {children}
    </TeamsContext.Provider>
  );
};

export { TeamsContext, TeamsProvider };
