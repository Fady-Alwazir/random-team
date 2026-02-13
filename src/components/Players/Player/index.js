import { Box, Typography, IconButton, Chip, Fade } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { TeamsContext } from "../../../context/TeamsContext";
import { useContext, useState } from "react";

const Player = ({ name, id }) => {
  const { setPlayers } = useContext(TeamsContext);
  const [isDeleting, setIsDeleting] = useState(false);

  const deletePlayer = (id) => {
    setIsDeleting(true);
    setTimeout(() => {
      setPlayers((players) => players.filter((player) => player.id !== id));
    }, 200);
  };

  return (
    <Fade in={!isDeleting} timeout={300}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          py: 1.5,
          px: 1.5,
          borderRadius: "0.75rem",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          border: "1px solid transparent",
          "&:hover": {
            backgroundColor: "rgba(99, 102, 241, 0.08)",
            border: "1px solid rgba(99, 102, 241, 0.2)",
            transform: "translateX(4px)",
            boxShadow: "0 2px 8px rgba(99, 102, 241, 0.1)",
          },
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, flex: 1 }}>
          <CheckCircleIcon sx={{ fontSize: "1.2rem", color: "primary.main" }} />
          <Typography
            variant="body1"
            sx={{
              fontWeight: 600,
              color: "text.primary",
              fontSize: { xs: "0.95rem", sm: "1rem" },
            }}
          >
            {name}
          </Typography>
        </Box>
        <IconButton
          size="small"
          onClick={() => deletePlayer(id)}
          sx={{
            color: "error.main",
            backgroundColor: "transparent",
            "&:hover": {
              backgroundColor: "rgba(239, 68, 68, 0.12)",
              color: "error.dark",
              transform: "rotate(90deg) scale(1.1)",
            },
            transition: "all 0.3s ease",
          }}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Box>
    </Fade>
  );
};

export default Player;
