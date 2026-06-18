import { Box, Typography, Grid } from "@mui/material";
import { useContext } from "react";
import { TeamsContext } from "../../context/TeamsContext";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import GroupsIcon from "@mui/icons-material/Groups";
import EventIcon from "@mui/icons-material/Event";

const Header = ({ mode }) => {
  const { players, teams } = useContext(TeamsContext);
  const isDark = mode === "dark";

  const stats = [
    {
      label: "Players",
      value: players?.length || 0,
      icon: <GroupsIcon fontSize="small" />,
      color: isDark ? "#22c55e" : "#16a34a",
      bg: isDark ? "rgba(34,197,94,0.12)" : "rgba(22,163,74,0.08)",
    },
    {
      label: "Clubs",
      value: teams?.length || 0,
      icon: <SportsSoccerIcon fontSize="small" />,
      color: isDark ? "#60a5fa" : "#3b82f6",
      bg: isDark ? "rgba(96,165,250,0.12)" : "rgba(59,130,246,0.08)",
    },
    {
      label: "Fixtures",
      value: Math.floor((players?.length || 0) / 2),
      icon: <EventIcon fontSize="small" />,
      color: isDark ? "#fbbf24" : "#d97706",
      bg: isDark ? "rgba(251,191,36,0.12)" : "rgba(217,119,6,0.08)",
    },
  ];

  return (
    <Box sx={{ mb: { xs: 4, sm: 5 }, animation: "fadeUp 0.5s ease both" }}>
      {/* Hero */}
      <Box
        sx={{
          textAlign: "center",
          mb: { xs: 3, sm: 4 },
          px: 1,
        }}
      >
        {/* Ball icon */}
        <Box
          sx={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: { xs: 56, sm: 68 },
            height: { xs: 56, sm: 68 },
            borderRadius: "50%",
            bgcolor: isDark ? "rgba(34,197,94,0.15)" : "rgba(22,163,74,0.1)",
            mb: 2,
          }}
        >
          <SportsSoccerIcon
            sx={{
              fontSize: { xs: 30, sm: 36 },
              color: isDark ? "#22c55e" : "#16a34a",
            }}
          />
        </Box>

        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: "2rem", sm: "2.8rem", md: "3.4rem" },
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: "0.01em",
            color: isDark ? "#f0f6ff" : "#0f172a",
            mb: 1,
          }}
        >
          Squad Draw
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: isDark ? "#64748b" : "#6b7280",
            fontSize: { xs: "0.95rem", sm: "1.05rem" },
            maxWidth: 380,
            mx: "auto",
            lineHeight: 1.5,
          }}
        >
          Generate fair, random team matchups for your football session
        </Typography>
      </Box>

      {/* Stats row — 3 equal columns, works well on all screen sizes */}
      <Grid container spacing={{ xs: 1.5, sm: 2 }}>
        {stats.map((stat, i) => (
          <Grid item xs={4} key={i}>
            <Box
              sx={{
                borderRadius: "12px",
                bgcolor: isDark ? "#0d1a2b" : "#ffffff",
                border: `1.5px solid ${isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"}`,
                p: { xs: 1.5, sm: 2.5 },
                textAlign: "center",
                animation: `fadeUp 0.5s ease ${0.1 + i * 0.08}s both`,
              }}
            >
              <Box
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 36,
                  height: 36,
                  borderRadius: "8px",
                  bgcolor: stat.bg,
                  color: stat.color,
                  mb: 1,
                }}
              >
                {stat.icon}
              </Box>
              <Typography
                sx={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 800,
                  fontSize: { xs: "1.8rem", sm: "2.4rem" },
                  lineHeight: 1,
                  color: stat.color,
                }}
              >
                {stat.value}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  display: "block",
                  color: isDark ? "#64748b" : "#9ca3af",
                  fontWeight: 600,
                  fontSize: "0.75rem",
                  mt: 0.5,
                  letterSpacing: "0.02em",
                }}
              >
                {stat.label}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Header;
