import React, { createContext, useEffect, useState } from "react";
import { defaultPlayers } from "../constans";

// Create a context
const TeamsContext = createContext();

// Create a provider component
const TeamsProvider = ({ children }) => {
  const [teams, setTeams] = useState([]);
  const [players, setPlayers] = useState(
    JSON.parse(localStorage.getItem("players")).length !== 0
      ? JSON.parse(localStorage.getItem("players"))
      : defaultPlayers
  );
  useEffect(() => {
    localStorage.setItem("players", JSON.stringify(players));
  }, [players]);

  // Add a team

  return (
    <TeamsContext.Provider value={{ teams, players, setTeams, setPlayers }}>
      {children}
    </TeamsContext.Provider>
  );
};

export { TeamsContext, TeamsProvider };
