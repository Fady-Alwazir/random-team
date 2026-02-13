import {
  Box,
  Typography,
  Avatar,
  Rating,
  IconButton,
  Card,
  CardContent,
} from "@mui/material";
import { useContext } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { TeamsContext } from "../../../context/TeamsContext";

const TeamCard = ({ team, setSelectedTeamId, showAddTeam, mode }) => {
  const { setTeams } = useContext(TeamsContext);

  const deleteTeam = (id) => {
    setTeams((teams) => teams.filter((team) => team.id !== id));
  };

  const onEditTeam = (id) => {
    showAddTeam();
    setSelectedTeamId(id);
  };

  return (
    <Card
      sx={{
        borderRadius: "1rem",
        background:
          mode === "dark"
            ? "rgba(17, 17, 27, 0.7)"
            : "rgba(255, 255, 255, 0.9)",
        border: `1.5px solid ${
          mode === "dark"
            ? "rgba(139, 92, 246, 0.25)"
            : "rgba(99, 102, 241, 0.15)"
        }`,
        backdropFilter: "blur(16px)",
        transition: "all 0.3s ease",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow:
            mode === "dark"
              ? "0 12px 28px rgba(139, 92, 246, 0.25)"
              : "0 12px 24px rgba(99, 102, 241, 0.15)",
        },
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
          p: 2.5,
          textAlign: "center",
          flex: 1,
        }}
      >
        <Avatar
          alt={team.name}
          src={team.image}
          sx={{
            width: 90,
            height: 90,
            border: "4px solid",
            borderColor: mode === "dark" ? "#a78bfa" : "primary.light",
            boxShadow:
              mode === "dark"
                ? "0 4px 14px rgba(139, 92, 246, 0.35)"
                : "0 4px 12px rgba(99, 102, 241, 0.2)",
          }}
        />

        <Box sx={{ flex: 1, width: "100%" }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              color: mode === "dark" ? "#a78bfa" : "primary.main",
              mb: 1,
              wordBreak: "break-word",
            }}
          >
            {team.name}
          </Typography>

          <Box sx={{ display: "flex", justifyContent: "center", mb: 1 }}>
            <Rating value={team.ranking} readOnly size="medium" />
          </Box>

          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            {team.ranking} Star{team.ranking !== 1 ? "s" : ""}
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            gap: 1,
            justifyContent: "center",
            width: "100%",
            pt: 1,
            borderTop: `1px solid ${
              mode === "dark"
                ? "rgba(255, 255, 255, 0.08)"
                : "rgba(0, 0, 0, 0.08)"
            }`,
          }}
        >
          <IconButton
            size="small"
            onClick={() => onEditTeam(team.id)}
            sx={{
              color: mode === "dark" ? "#a78bfa" : "primary.main",
              backgroundColor:
                mode === "dark"
                  ? "rgba(139, 92, 246, 0.15)"
                  : "rgba(99, 102, 241, 0.1)",
              "&:hover": {
                backgroundColor:
                  mode === "dark"
                    ? "rgba(139, 92, 246, 0.25)"
                    : "rgba(99, 102, 241, 0.2)",
              },
              transition: "all 0.2s ease",
            }}
          >
            <EditIcon fontSize="small" />
          </IconButton>

          <IconButton
            size="small"
            onClick={() => deleteTeam(team.id)}
            sx={{
              color: mode === "dark" ? "#f87171" : "error.main",
              backgroundColor:
                mode === "dark"
                  ? "rgba(239, 68, 68, 0.15)"
                  : "rgba(239, 68, 68, 0.1)",
              "&:hover": {
                backgroundColor:
                  mode === "dark"
                    ? "rgba(239, 68, 68, 0.25)"
                    : "rgba(239, 68, 68, 0.2)",
              },
              transition: "all 0.2s ease",
            }}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TeamCard;
