import {
  Box,
  InputLabel,
  MenuItem,
  Select,
  Card,
  CardContent,
  FormControl,
  Fade,
} from "@mui/material";
import React, { useContext, useState, useRef } from "react";
import { TeamsContext } from "../../context/TeamsContext";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import Button from "@mui/material/Button";
import PairsSection from "./PairsSection";
import { shuffle } from "../../functions";
import Typography from "@mui/material/Typography";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

const FormSubmit = ({ mode }) => {
  const [rank, setRank] = useState(5);
  const { players, teams, setSelectedTeams } = useContext(TeamsContext);
  const [randomPairs, setRandomPairs] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasPairs, setHasPairs] = useState(false);
  const pairsSectionRef = useRef(null);

  const handleRankChange = (e) => {
    setRank(e.target.value);
  };

  const imageCacheKey = "teamImageCache";

  const getImageCache = () => {
    try {
      const cache = JSON.parse(localStorage.getItem(imageCacheKey));
      return cache && typeof cache === "object" ? cache : {};
    } catch (error) {
      return {};
    }
  };

  const saveImageCache = (cache) => {
    localStorage.setItem(imageCacheKey, JSON.stringify(cache));
  };

  // Fetch real football team logos from TheSportsDB API only when needed
  const updateTeamImages = async (teamsToUpdate) => {
    const cache = getImageCache();
    let cacheChanged = false;

    const updatedTeams = await Promise.all(
      teamsToUpdate.map(async (team) => {
        // Skip API search if user provided a custom image
        if (team.imageSource === "custom" && team.image) {
          return team;
        }

        // Use cached SportsDB logo if already fetched before
        const cached = cache[team.id];
        if (cached?.image && cached?.source === "sportsdb") {
          return { ...team, image: cached.image, imageSource: "sportsdb" };
        }

        try {
          const teamName = encodeURIComponent(team.name);
          const response = await fetch(
            `https://www.thesportsdb.com/api/v1/json/3/searchteams.php?t=${teamName}`,
          );
          const data = await response.json();

          if (data.teams && data.teams.length > 0) {
            const teamData = data.teams[0];
            const newImage =
              teamData.strBadge || teamData.strTeamBadge || team.image;

            if (newImage) {
              cache[team.id] = {
                image: newImage,
                source: "sportsdb",
                ts: Date.now(),
              };
              cacheChanged = true;
              return { ...team, image: newImage, imageSource: "sportsdb" };
            }
          }

          return team;
        } catch (error) {
          console.error("Failed to fetch team logo:", error);
          return team;
        }
      }),
    );

    if (cacheChanged) {
      saveImageCache(cache);
    }

    return updatedTeams;
  };

  const handleShuffle = async () => {
    setIsGenerating(true);

    let filteredTeams;
    if (rank === "all") {
      filteredTeams = teams;
    } else {
      filteredTeams = teams.filter((team) => team.ranking === rank);
    }

    setTimeout(() => {
      const shuffledTeams = shuffle(filteredTeams);
      const shuffledPlayers = shuffle(players);

      const pairs = shuffledTeams.map((team, index) => {
        const player1 = shuffledPlayers[index * 2];
        const player2 = shuffledPlayers[index * 2 + 1];

        if (!player1 && !player2) return null;
        return {
          team: {
            name: team.name,
            image: team.image,
            ranking: team.ranking,
            id: team.id,
          },
          player1: player1 || null,
          player2: player2 || null,
        };
      });

      const filteredPairs = pairs.filter((pair) => pair !== null);
      setRandomPairs(filteredPairs);
      setSelectedTeams(shuffledTeams);
      setIsGenerating(false);
      setHasPairs(true);

      // Fetch images in background after displaying pairs
      updateTeamImages(shuffledTeams).then((teamsWithNewImages) => {
        const updatedPairs = filteredPairs.map((pair) => {
          const updatedTeam = teamsWithNewImages.find(
            (t) => t.id === pair.team.id,
          );
          if (updatedTeam && updatedTeam.image !== pair.team.image) {
            return {
              ...pair,
              team: {
                ...pair.team,
                image: updatedTeam.image,
                imageSource: updatedTeam.imageSource,
              },
            };
          }
          return pair;
        });

        const hasChanges = updatedPairs.some(
          (pair, index) => pair.team.image !== filteredPairs[index]?.team.image,
        );
        if (hasChanges) {
          setRandomPairs(updatedPairs);
        }
      });
    }, 300);

    // Scroll to pairs section after DOM updates
    setTimeout(() => {
      if (pairsSectionRef.current) {
        pairsSectionRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 200);
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
              ? "rgba(245, 158, 11, 0.2)"
              : "rgba(245, 158, 11, 0.15)"
          }`,
          boxShadow:
            mode === "dark"
              ? "0 20px 40px rgba(245, 158, 11, 0.2)"
              : "0 15px 35px rgba(245, 158, 11, 0.1)",
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
                ? "linear-gradient(90deg, #f59e0b 0%, #fbbf24 50%, #f59e0b 100%)"
                : "linear-gradient(90deg, #f59e0b 0%, #fbbf24 50%, #f59e0b 100%)",
          },
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow:
              mode === "dark"
                ? "0 25px 50px rgba(245, 158, 11, 0.3)"
                : "0 20px 40px rgba(245, 158, 11, 0.15)",
          },
        }}
      >
        <CardContent
          sx={{
            p: { xs: 3, sm: 4, md: 5 },
          }}
        >
          <Box sx={{ mb: 4, textAlign: "center" }}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 800,
                mb: 1,
                fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2rem" },
                background:
                  mode === "dark"
                    ? "linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)"
                    : "linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              ⚡ Generate Matchups
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "text.secondary",
                fontSize: { xs: "0.85rem", sm: "0.9rem" },
                fontWeight: 500,
              }}
            >
              Create perfectly balanced team pairings with AI precision
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: 3,
              alignItems: { xs: "stretch", sm: "flex-end" },
              mb: 4,
              p: { xs: 3, sm: 3.5 },
              backgroundColor:
                mode === "dark"
                  ? "rgba(245, 158, 11, 0.1)"
                  : "rgba(245, 158, 11, 0.05)",
              borderRadius: "1.5rem",
              border: `2px solid ${
                mode === "dark"
                  ? "rgba(245, 158, 11, 0.2)"
                  : "rgba(245, 158, 11, 0.15)"
              }`,
              transition: "all 0.3s ease",
              "&:hover": {
                borderColor:
                  mode === "dark"
                    ? "rgba(245, 158, 11, 0.3)"
                    : "rgba(245, 158, 11, 0.25)",
                backgroundColor:
                  mode === "dark"
                    ? "rgba(245, 158, 11, 0.15)"
                    : "rgba(245, 158, 11, 0.08)",
              },
            }}
          >
            <FormControl sx={{ minWidth: { xs: "100%", sm: 240 }, flex: 1 }}>
              <InputLabel
                id="rank-select-label"
                sx={{
                  fontWeight: 600,
                  color: "text.secondary",
                }}
              >
                Select Team Rank
              </InputLabel>
              <Select
                labelId="rank-select-label"
                id="rank-select"
                value={rank}
                label="Select Team Rank"
                onChange={handleRankChange}
                sx={{
                  borderRadius: "12px",
                  fontWeight: 600,
                  background:
                    mode === "dark"
                      ? "rgba(17, 17, 27, 0.6)"
                      : "rgba(255, 255, 255, 0.9)",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor:
                      mode === "dark"
                        ? "rgba(245, 158, 11, 0.3)"
                        : "rgba(245, 158, 11, 0.2)",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor:
                      mode === "dark"
                        ? "rgba(245, 158, 11, 0.5)"
                        : "rgba(245, 158, 11, 0.4)",
                  },
                }}
              >
                <MenuItem value={5}>⭐⭐⭐⭐⭐ (5 Stars)</MenuItem>
                <MenuItem value={4}>⭐⭐⭐⭐ (4 Stars)</MenuItem>
                <MenuItem value={3}>⭐⭐⭐ (3 Stars)</MenuItem>
                <MenuItem value={2}>⭐⭐ (2 Stars)</MenuItem>
                <MenuItem value={1}>⭐ (1 Star)</MenuItem>
                <MenuItem value={"all"}>All Ranks</MenuItem>
              </Select>
            </FormControl>

            <Button
              variant="contained"
              size="large"
              startIcon={<AutoAwesomeIcon />}
              endIcon={isGenerating ? null : <ShuffleIcon />}
              onClick={handleShuffle}
              disabled={isGenerating}
              sx={{
                borderRadius: "12px",
                px: { xs: 3, sm: 4 },
                py: 1.5,
                fontWeight: 700,
                fontSize: { xs: "0.95rem", sm: "1rem" },
                width: { xs: "100%", sm: "auto" },
                background:
                  mode === "dark"
                    ? "linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)"
                    : "linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)",
                boxShadow: "0 8px 24px rgba(245, 158, 11, 0.4)",
                minWidth: { sm: 200 },
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                "&:hover:not(:disabled)": {
                  boxShadow: "0 12px 32px rgba(245, 158, 11, 0.5)",
                  transform: "translateY(-3px) scale(1.02)",
                },
                "&:disabled": {
                  opacity: 0.6,
                },
              }}
            >
              {isGenerating ? "Generating..." : "Generate Pairs"}
            </Button>
          </Box>

          {randomPairs.length === 0 && (
            <Fade in={randomPairs.length === 0} timeout={400}>
              <Box
                sx={{
                  py: 10,
                  textAlign: "center",
                  borderRadius: "1.5rem",
                  background:
                    mode === "dark"
                      ? "rgba(245, 158, 11, 0.05)"
                      : "rgba(245, 158, 11, 0.03)",
                  border: `2px dashed ${
                    mode === "dark"
                      ? "rgba(245, 158, 11, 0.2)"
                      : "rgba(245, 158, 11, 0.15)"
                  }`,
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    mb: 1,
                    fontSize: { xs: "1rem", sm: "1.15rem" },
                    fontWeight: 600,
                    opacity: 0.7,
                  }}
                >
                  🎲 Ready to Create Magic?
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "text.secondary", opacity: 0.8 }}
                >
                  Select your desired team rank and hit "Generate Pairs" to
                  create epic matchups
                </Typography>
              </Box>
            </Fade>
          )}

          {(hasPairs || isGenerating) && (
            <Box ref={pairsSectionRef}>
              <PairsSection
                randomPairs={randomPairs}
                mode={mode}
                disableAnimation
                isGenerating={isGenerating}
              />
            </Box>
          )}
        </CardContent>
      </Card>
    </Fade>
  );
};

export default FormSubmit;
