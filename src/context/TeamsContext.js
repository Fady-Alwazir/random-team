import React, { createContext, useState } from "react";

// Create a context
const TeamsContext = createContext();

// Create a provider component
const TeamsProvider = ({ children }) => {
  const [teams, setTeams] = useState([]);
  const [players, setPlayers] = useState([
    { id: 1, name: "John Doe" },
    { id: 2, name: "qwwq sdsdsd" },
    { id: 3, name: "James Smith" },
    { id: 4, name: "Jane assas" },
  ]);

  // Add a team

  return (
    <TeamsContext.Provider value={{ teams, players, setTeams, setPlayers }}>
      {children}
    </TeamsContext.Provider>
  );
};

export { TeamsContext, TeamsProvider };
