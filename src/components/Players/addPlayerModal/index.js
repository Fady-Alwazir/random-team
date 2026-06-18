import {
  Modal,
  Backdrop,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import { useContext, useState } from "react";
import { TeamsContext } from "../../../context/TeamsContext";

const AddPlayerModal = ({ open, handleClose, mode }) => {
  const { setPlayers } = useContext(TeamsContext);
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);
  const isDark = mode === "dark";

  const handleAdd = () => {
    if (!input.trim()) { setError(true); return; }

    const names = input.split(",").map((n) => n.trim()).filter(Boolean);
    names.forEach((name, i) => {
      setPlayers((prev) => [...prev, { name, id: Date.now() + i }]);
    });

    setInput("");
    setError(false);
    handleClose();
  };

  const handleClose_ = () => {
    setInput("");
    setError(false);
    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose_}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 300, sx: { backdropFilter: "blur(4px)", bgcolor: "rgba(0,0,0,0.6)" } }}
      sx={{ display: "flex", alignItems: "center", justifyContent: "center", px: { xs: 2, sm: 0 } }}
    >
      <Box
        sx={{
          outline: "none",
          width: { xs: "100%", sm: 420 },
          bgcolor: isDark ? "#0d1a2b" : "#ffffff",
          borderRadius: "16px",
          border: `1.5px solid ${isDark ? "rgba(34,197,94,0.2)" : "rgba(22,163,74,0.15)"}`,
          boxShadow: isDark
            ? "0 24px 60px rgba(0,0,0,0.6)"
            : "0 24px 60px rgba(0,0,0,0.12)",
          p: { xs: 3, sm: 4 },
          animation: "pop 0.25s ease both",
        }}
      >
        {/* Header */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 3 }}>
          <Box>
            <Typography
              sx={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 800,
                fontSize: "1.4rem",
                color: isDark ? "#f0f6ff" : "#0f172a",
                lineHeight: 1.2,
              }}
            >
              ✍️ Sign New Player
            </Typography>
            <Typography variant="caption" sx={{ color: isDark ? "#64748b" : "#9ca3af", mt: 0.5, display: "block" }}>
              Add one or multiple players at once
            </Typography>
          </Box>
          <IconButton
            onClick={handleClose_}
            size="small"
            sx={{
              borderRadius: "8px",
              color: isDark ? "#64748b" : "#9ca3af",
              "&:hover": { bgcolor: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)" },
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>

        {/* Tip */}
        <Box
          sx={{
            px: 2,
            py: 1.5,
            mb: 2.5,
            borderRadius: "8px",
            bgcolor: isDark ? "rgba(96,165,250,0.08)" : "rgba(59,130,246,0.06)",
            border: `1px solid ${isDark ? "rgba(96,165,250,0.15)" : "rgba(59,130,246,0.12)"}`,
          }}
        >
          <Typography variant="body2" sx={{ color: isDark ? "#93c5fd" : "#3b82f6", fontSize: "0.85rem", fontWeight: 500 }}>
            💡 Separate names with a comma to sign multiple players — e.g.{" "}
            <em>Messi, Ronaldo, Neymar</em>
          </Typography>
        </Box>

        {/* Input */}
        <TextField
          fullWidth
          label="Player name(s)"
          placeholder="e.g., John or John, Sarah, Alex"
          variant="outlined"
          value={input}
          onChange={(e) => { setInput(e.target.value); setError(false); }}
          onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleAdd(); } }}
          error={error}
          helperText={error ? "Please enter at least one name" : ""}
          multiline
          minRows={2}
          maxRows={4}
          sx={{
            mb: 3,
            "& .MuiOutlinedInput-root": {
              borderRadius: "10px",
              fontFamily: "'Barlow', sans-serif",
              fontWeight: 500,
              fontSize: "1rem",
              color: isDark ? "#f0f6ff" : "#0f172a",
              "& fieldset": { borderColor: isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.12)" },
              "&:hover fieldset": { borderColor: isDark ? "rgba(34,197,94,0.4)" : "rgba(22,163,74,0.35)" },
              "&.Mui-focused fieldset": { borderColor: isDark ? "#22c55e" : "#16a34a" },
            },
            "& .MuiInputLabel-root.Mui-focused": { color: isDark ? "#22c55e" : "#16a34a" },
          }}
        />

        {/* Actions */}
        <Box sx={{ display: "flex", gap: 1.5 }}>
          <Button
            fullWidth
            variant="outlined"
            onClick={handleClose_}
            sx={{
              borderRadius: "10px",
              py: 1.4,
              color: isDark ? "#64748b" : "#6b7280",
              borderColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
              "&:hover": { bgcolor: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)", borderColor: isDark ? "rgba(255,255,255,0.18)" : "rgba(0,0,0,0.18)" },
            }}
          >
            Cancel
          </Button>
          <Button
            fullWidth
            variant="contained"
            startIcon={<PersonAddAlt1Icon />}
            onClick={handleAdd}
            sx={{
              borderRadius: "10px",
              py: 1.4,
              bgcolor: isDark ? "#22c55e" : "#16a34a",
              color: "#fff",
              fontWeight: 700,
              "&:hover": { bgcolor: isDark ? "#16a34a" : "#15803d" },
            }}
          >
            Sign Player
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddPlayerModal;
