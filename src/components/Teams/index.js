import { Box, Button, Typography, Stack } from "@mui/material";
import { useState } from "react";
import TeamsModal from "./TeamsModal";
import AddTeamModal from "./addTeamModal";
import StadiumIcon from "@mui/icons-material/Stadium";
import AddIcon from "@mui/icons-material/Add";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";

const Teams = ({ mode }) => {
  const [showTeams, setShowTeams] = useState(false);
  const [showAddTeam, setShowAddTeam] = useState(false);
  const [selectedTeamId, setSelectedTeamId] = useState(null);
  const isDark = mode === "dark";

  const openAddTeam = () => { setShowTeams(false); setShowAddTeam(true); };
  const closeAddTeam = () => { setShowAddTeam(false); setSelectedTeamId(null); };

  return (
    <Box
      sx={{
        mb: { xs: 3, sm: 4 },
        borderRadius: "14px",
        bgcolor: isDark ? "#0d1a2b" : "#ffffff",
        border: `1.5px solid ${isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"}`,
        overflow: "hidden",
        animation: "fadeUp 0.5s ease 0.22s both",
      }}
    >
      <Box sx={{ px: { xs: 2, sm: 3 }, pt: { xs: 2.5, sm: 3 }, pb: { xs: 2.5, sm: 3 } }}>
        {/* Header */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2.5 }}>
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: "10px",
              bgcolor: isDark ? "rgba(96,165,250,0.12)" : "rgba(59,130,246,0.08)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: isDark ? "#60a5fa" : "#3b82f6",
              flexShrink: 0,
            }}
          >
            <StadiumIcon />
          </Box>
          <Box>
            <Typography
              variant="h5"
              sx={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 700,
                fontSize: { xs: "1.25rem", sm: "1.5rem" },
                color: isDark ? "#f0f6ff" : "#0f172a",
                lineHeight: 1.2,
              }}
            >
              The Clubs
            </Typography>
            <Typography variant="caption" sx={{ color: isDark ? "#64748b" : "#9ca3af", fontSize: "0.8rem" }}>
              Manage clubs and their ratings
            </Typography>
          </Box>
        </Box>

        {/* Actions */}
        <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
          <Button
            fullWidth
            variant="contained"
            startIcon={<FormatListBulletedIcon />}
            onClick={() => setShowTeams(true)}
            sx={{
              borderRadius: "10px",
              py: 1.5,
              bgcolor: isDark ? "#3b82f6" : "#2563eb",
              color: "#fff",
              "&:hover": { bgcolor: isDark ? "#2563eb" : "#1d4ed8" },
            }}
          >
            View All Clubs
          </Button>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={openAddTeam}
            sx={{
              borderRadius: "10px",
              py: 1.5,
              color: isDark ? "#22c55e" : "#16a34a",
              borderColor: isDark ? "rgba(34,197,94,0.35)" : "rgba(22,163,74,0.3)",
              "&:hover": {
                bgcolor: isDark ? "rgba(34,197,94,0.08)" : "rgba(22,163,74,0.06)",
                borderColor: isDark ? "rgba(34,197,94,0.6)" : "rgba(22,163,74,0.55)",
              },
            }}
          >
            Add Club
          </Button>
        </Stack>
      </Box>

      <TeamsModal
        open={showTeams}
        onClose={() => setShowTeams(false)}
        showAddTeam={openAddTeam}
        setSelectedTeamId={setSelectedTeamId}
        mode={mode}
      />
      <AddTeamModal
        open={showAddTeam}
        onClose={closeAddTeam}
        openTeamsModal={() => setShowTeams(true)}
        selectedTeamId={selectedTeamId}
        mode={mode}
      />
    </Box>
  );
};

export default Teams;
