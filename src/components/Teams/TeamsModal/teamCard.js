import { Box, Typography, Avatar, Rating, IconButton } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useContext } from "react";
import { TeamsContext } from "../../../context/TeamsContext";

const COLORS = ["#22c55e","#60a5fa","#f87171","#fbbf24","#a78bfa","#34d399","#f97316","#e879f9"];
const teamColor = (name) => COLORS[(name || "").charCodeAt(0) % COLORS.length];

const TeamCard = ({ team, setSelectedTeamId, showAddTeam, mode }) => {
  const { setTeams } = useContext(TeamsContext);
  const isDark = mode === "dark";
  const color = teamColor(team.name);

  const remove = () => setTeams((prev) => prev.filter((t) => t.id !== team.id));
  const edit = () => { showAddTeam(); setSelectedTeamId(team.id); };

  return (
    <Box
      sx={{
        borderRadius: "12px",
        bgcolor: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)",
        border: `1.5px solid ${isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)"}`,
        p: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        gap: 1,
        transition: "all 0.2s ease",
        "&:hover": {
          transform: "translateY(-2px)",
          border: `1.5px solid ${color}55`,
          bgcolor: isDark ? `${color}0a` : `${color}08`,
        },
      }}
    >
      <Avatar
        alt={team.name}
        src={team.image}
        sx={{
          width: { xs: 52, sm: 64 },
          height: { xs: 52, sm: 64 },
          borderRadius: "10px",
          border: `2px solid ${color}44`,
          bgcolor: `${color}18`,
          color: color,
          fontFamily: "'Barlow Condensed', sans-serif",
          fontWeight: 800,
          fontSize: "1.2rem",
        }}
      />

      <Typography
        sx={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontWeight: 700,
          fontSize: { xs: "0.85rem", sm: "0.95rem" },
          color: isDark ? "#f0f6ff" : "#0f172a",
          wordBreak: "break-word",
          lineHeight: 1.2,
        }}
      >
        {team.name}
      </Typography>

      <Rating
        value={team.ranking}
        readOnly
        size="small"
        sx={{
          "& .MuiRating-iconFilled": { color: "#fbbf24" },
          "& .MuiRating-iconEmpty": { color: isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.1)" },
          fontSize: { xs: "0.9rem", sm: "1rem" },
        }}
      />

      {/* Actions */}
      <Box sx={{ display: "flex", gap: 0.75 }}>
        <IconButton
          size="small"
          onClick={edit}
          sx={{
            width: 30, height: 30, borderRadius: "6px",
            color: isDark ? "#60a5fa" : "#3b82f6",
            bgcolor: isDark ? "rgba(96,165,250,0.1)" : "rgba(59,130,246,0.07)",
            "&:hover": { bgcolor: isDark ? "rgba(96,165,250,0.2)" : "rgba(59,130,246,0.14)" },
          }}
        >
          <EditOutlinedIcon sx={{ fontSize: 14 }} />
        </IconButton>
        <IconButton
          size="small"
          onClick={remove}
          sx={{
            width: 30, height: 30, borderRadius: "6px",
            color: isDark ? "#f87171" : "#dc2626",
            bgcolor: isDark ? "rgba(248,113,113,0.1)" : "rgba(220,38,38,0.07)",
            "&:hover": { bgcolor: isDark ? "rgba(248,113,113,0.2)" : "rgba(220,38,38,0.14)" },
          }}
        >
          <DeleteOutlineIcon sx={{ fontSize: 14 }} />
        </IconButton>
      </Box>
    </Box>
  );
};

export default TeamCard;
