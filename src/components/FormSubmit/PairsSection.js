import { Box, Typography, Avatar, Chip, Skeleton } from "@mui/material";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import EditNoteIcon from "@mui/icons-material/EditNote";

const COLORS = ["#22c55e","#60a5fa","#f87171","#fbbf24","#a78bfa","#34d399","#f97316","#e879f9"];
const teamColor = (name) => COLORS[(name || "").charCodeAt(0) % COLORS.length];

/* ── single team side ───────────────────────────────────────────────────── */
const TeamSide = ({ side, mode }) => {
  const isDark = mode === "dark";
  const color = teamColor(side?.team?.name || "");
  const p1c = teamColor(side?.player1?.name || "");
  const p2c = teamColor(side?.player2?.name || "");

  return (
    <Box sx={{
      flex: 1, minWidth: 0,
      display: "flex", flexDirection: "column", alignItems: "center",
      textAlign: "center", gap: 0.75,
    }}>
      <Avatar
        alt={side?.team?.name}
        src={side?.team?.image}
        sx={{
          width: { xs: 44, sm: 56 }, height: { xs: 44, sm: 56 },
          borderRadius: "10px",
          bgcolor: `${color}20`, border: `2px solid ${color}44`, color,
          fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: "1rem",
        }}
      />
      <Box sx={{ minWidth: 0, width: "100%" }}>
        <Typography sx={{
          fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700,
          fontSize: { xs: "0.82rem", sm: "0.95rem" },
          color: isDark ? "#f0f6ff" : "#0f172a",
          overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", lineHeight: 1.2,
        }}>
          {side?.team?.name}
        </Typography>
        <Typography sx={{ fontSize: "0.6rem", lineHeight: 1.3 }}>
          {"⭐".repeat(side?.team?.ranking || 0)}
        </Typography>
      </Box>
      <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 0.5 }}>
        {side?.player1 && (
          <Chip size="small" label={side.player1.name} sx={{
            borderRadius: "6px", fontFamily: "'Barlow', sans-serif", fontWeight: 600,
            fontSize: "0.72rem", bgcolor: `${p1c}18`, color: p1c, border: `1px solid ${p1c}33`,
            height: 24, maxWidth: "100%",
            "& .MuiChip-label": { overflow: "hidden", textOverflow: "ellipsis" },
          }} />
        )}
        {side?.player2 && (
          <Chip size="small" label={side.player2.name} sx={{
            borderRadius: "6px", fontFamily: "'Barlow', sans-serif", fontWeight: 600,
            fontSize: "0.72rem", bgcolor: `${p2c}18`, color: p2c, border: `1px solid ${p2c}33`,
            height: 24, maxWidth: "100%",
            "& .MuiChip-label": { overflow: "hidden", textOverflow: "ellipsis" },
          }} />
        )}
        {!side?.player1 && !side?.player2 && (
          <Typography variant="caption" sx={{ color: isDark ? "#475569" : "#9ca3af", fontStyle: "italic", fontSize: "0.68rem" }}>
            No players
          </Typography>
        )}
      </Box>
    </Box>
  );
};

/* ── waiting-team placeholder ───────────────────────────────────────────── */
const WaitingSide = ({ isDark, opponent, mode }) => {
  if (opponent) return <TeamSide side={opponent} mode={mode} />;
  return (
    <Box sx={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 1, py: 1 }}>
      <Box sx={{
        px: 1.5, py: 0.75, borderRadius: "8px",
        bgcolor: isDark ? "rgba(251,191,36,0.1)" : "rgba(217,119,6,0.07)",
        border: `1px solid ${isDark ? "rgba(251,191,36,0.2)" : "rgba(217,119,6,0.15)"}`,
      }}>
        <Typography variant="caption" sx={{ fontWeight: 600, color: isDark ? "#fbbf24" : "#d97706", fontSize: "0.72rem" }}>
          🟡 Tap to select opponent
        </Typography>
      </Box>
    </Box>
  );
};

