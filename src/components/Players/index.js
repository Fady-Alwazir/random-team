import { Box, Button, Typography, Stack, LinearProgress } from "@mui/material";
import { TeamsContext } from "../../context/TeamsContext";
import { useContext, useState } from "react";
import Player from "./Player";
import AddPlayerModal from "./addPlayerModal";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";

const MAX_PLAYERS = 20;

const Players = ({ mode }) => {
  const { players } = useContext(TeamsContext);
  const [showModal, setShowModal] = useState(false);
  const isDark = mode === "dark";

  const count = players?.length || 0;
  const pct = (count / MAX_PLAYERS) * 100;

  return (
    <Box
      sx={{
        mb: { xs: 3, sm: 4 },
        borderRadius: "14px",
        bgcolor: isDark ? "#0d1a2b" : "#ffffff",
        border: `1.5px solid ${isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"}`,
        overflow: "hidden",
        animation: "fadeUp 0.5s ease 0.15s both",
      }}
    >
      {/* Section header */}
      <Box
        sx={{
          px: { xs: 2, sm: 3 },
          pt: { xs: 2.5, sm: 3 },
          pb: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 1.5,
          borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"}`,
        }}
      >
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
            ⚽ The Squad
          </Typography>
          <Typography
            variant="caption"
            sx={{
              color: isDark ? "#64748b" : "#9ca3af",
              fontSize: "0.8rem",
              fontWeight: 500,
            }}
          >
            {count} of {MAX_PLAYERS} players signed
          </Typography>
        </Box>

        <Button
          variant="contained"
          color="primary"
          size="small"
          startIcon={<PersonAddAlt1Icon />}
          onClick={() => setShowModal(true)}
          sx={{
            borderRadius: "8px",
            px: { xs: 1.5, sm: 2 },
            py: 1,
            fontSize: { xs: "0.85rem", sm: "0.95rem" },
            flexShrink: 0,
            bgcolor: isDark ? "#22c55e" : "#16a34a",
            color: "#fff",
            "&:hover": {
              bgcolor: isDark ? "#16a34a" : "#15803d",
            },
          }}
        >
          Sign Player
        </Button>
      </Box>

      {/* Capacity bar */}
      <Box sx={{ px: { xs: 2, sm: 3 }, py: 1.5 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.75 }}>
          <Typography variant="caption" sx={{ color: isDark ? "#64748b" : "#9ca3af", fontWeight: 600 }}>
            Squad capacity
          </Typography>
          <Typography
            variant="caption"
            sx={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 700,
              color: isDark ? "#22c55e" : "#16a34a",
            }}
          >
            {pct.toFixed(0)}%
          </Typography>
        </Box>
        <LinearProgress
          variant="determinate"
          value={pct}
          sx={{
            height: 6,
            borderRadius: 3,
            bgcolor: isDark ? "rgba(34,197,94,0.1)" : "rgba(22,163,74,0.08)",
            "& .MuiLinearProgress-bar": {
              borderRadius: 3,
              bgcolor: isDark ? "#22c55e" : "#16a34a",
            },
          }}
        />
      </Box>

      {/* Players list */}
      <Box sx={{ px: { xs: 2, sm: 3 }, pb: { xs: 2.5, sm: 3 } }}>
        {count > 0 ? (
          <Stack spacing={1}>
            {players.map((player) => (
              <Player key={player.id} {...player} mode={mode} />
            ))}
          </Stack>
        ) : (
          <Box
            sx={{
              py: 5,
              textAlign: "center",
              borderRadius: "10px",
              border: `1.5px dashed ${isDark ? "rgba(34,197,94,0.2)" : "rgba(22,163,74,0.18)"}`,
            }}
          >
            <Typography
              sx={{
                fontSize: "2rem",
                mb: 1,
                lineHeight: 1,
              }}
            >
              👥
            </Typography>
            <Typography
              sx={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 600,
                fontSize: "1rem",
                color: isDark ? "#64748b" : "#9ca3af",
                mb: 0.5,
              }}
            >
              No players yet
            </Typography>
            <Typography variant="caption" sx={{ color: isDark ? "#475569" : "#9ca3af" }}>
              Tap "Sign Player" to build your squad
            </Typography>
          </Box>
        )}
      </Box>

      <AddPlayerModal open={showModal} handleClose={() => setShowModal(false)} mode={mode} />
    </Box>
  );
};

export default Players;
