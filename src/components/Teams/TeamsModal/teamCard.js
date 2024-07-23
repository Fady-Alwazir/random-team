//each team has an image i want to do it using avatar component from material ui and i waant to show the name  and under the name i want to show the rank using rating component from material ui and i want a delete icon to delete the team

import { Box, Typography, Avatar, Rating } from "@mui/material";
import { useContext } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { TeamsContext } from "../../../context/TeamsContext";

const TeamCard = ({ team }) => {
  const { setTeams } = useContext(TeamsContext);

  const deleteTeam = (id) => {
    setTeams((teams) => teams.filter((team) => team.id !== id));
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1rem",
        padding: "1rem",
        borderRadius: "5px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Avatar
        sx={{
          width: 100,
          height: 100,
        }}
        alt={team.name}
        src={team.image}
      />
      <Typography variant="h6">{team.name}</Typography>
      <Rating value={team.ranking} readOnly />
      <DeleteIcon
        sx={{
          cursor: "pointer",
          color: "red",
          "&:hover": {
            color: "darkred",
          },
        }}
        onClick={() => deleteTeam(team.id)}
      />
    </Box>
  );
};

export default TeamCard;
