import {
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  Divider,
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
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
          🏆 Teams Management
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: 2,
            mt: 2,
          }}
        >
          <Button
            variant="contained"
            color="secondary"
            startIcon={<GroupsIcon />}
            onClick={() => setShowTeams(true)}
            sx={{
              borderRadius: "0.5rem",
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
              borderRadius: "0.5rem",
            }}
          >
            Add New Team
          </Button>
        </Box>
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
  );
};

export default Teams;
