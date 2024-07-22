import { Box, Button, Typography } from "@mui/material";
import { TeamsContext } from "../../context/TeamsContext";
import { useContext, useState } from "react";
import Player from "./Player";
import AddPlayerModal from "./addPlayerModal";
const Players = () => {
  const { players } = useContext(TeamsContext);
  const [showPlayerModal, setShowPlayerModal] = useState(false);
  return (
    <Box
      sx={{ padding: "1rem", display: "flex", flexDirection: "column", gap: 2 }}
    >
      <Typography variant="h5" gutterBottom>
        Players
      </Typography>
      {players.map((player) => (
        <Player key={player.id} {...player} />
      ))}
      <Button
        sx={{
          backgroundColor: "#3f51b5",
          color: "white",
          "&:hover": {
            backgroundColor: "#303f9f",
          },
          maxWidth: "200px",
        }}
        onClick={() => setShowPlayerModal(true)}
      >
        Add Player
      </Button>
      <AddPlayerModal
        open={showPlayerModal}
        handleClose={() => setShowPlayerModal(false)}
      />
    </Box>
  );
};
export default Players;
