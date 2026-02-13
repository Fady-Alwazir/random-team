import { Box, Typography, Grid, Card, CardContent, Divider } from "@mui/material";
import { useContext } from "react";
import { TeamsContext } from "../../context/TeamsContext";

const Header = () => {
  const { players, teams } = useContext(TeamsContext);

  const stats = [
    { label: "Players", value: players?.length || 0, icon: "👥", color: "#6366f1" },
    { label: "Teams", value: teams?.length || 0, icon: "🏆", color: "#10b981" },
    { label: "Possible Pairs", value: Math.floor((players?.length || 0) / 2), icon: "⚡", color: "#f59e0b" },
  ];

  return (
    <Box sx={{ mb: { xs: 3, sm: 4, md: 6 } }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #6366f1 0%, #10b981 100%)",
          borderRadius: "1.5rem",
          p: { xs: 3, sm: 4, md: 5 },
          color: "white",
          mb: 4,
          boxShadow: "0 20px 40px rgba(99, 102, 241, 0.2)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "-50%",
            right: "-10%",
            width: "300px",
            height: "300px",
            borderRadius: "50%",
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            filter: "blur(80px)",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: "-30%",
            left: "-5%",
            width: "250px",
            height: "250px",
            borderRadius: "50%",
            backgroundColor: "rgba(255, 255, 255, 0.08)",
            filter: "blur(60px)",
          }}
        />

        <Box sx={{ position: "relative", zIndex: 1 }}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 900,
              mb: 2,
              fontSize: { xs: "2rem", sm: "2.5rem", md: "3.5rem" },
              textShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
            }}
          >
            🎯 Team Pair Generator
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 300,
              opacity: 0.95,
              fontSize: { xs: "0.95rem", sm: "1.1rem", md: "1.2rem" },
            }}
          >
            Create balanced, random team matchups instantly
          </Typography>
        </Box>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={2}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                borderRadius: "1.25rem",
                border: "2px solid",
                borderColor: stat.color,
                background: `linear-gradient(135deg, ${stat.color}15 0%, ${stat.color}08 100%)`,
                height: "100%",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: `0 15px 35px ${stat.color}30`,
                  borderColor: stat.color,
                },
              }}
            >
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Box sx={{ fontSize: "2.5rem" }}>{stat.icon}</Box>
                  <Box>
                    <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 600 }}>
                      {stat.label}
                    </Typography>
                    <Typography variant="h4" sx={{ fontWeight: 800, color: stat.color, mt: 0.5 }}>
                      {stat.value}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Divider sx={{ my: 4 }} />
    </Box>
  );
};

export default Header;
