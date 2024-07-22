import { Box, Typography } from "@mui/material";
import { TeamsContext } from "../../context/TeamsContext";
import { useContext } from "react";
import Player from "./Player";
const Players = () => {
  const { players } = useContext(TeamsContext);
  return (
    <Box sx={{ padding: "1rem" }}>
      <Typography variant="h5" gutterBottom>
        Players
      </Typography>
      {players.map((player) => (
        <Player key={player.id} {...player} />
      ))}
    </Box>
  );
};
export default Players;
