import {
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  Fade,
  Stack,
} from "@mui/material";
import { useState } from "react";
import TeamsModal from "./TeamsModal";
import AddTeamModal from "./addTeamModal";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import GroupsIcon from "@mui/icons-material/Groups";

const Teams = ({ mode }) => {
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
          border: `2px solid ${
            mode === "dark"
              ? "rgba(6, 182, 212, 0.2)"
              : "rgba(139, 92, 246, 0.15)"
          }`,
          boxShadow:
            mode === "dark"
              ? "0 20px 40px rgba(6, 182, 212, 0.2)"
              : "0 15px 35px rgba(139, 92, 246, 0.1)",
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
                ? "linear-gradient(90deg, #06b6d4 0%, #8b5cf6 50%, #f59e0b 100%)"
                : "linear-gradient(90deg, #8b5cf6 0%, #6366f1 50%, #10b981 100%)",
          },
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow:
              mode === "dark"
                ? "0 25px 50px rgba(6, 182, 212, 0.3)"
                : "0 20px 40px rgba(139, 92, 246, 0.15)",
          },
        }}
      >
        <CardContent sx={{ p: { xs: 3, sm: 4, md: 5 } }}>
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 800,
                mb: 1,
                fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2rem" },
                background:
                  mode === "dark"
                    ? "linear-gradient(135deg, #22d3ee 0%, #a78bfa 100%)"
                    : "linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Teams
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "text.secondary",
                fontSize: { xs: "0.85rem", sm: "0.9rem" },
                fontWeight: 500,
              }}
            >
              Build and organize your competitive teams
            </Typography>
          </Box>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <Button
              variant="contained"
              startIcon={<GroupsIcon />}
              onClick={() => setShowTeams(true)}
              sx={{
                borderRadius: "12px",
                fontWeight: 700,
                px: 3,
                py: 1.5,
                background:
                  mode === "dark"
                    ? "linear-gradient(135deg, #06b6d4 0%, #22d3ee 100%)"
                    : "linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%)",
                boxShadow:
                  mode === "dark"
                    ? "0 8px 24px rgba(6, 182, 212, 0.4)"
                    : "0 6px 20px rgba(139, 92, 246, 0.3)",
                flex: { xs: 1, sm: "auto" },
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                "&:hover": {
                  transform: "translateY(-3px) scale(1.02)",
                  boxShadow:
                    mode === "dark"
                      ? "0 12px 32px rgba(6, 182, 212, 0.5)"
                      : "0 10px 28px rgba(139, 92, 246, 0.4)",
                },
              }}
            >
              View All Teams
            </Button>
            <Button
              variant="outlined"
              startIcon={<GroupAddIcon />}
              onClick={showAddTeam}
              sx={{
                borderRadius: "12px",
                fontWeight: 700,
                px: 3,
                py: 1.5,
                border: `2px solid ${
                  mode === "dark"
                    ? "rgba(6, 182, 212, 0.4)"
                    : "rgba(139, 92, 246, 0.3)"
                }`,
                color: mode === "dark" ? "#22d3ee" : "#8b5cf6",
                flex: { xs: 1, sm: "auto" },
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                "&:hover": {
                  backgroundColor:
                    mode === "dark"
                      ? "rgba(6, 182, 212, 0.1)"
                      : "rgba(139, 92, 246, 0.08)",
                  border: `2px solid ${
                    mode === "dark"
                      ? "rgba(6, 182, 212, 0.6)"
                      : "rgba(139, 92, 246, 0.5)"
                  }`,
                  transform: "translateY(-3px) scale(1.02)",
                },
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
          mode={mode}
        />
        <AddTeamModal
          open={showAddTeamModal}
          onClose={closeTeamModal}
          openTeamsModal={() => setShowTeams(true)}
          selectedTeamId={selectedTeamId}
          mode={mode}
        />
      </Card>
    </Fade>
  );
};

export default Teams;
