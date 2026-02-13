import { Box, Typography, IconButton, Fade, TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { TeamsContext } from "../../../context/TeamsContext";
import { useContext, useState } from "react";

const Player = ({ name, id }) => {
  const { setPlayers } = useContext(TeamsContext);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(name);

  const deletePlayer = (id) => {
    setIsDeleting(true);
    setTimeout(() => {
      setPlayers((players) => players.filter((player) => player.id !== id));
    }, 200);
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditedName(name);
  };

  const handleSave = () => {
    if (editedName.trim()) {
      setPlayers((players) =>
        players.map((player) =>
          player.id === id ? { ...player, name: editedName.trim() } : player,
        ),
      );
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedName(name);
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
          {!isEditing && (
            <CheckCircleIcon
              sx={{ fontSize: "1.2rem", color: "primary.main" }}
            />
          )}
          {isEditing ? (
            <TextField
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleSave();
                } else if (e.key === "Escape") {
                  handleCancel();
                }
              }}
              autoFocus
              size="small"
              variant="outlined"
              sx={{
                flex: 1,
                "& .MuiOutlinedInput-root": {
                  borderRadius: "0.5rem",
                  fontWeight: 600,
                },
              }}
            />
          ) : (
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
          )}
        </Box>
        <Box sx={{ display: "flex", gap: 0.5 }}>
          {isEditing ? (
            <>
              <IconButton
                size="small"
                onClick={handleSave}
                sx={{
                  color: "success.main",
                  backgroundColor: "transparent",
                  "&:hover": {
                    backgroundColor: "rgba(46, 125, 50, 0.12)",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                <CheckIcon fontSize="small" />
              </IconButton>
              <IconButton
                size="small"
                onClick={handleCancel}
                sx={{
                  color: "text.secondary",
                  backgroundColor: "transparent",
                  "&:hover": {
                    backgroundColor: "rgba(0, 0, 0, 0.08)",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </>
          ) : (
            <>
              <IconButton
                size="small"
                onClick={handleEdit}
                sx={{
                  color: "primary.main",
                  backgroundColor: "transparent",
                  "&:hover": {
                    backgroundColor: "rgba(99, 102, 241, 0.12)",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                <EditIcon fontSize="small" />
              </IconButton>
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
            </>
          )}
        </Box>
      </Box>
    </Fade>
  );
};

export default Player;
