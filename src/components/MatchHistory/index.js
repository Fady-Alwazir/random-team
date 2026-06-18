import { useState } from "react";
import {
  Modal, Backdrop, Box, Typography, IconButton, Button, Chip,
  Accordion, AccordionSummary, AccordionDetails, Avatar,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import HistoryIcon from "@mui/icons-material/History";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import { useMatchHistory } from "../../context/MatchHistoryContext";

const COLORS = ["#22c55e","#60a5fa","#f87171","#fbbf24","#a78bfa","#34d399","#f97316","#e879f9"];
const teamColor = (name) => COLORS[(name || "").charCodeAt(0) % COLORS.length];

const formatDate = (dateStr) => {
  const d = new Date(dateStr + "T12:00:00");
  return d.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
};

const formatTime = (isoStr) => {
  const d = new Date(isoStr);
  return d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
};

const HistoryFixture = ({ fixture, isDark }) => {
  const colorA = teamColor(fixture.teamA?.name || "");
  const colorB = teamColor(fixture.teamB?.name || "");
  const scored = typeof fixture.scoreA === "number" && typeof fixture.scoreB === "number";

  const TeamSide = ({ team, players, align = "left" }) => {
    const color = teamColor(team?.name || "");
    return (
      <Box sx={{
        flex: 1, display: "flex",
        flexDirection: align === "right" ? "row-reverse" : "row",
        alignItems: "center", gap: 1, minWidth: 0,
      }}>
        <Avatar alt={team?.name} src={team?.image} sx={{
          width: 30, height: 30, borderRadius: "7px", flexShrink: 0,
          bgcolor: `${color}20`, border: `1.5px solid ${color}44`, color,
          fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: "0.68rem",
        }} />
        <Box sx={{ minWidth: 0, textAlign: align === "right" ? "right" : "left" }}>
          <Typography sx={{
            fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "0.82rem",
            color: isDark ? "#e2e8f0" : "#1e293b",
            overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
          }}>
            {team?.name}
          </Typography>
          {players?.length > 0 && (
            <Typography variant="caption" sx={{ color: isDark ? "#475569" : "#9ca3af", fontSize: "0.66rem" }}>
              {players.join(" · ")}
            </Typography>
          )}
        </Box>
      </Box>
    );
  };

  return (
    <Box sx={{
      display: "flex", alignItems: "center", gap: 1,
      py: 1.25, px: { xs: 1.25, sm: 1.75 },
      borderRadius: "10px",
      bgcolor: isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)",
      border: `1px solid ${isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.05)"}`,
    }}>
      <TeamSide team={fixture.teamA} players={fixture.teamA?.players} align="left" />

      {/* Score / VS */}
      <Box sx={{ flexShrink: 0, display: "flex", alignItems: "center", gap: 0.5, px: 0.5 }}>
        {scored ? (
          <>
            <Typography sx={{
              fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: "1.2rem",
              color: colorA, lineHeight: 1,
            }}>{fixture.scoreA}</Typography>
            <Typography sx={{ color: isDark ? "#475569" : "#cbd5e1", fontWeight: 700, fontSize: "0.9rem" }}>—</Typography>
            <Typography sx={{
              fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: "1.2rem",
              color: colorB, lineHeight: 1,
            }}>{fixture.scoreB}</Typography>
          </>
        ) : (
          <Typography sx={{
            fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "0.75rem",
            color: isDark ? "#475569" : "#9ca3af", px: 0.5,
          }}>VS</Typography>
        )}
      </Box>

      {/* Team B or no-opponent badge */}
      {fixture.teamB ? (
        <TeamSide team={fixture.teamB} players={fixture.teamB?.players} align="right" />
      ) : (
        <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
          <Chip label="No opponent" size="small" sx={{
            bgcolor: isDark ? "rgba(251,191,36,0.1)" : "rgba(217,119,6,0.07)",
            color: isDark ? "#fbbf24" : "#d97706",
            border: `1px solid ${isDark ? "rgba(251,191,36,0.2)" : "rgba(217,119,6,0.15)"}`,
            borderRadius: "6px", fontSize: "0.68rem", height: 20,
          }} />
        </Box>
      )}
    </Box>
  );
};

