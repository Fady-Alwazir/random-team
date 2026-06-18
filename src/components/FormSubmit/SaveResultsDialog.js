import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from "@mui/material";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";

const SaveResultsDialog = ({ open, onSave, onSkip, onCancel, mode }) => {
  const isDark = mode === "dark";
  return (
    <Dialog
      open={open}
      onClose={onCancel}
      PaperProps={{
        sx: {
          borderRadius: "14px",
          bgcolor: isDark ? "#0d1a2b" : "#ffffff",
          border: `1.5px solid ${isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)"}`,
          boxShadow: isDark ? "0 24px 60px rgba(0,0,0,0.6)" : "0 24px 60px rgba(0,0,0,0.12)",
          mx: 2,
          width: { xs: "calc(100vw - 32px)", sm: 400 },
          maxWidth: 400,
          animation: "pop 0.2s ease both",
        },
      }}
    >
      <DialogTitle sx={{
        pb: 1,
        fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: "1.2rem",
        color: isDark ? "#f0f6ff" : "#0f172a",
      }}>
        Save current results?
      </DialogTitle>
      <DialogContent>
        <Typography sx={{ color: isDark ? "#94a3b8" : "#6b7280", fontSize: "0.9rem", lineHeight: 1.55 }}>
          You're about to draw new fixtures. Would you like to save the current results to match history first?
        </Typography>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2.5, gap: 1 }}>
        <Button
          onClick={onCancel}
          sx={{
            borderRadius: "8px", fontSize: "0.85rem",
            color: isDark ? "#64748b" : "#9ca3af",
            "&:hover": { bgcolor: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)" },
          }}
        >
          Cancel
        </Button>
        <Button
          variant="outlined"
          onClick={onSkip}
          sx={{
            borderRadius: "8px", fontSize: "0.85rem",
            color: isDark ? "#60a5fa" : "#3b82f6",
            borderColor: isDark ? "rgba(96,165,250,0.35)" : "rgba(59,130,246,0.35)",
            "&:hover": { bgcolor: isDark ? "rgba(96,165,250,0.08)" : "rgba(59,130,246,0.06)" },
          }}
        >
          Skip & Draw
        </Button>
        <Button
          variant="contained"
          onClick={onSave}
          startIcon={<SportsSoccerIcon />}
          sx={{
            borderRadius: "8px", fontSize: "0.85rem",
            bgcolor: isDark ? "#22c55e" : "#16a34a", color: "#fff",
            "&:hover": { bgcolor: isDark ? "#16a34a" : "#15803d" },
          }}
        >
          Save & Draw
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SaveResultsDialog;
