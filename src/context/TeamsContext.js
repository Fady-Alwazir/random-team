import React, { createContext, useState } from "react";

// Create a context
const TeamsContext = createContext();

// Create a provider component
const TeamsProvider = ({ children }) => {
  const [teams, setTeams] = useState([]);
  const [players, setPlayers] = useState([]);

  // Add a team

  return (
    <TeamsContext.Provider value={{ teams, players, setTeams, setPlayers }}>
      {children}
    </TeamsContext.Provider>
  );
};

export { TeamsContext, TeamsProvider };
