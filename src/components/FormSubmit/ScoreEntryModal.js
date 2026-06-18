import { useState, useEffect } from "react";
import {
  Modal, Backdrop, Box, Typography, IconButton, Button,
  Avatar, Select, MenuItem, FormControl, InputLabel,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";

const COLORS = ["#22c55e","#60a5fa","#f87171","#fbbf24","#a78bfa","#34d399","#f97316","#e879f9"];
const teamColor = (name) => COLORS[(name || "").charCodeAt(0) % COLORS.length];

const ScoreStep = ({ value, onChange, isDark, color }) => (
  <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 0.75, sm: 1 } }}>
    <IconButton
      onClick={() => onChange(Math.max(0, value - 1))}
      sx={{
        width: 36, height: 36, borderRadius: "8px",
        bgcolor: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)",
        "&:hover": { bgcolor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.09)" },
      }}
    >
      <RemoveIcon sx={{ fontSize: 18, color: isDark ? "#94a3b8" : "#6b7280" }} />
    </IconButton>
    <Typography sx={{
      fontFamily: "'Barlow Condensed', sans-serif",
      fontWeight: 800, fontSize: "2.4rem", lineHeight: 1,
      color: color, minWidth: "1.8ch", textAlign: "center",
    }}>
      {value}
    </Typography>
    <IconButton
      onClick={() => onChange(Math.min(99, value + 1))}
      sx={{
        width: 36, height: 36, borderRadius: "8px",
        bgcolor: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)",
        "&:hover": { bgcolor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.09)" },
      }}
    >
      <AddIcon sx={{ fontSize: 18, color: isDark ? "#94a3b8" : "#6b7280" }} />
    </IconButton>
  </Box>
);

const TeamInfo = ({ side, isDark }) => {
  const color = teamColor(side?.team?.name || "");
  return (
    <Box sx={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 0.75, minWidth: 0 }}>
      <Avatar
        alt={side?.team?.name}
        src={side?.team?.image}
        sx={{
          width: 52, height: 52, borderRadius: "10px",
          bgcolor: `${color}20`, border: `2px solid ${color}44`, color,
          fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: "1rem",
        }}
      />
      <Typography sx={{
        fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "0.9rem",
        color: isDark ? "#f0f6ff" : "#0f172a",
        textAlign: "center", lineHeight: 1.2,
        overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "100%",
      }}>
        {side?.team?.name || "—"}
      </Typography>
      {(side?.player1 || side?.player2) && (
        <Typography variant="caption" sx={{
          color: isDark ? "#64748b" : "#9ca3af", textAlign: "center",
          fontSize: "0.72rem", lineHeight: 1.3,
          overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "100%",
        }}>
          {[side.player1?.name, side.player2?.name].filter(Boolean).join(" · ")}
        </Typography>
      )}
    </Box>
  );
};

