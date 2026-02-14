import {
  Modal,
  Button,
  Box,
  Typography,
  IconButton,
  Alert,
  Backdrop,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import { useContext, useEffect } from "react";
import { TeamsContext } from "../../../context/TeamsContext";
import TeamCard from "./teamCard";

const TeamsModal = ({ open, onClose, showAddTeam, setSelectedTeamId, mode }) => {
  const { teams, setTeams } = useContext(TeamsContext);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: { xs: "90vw", sm: "95%", md: "100%" },
    maxWidth: { xs: "90vw", sm: 900, md: 1000 },
    maxHeight: { xs: "90vh", sm: "90vh" },
    borderRadius: "1.5rem",
    boxShadow:
      mode === "dark"
        ? "0 20px 60px rgba(6, 182, 212, 0.3)"
        : "0 20px 60px rgba(139, 92, 246, 0.2)",
    p: { xs: 2, sm: 3, md: 4 },
    display: "flex",
    flexDirection: "column",
    gap: 2,
    overflowY: "auto",
    background:
      mode === "dark" ? "rgba(17, 17, 27, 0.95)" : "rgba(255, 255, 255, 0.95)",
    backdropFilter: "blur(20px)",
    border: `2px solid ${
      mode === "dark" ? "rgba(6, 182, 212, 0.3)" : "rgba(139, 92, 246, 0.2)"
    }`,
    "&::-webkit-scrollbar": {
      width: "0.5em",
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: "rgba(0, 0, 0, 0.05)",
      borderRadius: "1em",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(99, 102, 241, 0.3)",
      borderRadius: "1em",
      "&:hover": {
        backgroundColor: "rgba(99, 102, 241, 0.5)",
      },
    },
  };

  useEffect(() => {
    setSelectedTeamId(null);
  }, [setSelectedTeamId]);

  // Load cached team images when modal opens
  useEffect(() => {
    if (!open || !teams || teams.length === 0) return;

    const imageCacheKey = "teamImageCache";

    const getImageCache = () => {
      try {
        const cache = JSON.parse(localStorage.getItem(imageCacheKey));
        return cache && typeof cache === "object" ? cache : {};
      } catch (error) {
        return {};
      }
    };

    const cache = getImageCache();
    let hasUpdates = false;

    const updatedTeams = teams.map((team) => {
      const cached = cache[team.id];
      if (
        cached?.image &&
        cached?.source === "sportsdb" &&
        team.image !== cached.image
      ) {
        hasUpdates = true;
        return { ...team, image: cached.image, imageSource: "sportsdb" };
      }
      return team;
    });

    if (hasUpdates) {
      setTeams(updatedTeams);
    }
  }, [open, teams, setTeams]);

  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
        sx: { backdropFilter: "blur(6px)" },
      }}
    >
      <Box sx={style}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 1,
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            🏆 All Teams
          </Typography>
          <IconButton
            onClick={onClose}
            size="small"
            sx={{
              color: "text.secondary",
              "&:hover": {
                backgroundColor:
                  mode === "dark"
                    ? "rgba(255, 255, 255, 0.08)"
                    : "rgba(0, 0, 0, 0.05)",
              },
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        <Typography variant="body2" sx={{ color: "text.secondary", mb: 2 }}>
          {teams?.length === 0
            ? "No teams added yet. Create one to get started!"
            : `Showing ${teams?.length} team${teams?.length !== 1 ? "s" : ""}`}
        </Typography>

        {teams?.length > 0 ? (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "repeat(auto-fill, minmax(160px, 1fr))",
                sm: "repeat(auto-fill, minmax(200px, 1fr))",
                md: "repeat(auto-fill, minmax(220px, 1fr))",
              },
              gap: 2,
              mb: 3,
            }}
          >
            {teams
              ?.sort((a, b) => b.ranking - a.ranking)
              .map((team) => (
                <TeamCard
                  key={team.id}
                  team={team}
                  setSelectedTeamId={setSelectedTeamId}
                  showAddTeam={showAddTeam}
                  mode={mode}
                />
              ))}
          </Box>
        ) : (
          <Alert
            severity="info"
            sx={{
              borderRadius: "0.75rem",
              mb: 2,
              background:
                mode === "dark"
                  ? "rgba(6, 182, 212, 0.15)"
                  : "rgba(99, 102, 241, 0.1)",
              border: `1px solid ${
                mode === "dark"
                  ? "rgba(6, 182, 212, 0.35)"
                  : "rgba(99, 102, 241, 0.2)"
              }`,
            }}
          >
            <Typography variant="body2">
              Create your first team to start building team pairs!
            </Typography>
          </Alert>
        )}

        <Button
          variant="contained"
          color="secondary"
          startIcon={<AddIcon />}
          onClick={showAddTeam}
          fullWidth
          sx={{
            borderRadius: "0.75rem",
            py: 1.25,
            fontWeight: 700,
            background:
              mode === "dark"
                ? "linear-gradient(135deg, #06b6d4 0%, #22d3ee 100%)"
                : "linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%)",
            boxShadow:
              mode === "dark"
                ? "0 8px 24px rgba(6, 182, 212, 0.4)"
                : "0 6px 20px rgba(139, 92, 246, 0.3)",
            "&:hover": {
              transform: "translateY(-2px)",
              boxShadow:
                mode === "dark"
                  ? "0 12px 32px rgba(6, 182, 212, 0.5)"
                  : "0 10px 28px rgba(139, 92, 246, 0.4)",
            },
          }}
        >
          Add New Team
        </Button>
      </Box>
    </Modal>
  );
};;

export default TeamsModal;
