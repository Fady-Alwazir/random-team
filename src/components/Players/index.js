import { Box, Button, Typography, Card, CardContent, Divider, Stack, Fade, LinearProgress } from "@mui/material";
import { TeamsContext } from "../../context/TeamsContext";
import { useContext, useState } from "react";
import Player from "./Player";
import AddPlayerModal from "./addPlayerModal";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

const Players = () => {
  const { players } = useContext(TeamsContext);
  const [showPlayerModal, setShowPlayerModal] = useState(false);

  const maxPlayers = 20;
  const playerPercentage = ((players?.length || 0) / maxPlayers) * 100;

  return (
    <Fade in={true} timeout={800}>
      <Card
        sx={{
          mb: { xs: 3, sm: 4, md: 5 },
          borderRadius: "1.5rem",
          background:
            "linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(16, 185, 129, 0.03) 100%)",
          border: "2px solid rgba(99, 102, 241, 0.1)",
          boxShadow: "0 8px 24px rgba(99, 102, 241, 0.08)",
          transition: "all 0.3s ease",
          "&:hover": {
            boxShadow: "0 12px 36px rgba(99, 102, 241, 0.12)",
          },
        }}
      >
        <CardContent sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
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
                variant="h5"
                sx={{
                  fontWeight: 800,
                  mb: 0.5,
                  fontSize: { xs: "1.3rem", sm: "1.5rem" },
                }}
              >
                👥 Players
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: "text.secondary",
                  fontSize: { xs: "0.75rem", sm: "0.8rem" },
                }}
              >
                {players?.length || 0} of {maxPlayers} max
              </Typography>
            </Box>
            <Button
              variant="contained"
              color="primary"
              startIcon={<PersonAddIcon />}
              onClick={() => setShowPlayerModal(true)}
              sx={{
                borderRadius: "0.75rem",
                fontWeight: 700,
                boxShadow: "0 4px 15px rgba(99, 102, 241, 0.3)",
                width: { xs: "100%", sm: "auto" },
                "&:hover": {
                  boxShadow: "0 6px 20px rgba(99, 102, 241, 0.4)",
                  transform: "translateY(-2px)",
                },
              }}
            >
              Add Player
            </Button>
          </Box>

          <LinearProgress
            variant="determinate"
            value={playerPercentage}
            sx={{
              mb: 2.5,
              height: 8,
              borderRadius: "4px",
              backgroundColor: "rgba(99, 102, 241, 0.1)",
              "& .MuiLinearProgress-bar": {
                borderRadius: "4px",
                background: "linear-gradient(90deg, #6366f1 0%, #10b981 100%)",
              },
            }}
          />

          <Divider sx={{ mb: 2 }} />

          <Stack spacing={0.5}>
            {players && players.length > 0 ? (
              players.map((player, index) => (
                <Fade in={true} timeout={500 + index * 100} key={player.id}>
                  <Box>
                    <Player {...player} />
                  </Box>
                </Fade>
              ))
            ) : (
              <Box
                sx={{
                  py: 5,
                  textAlign: "center",
                  color: "text.secondary",
                }}
              >
                <Typography variant="h6" sx={{ mb: 1, opacity: 0.5 }}>
                  No players yet
                </Typography>
                <Typography variant="body2">
                  Add your first player to get started!
                </Typography>
              </Box>
            )}
          </Stack>
        </CardContent>

        <AddPlayerModal
          open={showPlayerModal}
          handleClose={() => setShowPlayerModal(false)}
        />
      </Card>
    </Fade>
  );
};

export default Players;
