import {
  Box,
  Typography,
  IconButton,
  Fade,
  TextField,
  Avatar,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import PersonIcon from "@mui/icons-material/Person";
import { TeamsContext } from "../../../context/TeamsContext";
import { useContext, useState } from "react";

const Player = ({ name, id, mode }) => {
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

  // Generate consistent color from name
  const getAvatarGradient = (name) => {
    const colors = [
      ["#8b5cf6", "#a78bfa"],
      ["#06b6d4", "#22d3ee"],
      ["#f59e0b", "#fbbf24"],
      ["#ef4444", "#f87171"],
      ["#10b981", "#34d399"],
      ["#6366f1", "#818cf8"],
    ];
    const index = name.charCodeAt(0) % colors.length;
    return `linear-gradient(135deg, ${colors[index][0]} 0%, ${colors[index][1]} 100%)`;
  };

  return (
    <Fade in={!isDeleting} timeout={300}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 2,
          borderRadius: "1rem",
          background:
            mode === "dark"
              ? "rgba(139, 92, 246, 0.08)"
              : "rgba(99, 102, 241, 0.05)",
          border: `1px solid ${mode === "dark" ? "rgba(139, 92, 246, 0.15)" : "rgba(99, 102, 241, 0.1)"}`,
          backdropFilter: "blur(10px)",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          "&:hover": {
            background:
              mode === "dark"
                ? "rgba(139, 92, 246, 0.15)"
                : "rgba(99, 102, 241, 0.1)",
            border: `1px solid ${mode === "dark" ? "rgba(139, 92, 246, 0.3)" : "rgba(99, 102, 241, 0.2)"}`,
            transform: "translateX(8px) scale(1.01)",
            boxShadow:
              mode === "dark"
                ? "0 4px 20px rgba(139, 92, 246, 0.2)"
                : "0 4px 16px rgba(99, 102, 241, 0.15)",
          },
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, flex: 1 }}>
          <Avatar
            sx={{
              width: 44,
              height: 44,
              background: getAvatarGradient(name),
              boxShadow:
                mode === "dark"
                  ? "0 4px 12px rgba(139, 92, 246, 0.3)"
                  : "0 3px 10px rgba(99, 102, 241, 0.25)",
              fontWeight: 700,
              fontSize: "1.1rem",
            }}
          >
            {!isEditing && <PersonIcon />}
          </Avatar>
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
                  borderRadius: "0.75rem",
                  fontWeight: 600,
                  backgroundColor:
                    mode === "dark"
                      ? "rgba(17, 17, 27, 0.8)"
                      : "rgba(255, 255, 255, 0.9)",
                  "&:hover fieldset": {
                    borderColor:
                      mode === "dark"
                        ? "rgba(139, 92, 246, 0.5)"
                        : "rgba(99, 102, 241, 0.4)",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: mode === "dark" ? "#8b5cf6" : "#6366f1",
                  },
                },
              }}
            />
          ) : (
            <Typography
              variant="body1"
              sx={{
                fontWeight: 700,
                color: "text.primary",
                fontSize: { xs: "1rem", sm: "1.05rem" },
                letterSpacing: "0.01em",
              }}
            >
              {name}
            </Typography>
          )}
        </Box>
        <Box sx={{ display: "flex", gap: 1 }}>
          {isEditing ? (
            <>
              <IconButton
                size="small"
                onClick={handleSave}
                sx={{
                  color: "white",
                  background:
                    "linear-gradient(135deg, #10b981 0%, #34d399 100%)",
                  width: 36,
                  height: 36,
                  boxShadow: "0 4px 12px rgba(16, 185, 129, 0.3)",
                  "&:hover": {
                    background:
                      "linear-gradient(135deg, #059669 0%, #10b981 100%)",
                    transform: "scale(1.1)",
                    boxShadow: "0 6px 16px rgba(16, 185, 129, 0.4)",
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
                  color: "white",
                  background:
                    mode === "dark"
                      ? "rgba(248, 250, 252, 0.1)"
                      : "rgba(100, 116, 139, 0.6)",
                  width: 36,
                  height: 36,
                  "&:hover": {
                    background:
                      mode === "dark"
                        ? "rgba(248, 250, 252, 0.2)"
                        : "rgba(100, 116, 139, 0.8)",
                    transform: "scale(1.1)",
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
                  color: mode === "dark" ? "#a78bfa" : "#6366f1",
                  background:
                    mode === "dark"
                      ? "rgba(139, 92, 246, 0.15)"
                      : "rgba(99, 102, 241, 0.1)",
                  width: 36,
                  height: 36,
                  "&:hover": {
                    background:
                      mode === "dark"
                        ? "rgba(139, 92, 246, 0.25)"
                        : "rgba(99, 102, 241, 0.2)",
                    transform: "scale(1.1) rotate(15deg)",
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
                  color: mode === "dark" ? "#f87171" : "#ef4444",
                  background:
                    mode === "dark"
                      ? "rgba(239, 68, 68, 0.15)"
                      : "rgba(239, 68, 68, 0.1)",
                  width: 36,
                  height: 36,
                  "&:hover": {
                    background:
                      mode === "dark"
                        ? "rgba(239, 68, 68, 0.25)"
                        : "rgba(239, 68, 68, 0.2)",
                    transform: "scale(1.1) rotate(90deg)",
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
