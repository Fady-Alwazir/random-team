import {
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  Stack,
  Fade,
  LinearProgress,
} from "@mui/material";
import { TeamsContext } from "../../context/TeamsContext";
import { useContext, useState } from "react";
import Player from "./Player";
import AddPlayerModal from "./addPlayerModal";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

const Players = ({ mode }) => {
  const { players } = useContext(TeamsContext);
  const [showPlayerModal, setShowPlayerModal] = useState(false);

  const maxPlayers = 20;
  const playerPercentage = ((players?.length || 0) / maxPlayers) * 100;

  return (
    <Fade in={true} timeout={1000}>
      <Card
        sx={{
          mb: { xs: 4, sm: 5, md: 6 },
          borderRadius: "2rem",
          background:
            mode === "dark"
              ? "rgba(17, 17, 27, 0.7)"
              : "rgba(255, 255, 255, 0.85)",
          backdropFilter: "blur(20px)",
          border: `2px solid ${mode === "dark" ? "rgba(139, 92, 246, 0.2)" : "rgba(99, 102, 241, 0.15)"}`,
          boxShadow:
            mode === "dark"
              ? "0 20px 40px rgba(139, 92, 246, 0.2)"
              : "0 15px 35px rgba(99, 102, 241, 0.1)",
          transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          position: "relative",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "3px",
            background:
              mode === "dark"
                ? "linear-gradient(90deg, #8b5cf6 0%, #06b6d4 50%, #f59e0b 100%)"
                : "linear-gradient(90deg, #6366f1 0%, #8b5cf6 50%, #10b981 100%)",
          },
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow:
              mode === "dark"
                ? "0 25px 50px rgba(139, 92, 246, 0.3)"
                : "0 20px 40px rgba(99, 102, 241, 0.15)",
          },
        }}
      >
        <CardContent sx={{ p: { xs: 3, sm: 4, md: 5 } }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: "space-between",
              alignItems: { xs: "flex-start", sm: "center" },
              gap: 2,
              mb: 3,
            }}
          >
            <Box>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 800,
                  mb: 1,
                  fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2rem" },
                  background:
                    mode === "dark"
                      ? "linear-gradient(135deg, #a78bfa 0%, #22d3ee 100%)"
                      : "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Players Roster
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "text.secondary",
                  fontSize: { xs: "0.85rem", sm: "0.9rem" },
                  fontWeight: 500,
                }}
              >
                {players?.length || 0} of {maxPlayers} players •{" "}
                {maxPlayers - (players?.length || 0)} slots remaining
              </Typography>
            </Box>
            <Button
              variant="contained"
              startIcon={<PersonAddIcon />}
              onClick={() => setShowPlayerModal(true)}
              sx={{
                borderRadius: "12px",
                fontWeight: 700,
                px: 3,
                py: 1.5,
                background:
                  mode === "dark"
                    ? "linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%)"
                    : "linear-gradient(135deg, #6366f1 0%, #818cf8 100%)",
                boxShadow:
                  mode === "dark"
                    ? "0 8px 24px rgba(139, 92, 246, 0.4)"
                    : "0 6px 20px rgba(99, 102, 241, 0.3)",
                width: { xs: "100%", sm: "auto" },
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                "&:hover": {
                  transform: "translateY(-3px) scale(1.02)",
                  boxShadow:
                    mode === "dark"
                      ? "0 12px 32px rgba(139, 92, 246, 0.5)"
                      : "0 10px 28px rgba(99, 102, 241, 0.4)",
                },
              }}
            >
              Add New Player
            </Button>
          </Box>

          {/* Progress Bar */}
          <Box
            sx={{
              mb: 3,
              p: 2.5,
              borderRadius: "1rem",
              background:
                mode === "dark"
                  ? "rgba(139, 92, 246, 0.1)"
                  : "rgba(99, 102, 241, 0.05)",
              border: `1px solid ${mode === "dark" ? "rgba(139, 92, 246, 0.2)" : "rgba(99, 102, 241, 0.1)"}`,
            }}
          >
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
            >
              <Typography
                variant="caption"
                sx={{ fontWeight: 600, color: "text.secondary" }}
              >
                Capacity
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  fontWeight: 700,
                  color: mode === "dark" ? "#a78bfa" : "#6366f1",
                }}
              >
                {playerPercentage.toFixed(0)}%
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={playerPercentage}
              sx={{
                height: 10,
                borderRadius: "8px",
                backgroundColor:
                  mode === "dark"
                    ? "rgba(139, 92, 246, 0.15)"
                    : "rgba(99, 102, 241, 0.1)",
                "& .MuiLinearProgress-bar": {
                  borderRadius: "8px",
                  background:
                    mode === "dark"
                      ? "linear-gradient(90deg, #8b5cf6 0%, #06b6d4 100%)"
                      : "linear-gradient(90deg, #6366f1 0%, #10b981 100%)",
                  boxShadow:
                    mode === "dark"
                      ? "0 2px 8px rgba(139, 92, 246, 0.4)"
                      : "0 2px 8px rgba(99, 102, 241, 0.3)",
                },
              }}
            />
          </Box>

          {/* Players List */}
          <Stack spacing={1.5}>
            {players && players.length > 0 ? (
              players.map((player, index) => (
                <Fade in={true} timeout={600 + index * 100} key={player.id}>
                  <Box>
                    <Player {...player} mode={mode} />
                  </Box>
                </Fade>
              ))
            ) : (
              <Box
                sx={{
                  py: 8,
                  textAlign: "center",
                  borderRadius: "1.5rem",
                  background:
                    mode === "dark"
                      ? "rgba(139, 92, 246, 0.05)"
                      : "rgba(99, 102, 241, 0.03)",
                  border: `2px dashed ${mode === "dark" ? "rgba(139, 92, 246, 0.2)" : "rgba(99, 102, 241, 0.15)"}`,
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    mb: 1,
                    opacity: 0.7,
                    fontWeight: 600,
                    fontSize: { xs: "1rem", sm: "1.1rem" },
                  }}
                >
                  🎮 No players in the roster yet
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "text.secondary", opacity: 0.8 }}
                >
                  Click "Add New Player" to build your team!
                </Typography>
              </Box>
            )}
          </Stack>
        </CardContent>

        <AddPlayerModal
          open={showPlayerModal}
          handleClose={() => setShowPlayerModal(false)}
          mode={mode}
        />
      </Card>
    </Fade>
  );
};

export default Players;