/* ── VS / score badge ───────────────────────────────────────────────────── */
const VsBadge = ({ match, score, isDark, opponent }) => {
  const hasScore = typeof score?.scoreA === "number" && typeof score?.scoreB === "number";
  const colorA = teamColor(match.teamA?.team?.name || "");
  const colorB = teamColor((match.teamB || score?.opponent || opponent)?.team?.name || "");

  if (hasScore) {
    return (
      <Box sx={{ flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: 0.25 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <Typography sx={{
            fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800,
            fontSize: { xs: "1.5rem", sm: "1.8rem" }, lineHeight: 1, color: colorA,
          }}>{score.scoreA}</Typography>
          <Typography sx={{ color: isDark ? "#475569" : "#cbd5e1", fontWeight: 700, fontSize: "1rem" }}>—</Typography>
          <Typography sx={{
            fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800,
            fontSize: { xs: "1.5rem", sm: "1.8rem" }, lineHeight: 1, color: colorB,
          }}>{score.scoreB}</Typography>
        </Box>
        <Typography sx={{ fontSize: "0.6rem", color: isDark ? "#22c55e" : "#16a34a", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>
          scored
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: 0.5 }}>
      <Typography sx={{
        fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800,
        fontSize: { xs: "0.9rem", sm: "1.05rem" }, letterSpacing: "0.04em",
        color: isDark ? "#64748b" : "#9ca3af", lineHeight: 1,
      }}>
        VS
      </Typography>
      <EditNoteIcon sx={{ fontSize: 14, color: isDark ? "#334155" : "#d1d5db" }} />
    </Box>
  );
};

/* ── skeleton ───────────────────────────────────────────────────────────── */
const SkeletonCard = ({ isDark }) => {
  const bg = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)";
  const Side = () => (
    <Box sx={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
      <Skeleton variant="rectangular" width={48} height={48} sx={{ borderRadius: "10px", bgcolor: bg }} />
      <Skeleton width="65%" height={16} sx={{ bgcolor: bg }} />
      <Box sx={{ display: "flex", gap: 0.5 }}>
        <Skeleton variant="rectangular" width={52} height={22} sx={{ borderRadius: "6px", bgcolor: bg }} />
        <Skeleton variant="rectangular" width={48} height={22} sx={{ borderRadius: "6px", bgcolor: bg }} />
      </Box>
    </Box>
  );
  return (
    <Box sx={{
      borderRadius: "14px",
      bgcolor: isDark ? "#0d1a2b" : "#ffffff",
      border: `1.5px solid ${isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"}`,
      p: { xs: 2, sm: 2.5 },
      display: "flex", alignItems: "center", gap: 1.5,
    }}>
      <Side />
      <Skeleton width={26} height={20} sx={{ bgcolor: bg, flexShrink: 0 }} />
      <Side />
    </Box>
  );
};

/* ── main ───────────────────────────────────────────────────────────────── */
const PairsSection = ({ matches, scores, isDrawing, mode, onMatchClick }) => {
  const isDark = mode === "dark";
  const skeletonCount = Math.max(matches?.length || 3, 3);

  return (
    <Box sx={{
      borderTop: `1px solid ${isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"}`,
      px: { xs: 2, sm: 3 },
      pb: { xs: 3, sm: 4 },
      pt: 3,
    }}>
      {/* Section title */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2.5 }}>
        <SportsSoccerIcon sx={{ color: isDark ? "#22c55e" : "#16a34a", fontSize: 20 }} />
        <Typography sx={{
          fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "1.15rem",
          color: isDark ? "#f0f6ff" : "#0f172a",
        }}>
          {isDrawing
            ? "Drawing fixtures…"
            : `Today's Fixtures — ${matches.length} match${matches.length !== 1 ? "es" : ""}`}
        </Typography>
      </Box>
      {!isDrawing && matches.length > 0 && (
        <Typography variant="caption" sx={{ display: "block", color: isDark ? "#475569" : "#b0b8c4", mb: 2, fontSize: "0.75rem" }}>
          Tap any fixture to enter the score
        </Typography>
      )}

      {/* Cards */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {isDrawing
          ? Array.from({ length: skeletonCount }).map((_, i) => <SkeletonCard key={i} isDark={isDark} />)
          : matches.map((match) => {
              const score = scores?.[match.id];
              const hasScore = typeof score?.scoreA === "number";
              const opponent = !match.teamB ? score?.opponent || null : null;

              return (
                <Box
                  key={match.id}
                  onClick={() => onMatchClick(match)}
                  sx={{
                    borderRadius: "14px",
                    bgcolor: isDark ? "#0d1a2b" : "#ffffff",
                    border: `1.5px solid ${
                      hasScore
                        ? isDark ? "rgba(34,197,94,0.3)" : "rgba(22,163,74,0.25)"
                        : isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"
                    }`,
                    p: { xs: 2, sm: 2.5 },
                    display: "flex", alignItems: "center",
                    gap: { xs: 1, sm: 2 },
                    cursor: "pointer",
                    transition: "border-color 0.2s, box-shadow 0.2s, transform 0.15s",
                    "&:hover": {
                      borderColor: isDark ? "rgba(34,197,94,0.4)" : "rgba(22,163,74,0.35)",
                      boxShadow: isDark ? "0 4px 16px rgba(34,197,94,0.1)" : "0 4px 16px rgba(22,163,74,0.08)",
                      transform: "translateY(-1px)",
                    },
                    "&:active": { transform: "translateY(0)" },
                  }}
                >
                  <TeamSide side={match.teamA} mode={mode} />
                  <VsBadge match={match} score={score} isDark={isDark} opponent={opponent} />
                  {match.teamB
                    ? <TeamSide side={match.teamB} mode={mode} />
                    : <WaitingSide isDark={isDark} opponent={opponent} mode={mode} />
                  }
                </Box>
              );
            })}
      </Box>
    </Box>
  );
};

export default PairsSection;
