import {
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  Divider,
  Fade,
  Stack,
} from "@mui/material";
import { useState } from "react";
import TeamsModal from "./TeamsModal";
import AddTeamModal from "./addTeamModal";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import GroupsIcon from "@mui/icons-material/Groups";

const Teams = () => {
  const [showTeams, setShowTeams] = useState(false);
  const [showAddTeamModal, setShowAddTeamModal] = useState(false);
  const [selectedTeamId, setSelectedTeamId] = useState(0);

  const showAddTeam = () => {
    setShowTeams(false);
    setShowAddTeamModal(true);
  };

  const closeTeamModal = () => {
    setShowAddTeamModal(false);
    setSelectedTeamId(0);
  };

  return (
    <Fade in={true} timeout={800}>
      <Card
        sx={{
          mb: { xs: 3, sm: 4, md: 5 },
          borderRadius: "1.5rem",
          background: "linear-gradient(135deg, rgba(16, 185, 129, 0.05) 0%, rgba(99, 102, 241, 0.03) 100%)",
          border: "2px solid rgba(16, 185, 129, 0.1)",
          boxShadow: "0 8px 24px rgba(16, 185, 129, 0.08)",
          transition: "all 0.3s ease",
          "&:hover": {
            boxShadow: "0 12px 36px rgba(16, 185, 129, 0.12)",
          },
        }}
      >
        <CardContent
          sx={{
            p: { xs: 2.5, sm: 3, md: 4 },
          }}
        >
          <Box sx={{ mb: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: 800, mb: 0.5 }}>
              🏆 Teams Management
            </Typography>
            <Typography variant="caption" sx={{ color: "text.secondary" }}>
              Create and manage your teams
            </Typography>
          </Box>
          <Divider sx={{ mb: 3 }} />

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            sx={{ mt: 2 }}
          >
            <Button
              variant="contained"
              color="secondary"
              startIcon={<GroupsIcon />}
              onClick={() => setShowTeams(true)}
              sx={{
                borderRadius: "0.75rem",
                fontWeight: 700,
                boxShadow: "0 4px 15px rgba(16, 185, 129, 0.3)",
                "&:hover": {
                  boxShadow: "0 6px 20px rgba(16, 185, 129, 0.4)",
                  transform: "translateY(-2px)",
                },
                transition: "all 0.3s ease",
                flex: { xs: 1, sm: "auto" },
              }}
            >
              View All Teams
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              startIcon={<GroupAddIcon />}
              onClick={showAddTeam}
              sx={{
                borderRadius: "0.75rem",
                fontWeight: 700,
                border: "1.5px solid rgba(16, 185, 129, 0.4)",
                "&:hover": {
                  backgroundColor: "rgba(16, 185, 129, 0.05)",
                  border: "1.5px solid rgba(16, 185, 129, 0.6)",
                },
                flex: { xs: 1, sm: "auto" },
              }}
            >
              Add New Team
            </Button>
          </Stack>
        </CardContent>

        <TeamsModal
          open={showTeams}
          onClose={() => setShowTeams(false)}
          showAddTeam={showAddTeam}
          setSelectedTeamId={setSelectedTeamId}
        />
        <AddTeamModal
          open={showAddTeamModal}
          onClose={closeTeamModal}
          openTeamsModal={() => setShowTeams(true)}
          selectedTeamId={selectedTeamId}
        />
      </Card>
    </Fade>
  );
};

export default Teams;