const ScoreEntryModal = ({ open, onClose, match, scores, onSave, allMatches, mode }) => {
  const isDark = mode === "dark";
  const [scoreA, setScoreA] = useState(0);
  const [scoreB, setScoreB] = useState(0);
  const [opponent, setOpponent] = useState(null);
  const [opponentKey, setOpponentKey] = useState("");

  useEffect(() => {
    if (!open || !match) return;
    const s = scores?.[match.id] || {};
    setScoreA(typeof s.scoreA === "number" ? s.scoreA : 0);
    setScoreB(typeof s.scoreB === "number" ? s.scoreB : 0);
    if (!match.teamB) {
      const saved = s.opponent || null;
      setOpponent(saved);
      setOpponentKey(saved?.team?.name || "");
    }
  }, [match?.id, open]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!match) return null;

  const availableOpponents = (allMatches || []).flatMap((m) => {
    if (m.id === match.id) return [];
    return [m.teamA, m.teamB].filter(Boolean);
  });

  const handleOpponentChange = (name) => {
    const found = availableOpponents.find((s) => s.team.name === name) || null;
    setOpponent(found);
    setOpponentKey(name);
  };

  const handleSave = () => {
    onSave(match.id, {
      scoreA,
      scoreB,
      ...(match.teamB ? {} : { opponent }),
    });
    onClose();
  };

  const effectiveB = match.teamB || opponent;
  const colorA = teamColor(match.teamA?.team?.name || "");
  const colorB = teamColor(effectiveB?.team?.name || "");
  const canSave = match.teamB ? true : !!opponent;

  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 200, sx: { backdropFilter: "blur(4px)", bgcolor: "rgba(0,0,0,0.55)" } }}
      sx={{ display: "flex", alignItems: "center", justifyContent: "center", px: { xs: 1.5, sm: 0 } }}
    >
      <Box sx={{
        outline: "none",
        width: { xs: "calc(100vw - 24px)", sm: 440 },
        bgcolor: isDark ? "#0d1a2b" : "#ffffff",
        borderRadius: "16px",
        border: `1.5px solid ${isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)"}`,
        boxShadow: isDark ? "0 24px 60px rgba(0,0,0,0.6)" : "0 24px 60px rgba(0,0,0,0.12)",
        p: { xs: 2.5, sm: 3 },
        animation: "pop 0.2s ease both",
      }}>
        {/* Header */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2.5 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <SportsSoccerIcon sx={{ color: isDark ? "#22c55e" : "#16a34a", fontSize: 20 }} />
            <Typography sx={{
              fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: "1.2rem",
              color: isDark ? "#f0f6ff" : "#0f172a",
            }}>
              Enter Match Score
            </Typography>
          </Box>
          <IconButton onClick={onClose} size="small" sx={{ borderRadius: "8px", color: isDark ? "#64748b" : "#9ca3af" }}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>

        {/* Opponent selector (waiting match only) */}
        {!match.teamB && (
          <Box sx={{ mb: 2.5 }}>
            <FormControl fullWidth size="small">
              <InputLabel sx={{
                fontFamily: "'Barlow', sans-serif", fontSize: "0.9rem",
                color: isDark ? "#64748b" : "#9ca3af",
                "&.Mui-focused": { color: isDark ? "#22c55e" : "#16a34a" },
              }}>
                Select opponent
              </InputLabel>
              <Select
                value={opponentKey}
                label="Select opponent"
                onChange={(e) => handleOpponentChange(e.target.value)}
                sx={{
                  borderRadius: "10px", fontFamily: "'Barlow', sans-serif", fontWeight: 500,
                  color: isDark ? "#f0f6ff" : "#0f172a",
                  bgcolor: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.01)",
                  "& .MuiOutlinedInput-notchedOutline": { borderColor: isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.12)" },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: isDark ? "#22c55e" : "#16a34a" },
                }}
              >
                {availableOpponents.map((side) => (
                  <MenuItem key={side.team.name} value={side.team.name} sx={{ fontFamily: "'Barlow', sans-serif" }}>
                    {side.team.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Typography variant="caption" sx={{ color: isDark ? "#475569" : "#9ca3af", fontSize: "0.72rem", display: "block", mt: 0.5 }}>
              Default: winner of the previous fixture
            </Typography>
          </Box>
        )}

        {/* Teams row */}
        <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1, mb: 2.5 }}>
          <TeamInfo side={match.teamA} isDark={isDark} />
          <Box sx={{ flexShrink: 0, pt: 2.5 }}>
            <Typography sx={{
              fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: "0.9rem",
              color: isDark ? "#475569" : "#cbd5e1", lineHeight: 1,
            }}>VS</Typography>
          </Box>
          <TeamInfo side={effectiveB} isDark={isDark} />
        </Box>

        {/* Score inputs */}
        <Box sx={{
          display: "flex", alignItems: "center", justifyContent: "center", gap: { xs: 1, sm: 2 },
          py: 2, px: 1.5, borderRadius: "12px",
          bgcolor: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)",
          border: `1px solid ${isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"}`,
          mb: 3,
        }}>
          <ScoreStep value={scoreA} onChange={setScoreA} isDark={isDark} color={colorA} />
          <Typography sx={{
            fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "1.4rem",
            color: isDark ? "#475569" : "#cbd5e1",
          }}>—</Typography>
          <ScoreStep value={scoreB} onChange={setScoreB} isDark={isDark} color={colorB} />
        </Box>

        {/* Footer */}
        <Box sx={{ display: "flex", gap: 1.5 }}>
          <Button
            fullWidth variant="outlined" onClick={onClose}
            sx={{
              borderRadius: "10px", py: 1.4,
              color: isDark ? "#64748b" : "#6b7280",
              borderColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
              "&:hover": { bgcolor: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)" },
            }}
          >
            Cancel
          </Button>
          <Button
            fullWidth variant="contained" onClick={handleSave} disabled={!canSave}
            sx={{
              borderRadius: "10px", py: 1.4,
              bgcolor: isDark ? "#22c55e" : "#16a34a", color: "#fff", fontWeight: 700,
              "&:hover": { bgcolor: isDark ? "#16a34a" : "#15803d" },
              "&:disabled": { opacity: 0.45 },
            }}
          >
            Save Result
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ScoreEntryModal;
