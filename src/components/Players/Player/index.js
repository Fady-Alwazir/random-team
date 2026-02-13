import { Box, Typography, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { TeamsContext } from "../../../context/TeamsContext";
import { useContext } from "react";

const Player = ({ name, id }) => {
  const { setPlayers } = useContext(TeamsContext);

  const deletePlayer = (id) => {
    setPlayers((players) => players.filter((player) => player.id !== id));
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        py: 1.5,
        px: 0.5,
        transition: "all 0.2s ease",
        "&:hover": {
          backgroundColor: "rgba(99, 102, 241, 0.05)",
          borderRadius: "0.5rem",
          px: 1,
        },
      }}
    >
      <Typography
        variant="body1"
        sx={{
          fontWeight: 500,
          color: "text.primary",
        }}
      >
        {name}
      </Typography>
      <IconButton
        size="small"
        onClick={() => deletePlayer(id)}
        sx={{
          color: "error.main",
          "&:hover": {
            backgroundColor: "rgba(239, 68, 68, 0.1)",
            color: "error.dark",
          },
          transition: "all 0.2s ease",
        }}
      >
        <DeleteIcon fontSize="small" />
      </IconButton>
    </Box>
  );
};

export default Player;