const MatchHistoryModal = ({ open, onClose, mode }) => {
  const isDark = mode === "dark";
  const { sessions, clearHistory } = useMatchHistory();
  const [expanded, setExpanded] = useState(null);

  const grouped = {};
  sessions.forEach((s) => {
    const day = s.timestamp.split("T")[0];
    if (!grouped[day]) grouped[day] = [];
    grouped[day].push(s);
  });
  const sortedDays = Object.keys(grouped).sort((a, b) => b.localeCompare(a));
  const mostRecentDay = sortedDays[0] ?? null;
  const activePanel = expanded !== null ? expanded : mostRecentDay;

  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 200, sx: { backdropFilter: "blur(4px)", bgcolor: "rgba(0,0,0,0.55)" } }}
      sx={{ display: "flex", alignItems: "center", justifyContent: "center", px: { xs: 1.5, sm: 2 } }}
    >
      <Box sx={{
        outline: "none",
        width: { xs: "100%", sm: "90vw", md: 600 },
        maxHeight: { xs: "90vh", sm: "85vh" },
        display: "flex", flexDirection: "column",
        bgcolor: isDark ? "#0d1a2b" : "#f8fafc",
        borderRadius: "16px",
        border: `1.5px solid ${isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)"}`,
        boxShadow: isDark ? "0 24px 60px rgba(0,0,0,0.6)" : "0 24px 60px rgba(0,0,0,0.12)",
        overflow: "hidden",
        animation: "pop 0.2s ease both",
      }}>
        {/* Header */}
        <Box sx={{
          px: { xs: 2.5, sm: 3 }, py: { xs: 1.75, sm: 2 },
          display: "flex", justifyContent: "space-between", alignItems: "center",
          borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"}`,
          flexShrink: 0,
        }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <HistoryIcon sx={{ color: isDark ? "#60a5fa" : "#3b82f6", fontSize: 22 }} />
            <Typography sx={{
              fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: "1.3rem",
              color: isDark ? "#f0f6ff" : "#0f172a",
            }}>
              Match History
            </Typography>
            {sessions.length > 0 && (
              <Chip label={sessions.length} size="small" sx={{
                bgcolor: isDark ? "rgba(96,165,250,0.15)" : "rgba(59,130,246,0.1)",
                color: isDark ? "#60a5fa" : "#3b82f6",
                borderRadius: "6px", height: 20, fontSize: "0.72rem", fontWeight: 700,
              }} />
            )}
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {sessions.length > 0 && (
              <Button
                size="small" variant="outlined"
                startIcon={<DeleteOutlineIcon sx={{ fontSize: "14px !important" }} />}
                onClick={clearHistory}
                sx={{
                  borderRadius: "8px", fontSize: "0.8rem", py: 0.6,
                  color: isDark ? "#f87171" : "#dc2626",
                  borderColor: isDark ? "rgba(248,113,113,0.3)" : "rgba(220,38,38,0.25)",
                  "&:hover": { bgcolor: isDark ? "rgba(248,113,113,0.08)" : "rgba(220,38,38,0.06)" },
                }}
              >
                Clear All
              </Button>
            )}
            <IconButton onClick={onClose} size="small" sx={{ borderRadius: "8px", color: isDark ? "#64748b" : "#9ca3af" }}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>

        {/* Body */}
        <Box sx={{
          overflowY: "auto", flex: 1,
          p: { xs: 1.5, sm: 2 },
          "&::-webkit-scrollbar": { width: "4px" },
          "&::-webkit-scrollbar-thumb": { bgcolor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)", borderRadius: "2px" },
        }}>
          {sessions.length === 0 ? (
            <Box sx={{ py: 8, textAlign: "center" }}>
              <Typography sx={{ fontSize: "2.5rem", mb: 1, lineHeight: 1 }}>📋</Typography>
              <Typography sx={{
                fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600, fontSize: "1.1rem",
                color: isDark ? "#64748b" : "#9ca3af", mb: 0.5,
              }}>
                No match history yet
              </Typography>
              <Typography variant="caption" sx={{ color: isDark ? "#475569" : "#b0b8c4" }}>
                Draw fixtures and save results to see them here
              </Typography>
            </Box>
          ) : (
            sortedDays.map((day) => (
              <Accordion
                key={day}
                expanded={activePanel === day}
                onChange={(_, isExp) => setExpanded(isExp ? day : false)}
                disableGutters
                sx={{
                  bgcolor: "transparent", boxShadow: "none",
                  border: `1.5px solid ${isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.07)"}`,
                  borderRadius: "12px !important", mb: 1.5,
                  "&:before": { display: "none" }, overflow: "hidden",
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon sx={{ color: isDark ? "#64748b" : "#9ca3af" }} />}
                  sx={{
                    px: { xs: 2, sm: 2.5 }, minHeight: 0,
                    bgcolor: isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.01)",
                    "& .MuiAccordionSummary-content": { my: 1.25 },
                  }}
                >
                  <Box>
                    <Typography sx={{
                      fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "1rem",
                      color: isDark ? "#f0f6ff" : "#0f172a", lineHeight: 1.2,
                    }}>
                      {formatDate(day)}
                    </Typography>
                    <Typography variant="caption" sx={{ color: isDark ? "#64748b" : "#9ca3af", fontSize: "0.73rem" }}>
                      {grouped[day].length} draw{grouped[day].length !== 1 ? "s" : ""} · {grouped[day].reduce((a, s) => a + s.fixtures.length, 0)} fixtures
                    </Typography>
                  </Box>
                </AccordionSummary>
                <AccordionDetails sx={{ px: { xs: 1.5, sm: 2 }, pb: 2, pt: 0.5 }}>
                  {grouped[day].map((session, sIdx) => (
                    <Box key={session.id} sx={{ mb: sIdx < grouped[day].length - 1 ? 2.5 : 0 }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, mb: 1 }}>
                        <SportsSoccerIcon sx={{ fontSize: 13, color: isDark ? "#22c55e" : "#16a34a" }} />
                        <Typography sx={{
                          fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600, fontSize: "0.82rem",
                          color: isDark ? "#64748b" : "#9ca3af",
                        }}>
                          {formatTime(session.timestamp)} — {session.fixtures.length} match{session.fixtures.length !== 1 ? "es" : ""}
                        </Typography>
                      </Box>
                      <Box sx={{ display: "flex", flexDirection: "column", gap: 0.75 }}>
                        {session.fixtures.map((fixture) => (
                          <HistoryFixture key={fixture.id} fixture={fixture} isDark={isDark} />
                        ))}
                      </Box>
                    </Box>
                  ))}
                </AccordionDetails>
              </Accordion>
            ))
          )}
        </Box>
      </Box>
    </Modal>
  );
};

export default MatchHistoryModal;
