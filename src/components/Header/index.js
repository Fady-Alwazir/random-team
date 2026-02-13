import { Box, Typography, Grid, Card, CardContent, Fade } from "@mui/material";
import { useContext } from "react";
import { TeamsContext } from "../../context/TeamsContext";
import PeopleIcon from "@mui/icons-material/People";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import FlashOnIcon from "@mui/icons-material/FlashOn";

const Header = ({ mode }) => {
  const { players, teams } = useContext(TeamsContext);

  const stats = [
    {
      label: "Players",
      value: players?.length || 0,
      icon: <PeopleIcon sx={{ fontSize: 40 }} />,
      gradient:
        mode === "dark"
          ? "linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%)"
          : "linear-gradient(135deg, #6366f1 0%, #818cf8 100%)",
      color: mode === "dark" ? "#a78bfa" : "#6366f1",
    },
    {
      label: "Teams",
      value: teams?.length || 0,
      icon: <EmojiEventsIcon sx={{ fontSize: 40 }} />,
      gradient:
        mode === "dark"
          ? "linear-gradient(135deg, #06b6d4 0%, #22d3ee 100%)"
          : "linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%)",
      color: mode === "dark" ? "#22d3ee" : "#8b5cf6",
    },
    {
      label: "Possible Pairs",
      value: Math.floor((players?.length || 0) / 2),
      icon: <FlashOnIcon sx={{ fontSize: 40 }} />,
      gradient:
        mode === "dark"
          ? "linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)"
          : "linear-gradient(135deg, #10b981 0%, #34d399 100%)",
      color: mode === "dark" ? "#fbbf24" : "#10b981",
    },
  ];

  return (
    <Box sx={{ mb: { xs: 4, sm: 5, md: 7 } }}>
      {/* Hero Section with Glassmorphism */}
      <Fade in={true} timeout={1000}>
        <Box
          sx={{
            background:
              mode === "dark"
                ? "linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(6, 182, 212, 0.2) 100%)"
                : "linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(139, 92, 246, 0.15) 100%)",
            backdropFilter: "blur(20px)",
            borderRadius: "2rem",
            p: { xs: 4, sm: 5, md: 6 },
            mb: 4,
            border: `1px solid ${mode === "dark" ? "rgba(139, 92, 246, 0.3)" : "rgba(99, 102, 241, 0.2)"}`,
            boxShadow:
              mode === "dark"
                ? "0 25px 50px rgba(139, 92, 246, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
                : "0 20px 40px rgba(99, 102, 241, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.8)",
            position: "relative",
            overflow: "hidden",
            transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
            "&:hover": {
              transform: "translateY(-4px)",
              boxShadow:
                mode === "dark"
                  ? "0 30px 60px rgba(139, 92, 246, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
                  : "0 25px 50px rgba(99, 102, 241, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.8)",
            },
          }}
        >
          {/* Animated Background Elements */}
          <Box
            sx={{
              position: "absolute",
              top: "-30%",
              right: "-10%",
              width: "400px",
              height: "400px",
              borderRadius: "50%",
              background:
                mode === "dark"
                  ? "radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%)"
                  : "radial-gradient(circle, rgba(99, 102, 241, 0.2) 0%, transparent 70%)",
              filter: "blur(60px)",
              animation: "float 8s ease-in-out infinite",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              bottom: "-20%",
              left: "-5%",
              width: "350px",
              height: "350px",
              borderRadius: "50%",
              background:
                mode === "dark"
                  ? "radial-gradient(circle, rgba(6, 182, 212, 0.25) 0%, transparent 70%)"
                  : "radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)",
              filter: "blur(50px)",
              animation: "float 10s ease-in-out infinite reverse",
            }}
          />

          <Box sx={{ position: "relative", zIndex: 1, textAlign: "center" }}>
            <Typography
              variant="h1"
              sx={{
                fontWeight: 900,
                mb: 2,
                fontSize: { xs: "2.5rem", sm: "3.5rem", md: "4.5rem" },
                background:
                  mode === "dark"
                    ? "linear-gradient(135deg, #a78bfa 0%, #22d3ee 50%, #fbbf24 100%)"
                    : "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #10b981 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                textShadow: "none",
                letterSpacing: "-0.03em",
              }}
            >
              Team Pair Generator
            </Typography>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 400,
                color:
                  mode === "dark"
                    ? "rgba(248, 250, 252, 0.7)"
                    : "rgba(26, 26, 46, 0.7)",
                fontSize: { xs: "1rem", sm: "1.2rem", md: "1.3rem" },
                maxWidth: "600px",
                mx: "auto",
              }}
            >
              Create balanced, random team matchups with premium AI-powered
              precision
            </Typography>
          </Box>

          <style>
            {`
              @keyframes float {
                0%, 100% { transform: translateY(0) scale(1); }
                50% { transform: translateY(-20px) scale(1.1); }
              }
            `}
          </style>
        </Box>
      </Fade>

      {/* Premium Stats Cards */}
      <Grid container spacing={{ xs: 2, sm: 3 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Fade in={true} timeout={1200 + index * 200}>
              <Card
                sx={{
                  borderRadius: "1.5rem",
                  background:
                    mode === "dark"
                      ? "rgba(17, 17, 27, 0.6)"
                      : "rgba(255, 255, 255, 0.8)",
                  backdropFilter: "blur(20px)",
                  border: `2px solid ${mode === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.05)"}`,
                  height: "100%",
                  position: "relative",
                  overflow: "hidden",
                  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "4px",
                    background: stat.gradient,
                    transform: "scaleX(0)",
                    transformOrigin: "left",
                    transition: "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                  },
                  "&:hover": {
                    transform: "translateY(-12px) scale(1.02)",
                    boxShadow:
                      mode === "dark"
                        ? `0 20px 40px ${stat.color}40`
                        : `0 15px 35px ${stat.color}30`,
                    border: `2px solid ${stat.color}`,
                    "&::before": {
                      transform: "scaleX(1)",
                    },
                  },
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      mb: 2,
                    }}
                  >
                    <Box
                      sx={{
                        width: 64,
                        height: 64,
                        borderRadius: "16px",
                        background: stat.gradient,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "white",
                        boxShadow: `0 8px 24px ${stat.color}40`,
                        transition: "all 0.3s ease",
                      }}
                    >
                      {stat.icon}
                    </Box>
                  </Box>
                  <Typography
                    variant="caption"
                    sx={{
                      color: "text.secondary",
                      fontWeight: 600,
                      fontSize: "0.85rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {stat.label}
                  </Typography>
                  <Typography
                    variant="h3"
                    sx={{
                      fontWeight: 800,
                      color: stat.color,
                      mt: 1,
                      fontSize: { xs: "2.5rem", sm: "3rem" },
                      lineHeight: 1,
                    }}
                  >
                    {stat.value}
                  </Typography>
                </CardContent>
              </Card>
            </Fade>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Header;
