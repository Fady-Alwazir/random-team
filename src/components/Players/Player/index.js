import { Box, Typography, IconButton, TextField } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { useContext, useState } from "react";
import { TeamsContext } from "../../../context/TeamsContext";

const SHIRT_COLORS = [
  "#22c55e", "#60a5fa", "#f87171", "#fbbf24",
  "#a78bfa", "#34d399", "#f97316", "#e879f9",
];

const shirtColor = (name) => SHIRT_COLORS[name.charCodeAt(0) % SHIRT_COLORS.length];

const Player = ({ name, id, mode }) => {
  const { setPlayers } = useContext(TeamsContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(name);
  const [removing, setRemoving] = useState(false);
  const isDark = mode === "dark";
  const color = shirtColor(name);

  const remove = () => {
    setRemoving(true);
    setTimeout(() => setPlayers((p) => p.filter((x) => x.id !== id)), 220);
  };

  const save = () => {
    if (editedName.trim()) {
      setPlayers((p) => p.map((x) => (x.id === id ? { ...x, name: editedName.trim() } : x)));
      setIsEditing(false);
    }
  };

  const cancel = () => {
    setEditedName(name);
    setIsEditing(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1.5,
        py: 1.2,
        px: 1.5,
        borderRadius: "10px",
        bgcolor: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)",
        border: `1px solid ${isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"}`,
        opacity: removing ? 0 : 1,
        transform: removing ? "translateX(20px)" : "translateX(0)",
        transition: "opacity 0.2s ease, transform 0.2s ease",
        minHeight: 52,
        "&:hover": {
          bgcolor: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)",
        },
      }}
    >
      {/* Avatar / shirt */}
      <Box
        sx={{
          width: 36,
          height: 36,
          borderRadius: "8px",
          bgcolor: `${color}22`,
          border: `2px solid ${color}55`,
          color: color,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "'Barlow Condensed', sans-serif",
          fontWeight: 800,
          fontSize: "0.9rem",
          flexShrink: 0,
          letterSpacing: "0.02em",
        }}
      >
        {name.slice(0, 2).toUpperCase()}
      </Box>

      {/* Name / edit field */}
      <Box sx={{ flex: 1, minWidth: 0 }}>
        {isEditing ? (
          <TextField
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") save();
              if (e.key === "Escape") cancel();
            }}
            autoFocus
            size="small"
            variant="standard"
            fullWidth
            inputProps={{ style: { fontFamily: "'Barlow', sans-serif", fontWeight: 600, fontSize: "0.95rem" } }}
            sx={{
              "& .MuiInput-underline:after": {
                borderBottomColor: isDark ? "#22c55e" : "#16a34a",
              },
            }}
          />
        ) : (
          <Typography
            sx={{
              fontFamily: "'Barlow', sans-serif",
              fontWeight: 600,
              fontSize: "0.95rem",
              color: isDark ? "#f0f6ff" : "#0f172a",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {name}
          </Typography>
        )}
      </Box>

      {/* Actions */}
      <Box sx={{ display: "flex", gap: 0.5, flexShrink: 0 }}>
        {isEditing ? (
          <>
            <IconButton
              size="small"
              onClick={save}
              sx={{
                width: 34, height: 34, borderRadius: "8px",
                color: "#22c55e",
                bgcolor: "rgba(34,197,94,0.1)",
                "&:hover": { bgcolor: "rgba(34,197,94,0.2)" },
              }}
            >
              <CheckIcon sx={{ fontSize: 18 }} />
            </IconButton>
            <IconButton
              size="small"
              onClick={cancel}
              sx={{
                width: 34, height: 34, borderRadius: "8px",
                color: isDark ? "#64748b" : "#9ca3af",
                bgcolor: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)",
                "&:hover": { bgcolor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.07)" },
              }}
            >
              <CloseIcon sx={{ fontSize: 18 }} />
            </IconButton>
          </>
        ) : (
          <>
            <IconButton
              size="small"
              onClick={() => { setIsEditing(true); setEditedName(name); }}
              sx={{
                width: 34, height: 34, borderRadius: "8px",
                color: isDark ? "#60a5fa" : "#3b82f6",
                bgcolor: isDark ? "rgba(96,165,250,0.08)" : "rgba(59,130,246,0.06)",
                "&:hover": { bgcolor: isDark ? "rgba(96,165,250,0.16)" : "rgba(59,130,246,0.12)" },
              }}
            >
              <EditOutlinedIcon sx={{ fontSize: 16 }} />
            </IconButton>
            <IconButton
              size="small"
              onClick={remove}
              sx={{
                width: 34, height: 34, borderRadius: "8px",
                color: isDark ? "#f87171" : "#dc2626",
                bgcolor: isDark ? "rgba(248,113,113,0.08)" : "rgba(220,38,38,0.06)",
                "&:hover": { bgcolor: isDark ? "rgba(248,113,113,0.16)" : "rgba(220,38,38,0.12)" },
              }}
            >
              <DeleteOutlineIcon sx={{ fontSize: 16 }} />
            </IconButton>
          </>
        )}
      </Box>
    </Box>
  );
};

export default Player;
