import {
  Box,
  InputLabel,
  MenuItem,
  Select,
  Card,
  CardContent,
  FormControl,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { TeamsContext } from "../../context/TeamsContext";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import Button from "@mui/material/Button";
import PairsSection from "./PairsSection";
import { shuffle } from "../../functions";
import Typography from "@mui/material/Typography";

const FormSubmit = () => {
  const [rank, setRank] = useState(5);
  const { players, teams, setSelectedTeams } = useContext(TeamsContext);
  const [randomPairs, setRandomPairs] = useState([]);

  const handleRankChange = (e) => {
    setRank(e.target.value);
  };

  const handleShuffle = () => {
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

    const screenWidth = window.innerWidth;
    if (screenWidth < 600) {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  return (
    <Card
      sx={{
        mb: { xs: 3, sm: 4, md: 5 },
        borderRadius: "1rem",
      }}
    >
      <CardContent
        sx={{
          p: { xs: 2, sm: 3, md: 4 },
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
          ⚙️ Generate Random Pairs
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: 2,
            alignItems: { xs: "flex-start", sm: "flex-end" },
            mb: 4,
            p: 2,
            backgroundColor: "rgba(99, 102, 241, 0.05)",
            borderRadius: "0.75rem",
            border: "1px solid rgba(99, 102, 241, 0.2)",
          }}
        >
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel id="rank-select-label">Select Team Rank</InputLabel>
            <Select
              labelId="rank-select-label"
              id="rank-select"
              value={rank}
              label="Select Team Rank"
              onChange={handleRankChange}
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
            color="primary"
            size="large"
            endIcon={<ShuffleIcon />}
            onClick={handleShuffle}
            sx={{
              borderRadius: "0.5rem",
              px: 4,
              py: 1.5,
            }}
          >
            Generate Pairs
          </Button>
        </Box>

        {randomPairs.length === 0 && (
          <Box
            sx={{
              py: 8,
              textAlign: "center",
              color: "text.secondary",
            }}
          >
            <Typography variant="h6" sx={{ mb: 1 }}>
              No pairs generated yet
            </Typography>
            <Typography variant="body2">
              Select a rank and click "Generate Pairs" to create random team
              pairings
            </Typography>
          </Box>
        )}

        {randomPairs.length > 0 && <PairsSection randomPairs={randomPairs} />}
      </CardContent>
    </Card>
  );
};

export default FormSubmit;
