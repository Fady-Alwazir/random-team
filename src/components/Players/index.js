import {
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  Divider,
} from "@mui/material";
import { TeamsContext } from "../../context/TeamsContext";
import { useContext, useState } from "react";
import Player from "./Player";
import AddPlayerModal from "./addPlayerModal";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

const Players = () => {
  const { players } = useContext(TeamsContext);
  const [showPlayerModal, setShowPlayerModal] = useState(false);

  return (
    <Card
      sx={{
        mb: { xs: 3, sm: 4, md: 5 },
        borderRadius: "1rem",
      }}
    >
      <CardContent
        sx={{
          p: { xs: 2, sm: 3, md: 4 },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            👥 Players ({players?.length || 0})
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<PersonAddIcon />}
            onClick={() => setShowPlayerModal(true)}
            sx={{
              borderRadius: "0.5rem",
            }}
          >
            Add Player
          </Button>
        </Box>
        <Divider sx={{ mb: 2 }} />

        <Box sx={{ display: "flex", flexDirection: "column" }}>
          {players && players.length > 0 ? (
            players.map((player, index) => (
              <Box key={player.id}>
                <Player {...player} />
                {index !== players.length - 1 && <Divider sx={{ my: 1 }} />}
              </Box>
            ))
          ) : (
            <Typography
              variant="body2"
              sx={{
                color: "text.secondary",
                textAlign: "center",
                py: 3,
                fontStyle: "italic",
              }}
            >
              No players added yet. Start by adding some players!
            </Typography>
          )}
        </Box>
      </CardContent>

      <AddPlayerModal
        open={showPlayerModal}
        handleClose={() => setShowPlayerModal(false)}
      />
    </Card>
  );
};

export default Players;
