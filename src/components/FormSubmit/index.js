import {
  Box,
  InputLabel,
  MenuItem,
  Select,
  Card,
  CardContent,
  FormControl,
  Fade,
  Divider,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { TeamsContext } from "../../context/TeamsContext";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import Button from "@mui/material/Button";
import PairsSection from "./PairsSection";
import { shuffle } from "../../functions";
import Typography from "@mui/material/Typography";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";

const FormSubmit = () => {
  const [rank, setRank] = useState(5);
  const { players, teams, setSelectedTeams } = useContext(TeamsContext);
  const [randomPairs, setRandomPairs] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleRankChange = (e) => {
    setRank(e.target.value);
  };

  const handleShuffle = () => {
    setIsGenerating(true);
    setTimeout(() => {
      let filteredTeams;
      if (rank === "all") {
        filteredTeams = teams;
      } else {
        filteredTeams = teams.filter((team) => team.ranking === rank);
      }

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
          },
          player1: player1 || null,
          player2: player2 || null,
        };
      });

      setRandomPairs(pairs.filter((pair) => pair !== null));
      setSelectedTeams(filteredTeams);
      setIsGenerating(false);

      const screenWidth = window.innerWidth;
      if (screenWidth < 600) {
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: "smooth",
        });
      }
    }, 300);
  };

  return (
    <Fade in={true} timeout={800}>
      <Card
        sx={{
          mb: { xs: 3, sm: 4, md: 5 },
          borderRadius: "1.5rem",
          background: "linear-gradient(135deg, rgba(245, 158, 11, 0.05) 0%, rgba(99, 102, 241, 0.05) 100%)",
          border: "2px solid rgba(245, 158, 11, 0.1)",
          boxShadow: "0 8px 24px rgba(245, 158, 11, 0.08)",
          transition: "all 0.3s ease",
          "&:hover": {
            boxShadow: "0 12px 36px rgba(245, 158, 11, 0.12)",
          },
        }}
      >
        <CardContent
          sx={{
            p: { xs: 2, sm: 3, md: 4 },
          }}
        >
          <Box sx={{ mb: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: 800, mb: 0.5, fontSize: { xs: "1.3rem", sm: "1.5rem" } }}>
              ⚡ Generate Random Pairs
            </Typography>
            <Typography variant="caption" sx={{ color: "text.secondary", fontSize: { xs: "0.75rem", sm: "0.8rem" } }}>
              Mix your players with teams and create exciting matchups
            </Typography>
          </Box>

          <Divider sx={{ mb: 3 }} />

          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: 2,
              alignItems: { xs: "stretch", sm: "flex-end" },
              mb: 3,
              p: { xs: 2, sm: 2.5 },
              backgroundColor: "rgba(245, 158, 11, 0.05)",
              borderRadius: "1rem",
              border: "1.5px solid rgba(245, 158, 11, 0.2)",
              transition: "all 0.3s ease",
              "&:hover": {
                borderColor: "rgba(245, 158, 11, 0.4)",
                backgroundColor: "rgba(245, 158, 11, 0.08)",
              },
            }}
          >
            <FormControl sx={{ minWidth: { xs: "100%", sm: 200 } }}>
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
                  borderRadius: "0.75rem",
                  fontWeight: 600,
                  "& .MuiOutlinedInput-root:hover": {
                    boxShadow: "0 2px 8px rgba(245, 158, 11, 0.1)",
                  }
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
              color="warning"
              size="large"
              startIcon={<ElectricBoltIcon />}
              endIcon={isGenerating ? null : <ShuffleIcon />}
              onClick={handleShuffle}
              disabled={isGenerating}
              sx={{
                borderRadius: "0.75rem",
                px: { xs: 2, sm: 4 },
                py: 1.5,
                fontWeight: 700,
                width: { xs: "100%", sm: "auto" },
                boxShadow: "0 4px 15px rgba(245, 158, 11, 0.3)",
                "&:hover:not(:disabled)": {
                  boxShadow: "0 6px 20px rgba(245, 158, 11, 0.4)",
                  transform: "translateY(-2px)",
                },
                transition: "all 0.3s ease",
                "&:disabled": {
                  opacity: 0.7,
                }
              }}
            >
              {isGenerating ? "Shuffling..." : "Generate Pairs"}
            </Button>
          </Box>

          {randomPairs.length === 0 && (
            <Fade in={randomPairs.length === 0} timeout={300}>
              <Box
                sx={{
                  py: 8,
                  textAlign: "center",
                  color: "text.secondary",
                }}
              >
                <Typography variant="h6" sx={{ mb: 1, fontSize: "1.1rem" }}>
                  🎯 No pairs generated yet
                </Typography>
                <Typography variant="body2">
                  Select a rank and click "Generate Pairs" to create exciting random matchups
                </Typography>
              </Box>
            </Fade>
          )}

          {randomPairs.length > 0 && <PairsSection randomPairs={randomPairs} />}
        </CardContent>
      </Card>
    </Fade>
  );
};

export default FormSubmit;
