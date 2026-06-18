import { Box, FormControl, InputLabel, MenuItem, Select, Button, Typography } from "@mui/material";
import { useContext, useState, useRef } from "react";
import { TeamsContext } from "../../context/TeamsContext";
import { useMatchHistory } from "../../context/MatchHistoryContext";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import HistoryIcon from "@mui/icons-material/History";
import PairsSection from "./PairsSection";
import ScoreEntryModal from "./ScoreEntryModal";
import SaveResultsDialog from "./SaveResultsDialog";
import MatchHistoryModal from "../MatchHistory";
import { shuffle } from "../../functions";

const FormSubmit = ({ mode }) => {
  const [rank, setRank] = useState(5);
  const { players, teams, setSelectedTeams } = useContext(TeamsContext);
  const { saveSession } = useMatchHistory();

  // matches: [{ id, teamA: {team, player1, player2}, teamB: {team, player1, player2} | null }]
  const [matches, setMatches] = useState([]);
  // scores: { [matchId]: { scoreA, scoreB, opponent } }
  const [scores, setScores] = useState({});

  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [scoreModal, setScoreModal] = useState({ open: false, matchId: null });

  const pairsRef = useRef(null);
  const isDark = mode === "dark";

  /* ── image fetching ──────────────────────────────────────────────────── */
  const imageCacheKey = "teamImageCache";
  const getCache = () => { try { const c = JSON.parse(localStorage.getItem(imageCacheKey)); return c && typeof c === "object" ? c : {}; } catch { return {}; } };
  const saveCache = (c) => localStorage.setItem(imageCacheKey, JSON.stringify(c));

  const updateImages = async (list) => {
    const cache = getCache();
    let changed = false;
    const updated = await Promise.all(list.map(async (team) => {
      if (team.imageSource === "custom" && team.image) return team;
      const cached = cache[team.id];
      if (cached?.image && cached?.source === "sportsdb") return { ...team, image: cached.image, imageSource: "sportsdb" };
      try {
        const res = await fetch(`https://www.thesportsdb.com/api/v1/json/3/searchteams.php?t=${encodeURIComponent(team.name)}`);
        const data = await res.json();
        if (data.teams?.length) {
          const img = data.teams[0].strBadge || data.teams[0].strTeamBadge || team.image;
          if (img) { cache[team.id] = { image: img, source: "sportsdb", ts: Date.now() }; changed = true; return { ...team, image: img, imageSource: "sportsdb" }; }
        }
        return team;
      } catch { return team; }
    }));
    if (changed) saveCache(cache);
    return updated;
  };

  /* ── draw logic ──────────────────────────────────────────────────────── */
  const executeDraw = () => {
    setIsDrawing(true);
    setShowSaveDialog(false);
    const filtered =
      rank === "wc2026" ? teams.filter((t) => t.wc2026 === true) :
      rank === "all"    ? teams.filter((t) => !t.wc2026) :
                          teams.filter((t) => t.ranking === rank && !t.wc2026);
    const ts = Date.now();

    setTimeout(() => {
      const sTeams = shuffle(filtered);
      const sPlayers = shuffle(players);

      const rawPairs = sTeams.map((team, i) => {
        const p1 = sPlayers[i * 2] || null;
        const p2 = sPlayers[i * 2 + 1] || null;
        if (!p1 && !p2) return null;
        return { team: { name: team.name, image: team.image, ranking: team.ranking, id: team.id }, player1: p1, player2: p2 };
      }).filter(Boolean);

      const newMatches = [];
      for (let i = 0; i < rawPairs.length; i += 2) {
        newMatches.push({ id: `m_${ts}_${i}`, teamA: rawPairs[i], teamB: rawPairs[i + 1] || null });
      }

      setMatches(newMatches);
      setScores({});
      setSelectedTeams(sTeams);
      setIsDrawing(false);
      setHasDrawn(true);

      updateImages(sTeams).then((withImgs) => {
        setMatches((prev) => prev.map((match) => {
          const uA = withImgs.find((t) => t.id === match.teamA.team.id);
          const uB = match.teamB ? withImgs.find((t) => t.id === match.teamB.team.id) : null;
          return {
            ...match,
            teamA: uA && uA.image !== match.teamA.team.image
              ? { ...match.teamA, team: { ...match.teamA.team, image: uA.image } }
              : match.teamA,
            teamB: match.teamB && uB && uB.image !== match.teamB.team.image
              ? { ...match.teamB, team: { ...match.teamB.team, image: uB.image } }
              : match.teamB,
          };
        }));
      });
    }, 350);

    setTimeout(() => pairsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 250);
  };

  const draw = () => {
    if (hasDrawn && matches.length > 0) {
      setShowSaveDialog(true);
    } else {
      executeDraw();
    }
  };

  const handleSaveAndDraw = () => {
    saveSession(matches, scores);
    executeDraw();
  };

  /* ── score entry ─────────────────────────────────────────────────────── */
  const activeMatch = matches.find((m) => m.id === scoreModal.matchId) || null;

  const handleScoreSave = (matchId, scoreData) => {
    setScores((prev) => ({ ...prev, [matchId]: scoreData }));
  };

  return (
    <>
      <Box
        sx={{
          borderRadius: "14px",
          bgcolor: isDark ? "#0d1a2b" : "#ffffff",
          border: `1.5px solid ${isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"}`,
          overflow: "hidden",
          animation: "fadeUp 0.5s ease 0.3s both",
        }}
      >
        <Box sx={{ px: { xs: 2, sm: 3 }, pt: { xs: 2.5, sm: 3 }, pb: { xs: 2.5, sm: 3 } }}>
          {/* Header */}
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 3 }}>
            <Box>
              <Typography
                variant="h5"
                sx={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 700,
                  fontSize: { xs: "1.25rem", sm: "1.5rem" },
                  color: isDark ? "#f0f6ff" : "#0f172a",
                  lineHeight: 1.2,
                }}
              >
                🎯 Draw Fixtures
              </Typography>
              <Typography variant="caption" sx={{ color: isDark ? "#64748b" : "#9ca3af", fontSize: "0.8rem" }}>
                Filter by club rating, then draw random matchups
              </Typography>
            </Box>

            {/* Match History button */}
            <Button
              size="small"
              variant="outlined"
              startIcon={<HistoryIcon sx={{ fontSize: "16px !important" }} />}
              onClick={() => setShowHistory(true)}
              sx={{
                borderRadius: "8px",
                fontSize: "0.8rem",
                py: 0.75,
                flexShrink: 0,
                ml: 1,
                color: isDark ? "#60a5fa" : "#3b82f6",
                borderColor: isDark ? "rgba(96,165,250,0.35)" : "rgba(59,130,246,0.3)",
                "&:hover": { bgcolor: isDark ? "rgba(96,165,250,0.08)" : "rgba(59,130,246,0.06)" },
              }}
            >
              History
            </Button>
          </Box>

          {/* Rating filter */}
          <FormControl fullWidth sx={{ mb: 2.5 }}>
            <InputLabel
              sx={{
                fontFamily: "'Barlow', sans-serif",
                fontWeight: 500,
                color: isDark ? "#64748b" : "#9ca3af",
                "&.Mui-focused": { color: isDark ? "#22c55e" : "#16a34a" },
              }}
            >
              Club star rating
            </InputLabel>
            <Select
              value={rank}
              label="Club star rating"
              onChange={(e) => setRank(e.target.value)}
              sx={{
                borderRadius: "10px",
                fontFamily: "'Barlow', sans-serif",
                fontWeight: 500,
                color: isDark ? "#f0f6ff" : "#0f172a",
                bgcolor: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.01)",
                "& .MuiOutlinedInput-notchedOutline": { borderColor: isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.12)" },
                "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: isDark ? "rgba(34,197,94,0.4)" : "rgba(22,163,74,0.35)" },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: isDark ? "#22c55e" : "#16a34a" },
              }}
            >
              <MenuItem value="wc2026">🏆 WC 2026 — All 48 Nations</MenuItem>
              <MenuItem value={5}>⭐⭐⭐⭐⭐ — 5 Stars</MenuItem>
              <MenuItem value={4}>⭐⭐⭐⭐ — 4 Stars</MenuItem>
              <MenuItem value={3}>⭐⭐⭐ — 3 Stars</MenuItem>
              <MenuItem value={2}>⭐⭐ — 2 Stars</MenuItem>
              <MenuItem value={1}>⭐ — 1 Star</MenuItem>
              <MenuItem value="all">All ratings</MenuItem>
            </Select>
          </FormControl>

          {/* Draw button */}
          <Button
            fullWidth
            variant="contained"
            size="large"
            startIcon={<SportsSoccerIcon />}
            onClick={draw}
            disabled={isDrawing}
            sx={{
              borderRadius: "12px",
              py: { xs: 1.8, sm: 2 },
              fontSize: { xs: "1.1rem", sm: "1.2rem" },
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 800,
              letterSpacing: "0.04em",
              bgcolor: isDark ? "#22c55e" : "#16a34a",
              color: "#fff",
              transition: "all 0.25s ease",
              "&:hover:not(:disabled)": {
                bgcolor: isDark ? "#16a34a" : "#15803d",
                transform: "translateY(-2px)",
                boxShadow: isDark ? "0 8px 24px rgba(34,197,94,0.35)" : "0 8px 24px rgba(22,163,74,0.3)",
              },
              "&:disabled": { opacity: 0.55 },
            }}
          >
            {isDrawing ? "Drawing fixtures..." : "Draw Fixtures"}
          </Button>

          {/* Empty state */}
          {!hasDrawn && !isDrawing && (
            <Box
              sx={{
                mt: 3, py: 5, textAlign: "center",
                borderRadius: "10px",
                border: `1.5px dashed ${isDark ? "rgba(34,197,94,0.18)" : "rgba(22,163,74,0.15)"}`,
              }}
            >
              <Typography sx={{ fontSize: "2rem", mb: 1, lineHeight: 1 }}>🏟️</Typography>
              <Typography sx={{
                fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600, fontSize: "1rem",
                color: isDark ? "#64748b" : "#9ca3af", mb: 0.5,
              }}>
                No fixtures drawn yet
              </Typography>
              <Typography variant="caption" sx={{ color: isDark ? "#475569" : "#b0b8c4" }}>
                Add your players and clubs, then draw fixtures above
              </Typography>
            </Box>
          )}
        </Box>

        {/* Fixtures list */}
        {(hasDrawn || isDrawing) && (
          <Box ref={pairsRef}>
            <PairsSection
              matches={matches}
              scores={scores}
              isDrawing={isDrawing}
              mode={mode}
              onMatchClick={(match) => setScoreModal({ open: true, matchId: match.id })}
            />
          </Box>
        )}
      </Box>

      {/* Dialogs */}
      <SaveResultsDialog
        open={showSaveDialog}
        mode={mode}
        onSave={handleSaveAndDraw}
        onSkip={executeDraw}
        onCancel={() => setShowSaveDialog(false)}
      />

      <ScoreEntryModal
        open={scoreModal.open}
        onClose={() => setScoreModal({ open: false, matchId: null })}
        match={activeMatch}
        scores={scores}
        onSave={handleScoreSave}
        allMatches={matches}
        mode={mode}
      />

      <MatchHistoryModal
        open={showHistory}
        onClose={() => setShowHistory(false)}
        mode={mode}
      />
    </>
  );
};

export default FormSubmit;
