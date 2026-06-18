import {
  Modal, Backdrop, Box, Typography, TextField,
  Button, IconButton, Rating, Stack,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import { useContext, useEffect, useState } from "react";
import { TeamsContext } from "../../../context/TeamsContext";

const AddTeamModal = ({ open, onClose, selectedTeamId, mode }) => {
  const { teams, setTeams } = useContext(TeamsContext);
  const [form, setForm] = useState({ name: "", ranking: 0, image: "" });
  const [preview, setPreview] = useState("");
  const [error, setError] = useState(false);
  const isDark = mode === "dark";

  useEffect(() => {
    if (selectedTeamId) {
      const t = teams.find((x) => x.id === selectedTeamId);
      if (t) { setForm(t); setPreview(t.image || ""); }
    } else {
      setForm({ name: "", ranking: 0, image: "" });
      setPreview("");
    }
  }, [teams, selectedTeamId]);

  const handleClose_ = () => { setError(false); onClose(); };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (name === "image") setPreview(value);
  };

  const submit = () => {
    if (!form.name.trim()) { setError(true); return; }
    const imageSource = form.image ? "custom" : form.imageSource;
    if (selectedTeamId) {
      setTeams((prev) => prev.map((t) => t.id === selectedTeamId ? { ...t, ...form, imageSource } : t));
    } else {
      setTeams((prev) => [...prev, { ...form, imageSource, id: Date.now() }]);
    }
    setError(false);
    onClose();
    setForm({ name: "", ranking: 0, image: "" });
    setPreview("");
  };

  const inputSx = {
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
          width: { xs: "100%", sm: 440 },
          maxHeight: { xs: "88vh", sm: "90vh" },
          overflowY: "auto",
          bgcolor: isDark ? "#0d1a2b" : "#ffffff",
          borderRadius: "16px",
          border: `1.5px solid ${isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)"}`,
          boxShadow: isDark ? "0 24px 60px rgba(0,0,0,0.6)" : "0 24px 60px rgba(0,0,0,0.12)",
          p: { xs: 3, sm: 4 },
          animation: "pop 0.25s ease both",
          "&::-webkit-scrollbar": { width: "4px" },
          "&::-webkit-scrollbar-thumb": { bgcolor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)", borderRadius: "2px" },
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
              {selectedTeamId ? "✏️ Edit Club" : "🏟️ Add New Club"}
            </Typography>
            <Typography variant="caption" sx={{ color: isDark ? "#64748b" : "#9ca3af", display: "block", mt: 0.5 }}>
              {selectedTeamId ? "Update club details" : "Register a new club"}
            </Typography>
          </Box>
          <IconButton
            size="small"
            onClick={handleClose_}
            sx={{
              borderRadius: "8px",
              color: isDark ? "#64748b" : "#9ca3af",
              "&:hover": { bgcolor: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)" },
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>

        <Stack spacing={2.5}>
          <TextField
            fullWidth
            label="Club name"
            placeholder="e.g., Manchester City, Al-Hilal"
            name="name"
            value={form.name}
            onChange={handleChange}
            error={error && !form.name.trim()}
            helperText={error && !form.name.trim() ? "Club name is required" : ""}
            sx={inputSx}
          />

          <TextField
            fullWidth
            label="Badge image URL (optional)"
            placeholder="https://example.com/badge.png"
            name="image"
            value={form.image}
            onChange={handleChange}
            helperText="Leave blank to use club initials"
            sx={{
              ...inputSx,
              "& .MuiFormHelperText-root": { color: isDark ? "#475569" : "#9ca3af", fontSize: "0.78rem" },
            }}
          />

          {preview && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 1,
                py: 2,
                borderRadius: "10px",
                bgcolor: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)",
                border: `1px dashed ${isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)"}`,
              }}
            >
              <Typography variant="caption" sx={{ color: isDark ? "#64748b" : "#9ca3af", fontWeight: 600 }}>
                Badge preview
              </Typography>
              <Box
                component="img"
                src={preview}
                onError={() => setPreview("")}
                alt="Club badge"
                sx={{ width: 72, height: 72, borderRadius: "10px", objectFit: "cover", border: `2px solid ${isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.1)"}` }}
              />
            </Box>
          )}

          {/* Star rating */}
          <Box>
            <Typography
              variant="caption"
              sx={{ fontWeight: 600, color: isDark ? "#64748b" : "#9ca3af", display: "block", mb: 1 }}
            >
              Club rating
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Rating
                name="ranking"
                value={form.ranking}
                onChange={(_, v) => setForm((f) => ({ ...f, ranking: v }))}
                size="large"
                sx={{
                  "& .MuiRating-iconFilled": { color: "#fbbf24" },
                  "& .MuiRating-iconEmpty": { color: isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.12)" },
                  "& .MuiRating-icon": { fontSize: "2rem" },
                }}
              />
            </Box>
          </Box>
        </Stack>

        <Box sx={{ display: "flex", gap: 1.5, mt: 3 }}>
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
            startIcon={<SaveIcon />}
            onClick={submit}
            sx={{
              borderRadius: "10px",
              py: 1.4,
              bgcolor: isDark ? "#22c55e" : "#16a34a",
              color: "#fff",
              fontWeight: 700,
              "&:hover": { bgcolor: isDark ? "#16a34a" : "#15803d" },
            }}
          >
            {selectedTeamId ? "Save Changes" : "Add Club"}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddTeamModal;
