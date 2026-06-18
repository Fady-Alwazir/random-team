import {
  Modal, Backdrop, Box, Typography, IconButton, Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import { useContext, useEffect } from "react";
import { TeamsContext } from "../../../context/TeamsContext";
import TeamCard from "./teamCard";

const TeamsModal = ({ open, onClose, showAddTeam, setSelectedTeamId, mode }) => {
  const { teams, setTeams } = useContext(TeamsContext);
  const isDark = mode === "dark";

  useEffect(() => { setSelectedTeamId(null); }, [setSelectedTeamId]);

  useEffect(() => {
    if (!open || !teams?.length) return;
    const key = "teamImageCache";
    const cache = (() => { try { const c = JSON.parse(localStorage.getItem(key)); return c && typeof c === "object" ? c : {}; } catch { return {}; } })();
    let changed = false;
    const updated = teams.map((t) => {
      const c = cache[t.id];
      if (c?.image && c?.source === "sportsdb" && t.image !== c.image) { changed = true; return { ...t, image: c.image, imageSource: "sportsdb" }; }
      return t;
    });
    if (changed) setTeams(updated);
  }, [open, teams, setTeams]);

  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 300, sx: { backdropFilter: "blur(4px)", bgcolor: "rgba(0,0,0,0.6)" } }}
      sx={{ display: "flex", alignItems: "center", justifyContent: "center", px: { xs: 1.5, sm: 2 } }}
    >
      <Box
        sx={{
          outline: "none",
          width: { xs: "100%", sm: "90vw", md: 820 },
          maxHeight: { xs: "88vh", sm: "85vh" },
          bgcolor: isDark ? "#0d1a2b" : "#ffffff",
          borderRadius: "16px",
          border: `1.5px solid ${isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)"}`,
          boxShadow: isDark ? "0 24px 60px rgba(0,0,0,0.6)" : "0 24px 60px rgba(0,0,0,0.12)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          animation: "pop 0.25s ease both",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            px: { xs: 2.5, sm: 3 },
            py: 2.5,
            borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"}`,
            flexShrink: 0,
          }}
        >
          <Box>
            <Typography
              sx={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 800,
                fontSize: "1.4rem",
                color: isDark ? "#f0f6ff" : "#0f172a",
              }}
            >
              🏆 All Clubs
            </Typography>
            <Typography variant="caption" sx={{ color: isDark ? "#64748b" : "#9ca3af" }}>
              {teams?.length
                ? `${teams.length} club${teams.length !== 1 ? "s" : ""} registered`
                : "No clubs added yet"}
            </Typography>
          </Box>
          <IconButton
            onClick={onClose}
            size="small"
            sx={{
              borderRadius: "8px",
              color: isDark ? "#64748b" : "#9ca3af",
              "&:hover": { bgcolor: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)" },
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Grid */}
        <Box sx={{ flex: 1, overflowY: "auto", px: { xs: 2, sm: 3 }, py: 2.5 }}>
          {teams?.length > 0 ? (
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "repeat(2, 1fr)",
                  sm: "repeat(3, 1fr)",
                  md: "repeat(4, 1fr)",
                },
                gap: { xs: 1.5, sm: 2 },
              }}
            >
              {[...teams].sort((a, b) => b.ranking - a.ranking).map((team) => (
                <TeamCard
                  key={team.id}
                  team={team}
                  setSelectedTeamId={setSelectedTeamId}
                  showAddTeam={showAddTeam}
                  mode={mode}
                />
              ))}
            </Box>
          ) : (
            <Box sx={{ py: 6, textAlign: "center" }}>
              <Typography sx={{ fontSize: "2.5rem", mb: 1 }}>⚽</Typography>
              <Typography sx={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600, fontSize: "1.1rem", color: isDark ? "#64748b" : "#9ca3af" }}>
                No clubs yet
              </Typography>
              <Typography variant="caption" sx={{ color: isDark ? "#475569" : "#9ca3af" }}>
                Add your first club below
              </Typography>
            </Box>
          )}
        </Box>

        {/* Footer */}
        <Box
          sx={{
            px: { xs: 2.5, sm: 3 },
            py: 2,
            borderTop: `1px solid ${isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"}`,
            flexShrink: 0,
          }}
        >
          <Button
            fullWidth
            variant="contained"
            startIcon={<AddIcon />}
            onClick={showAddTeam}
            sx={{
              borderRadius: "10px",
              py: 1.5,
              bgcolor: isDark ? "#22c55e" : "#16a34a",
              color: "#fff",
              fontWeight: 700,
              "&:hover": { bgcolor: isDark ? "#16a34a" : "#15803d" },
            }}
          >
            Add New Club
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default TeamsModal;
