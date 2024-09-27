import { Box, InputLabel, MenuItem, Select } from "@mui/material";
import { useContext, useState } from "react";
import { TeamsContext } from "../../context/TeamsContext";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import Button from "@mui/material/Button";
import PairsSection from "./PairsSection";
import { shuffle } from "../../functions";

const FormSubmit = () => {
  const [rank, setRank] = useState(5);
  const { players, teams, setSelectedTeams } = useContext(TeamsContext);
  const [randomPairs, setRandomPairs] = useState([]);

  const handleRankChange = (e) => {
    setRank(e.target.value);
  };

  const handleShuffle = () => {
    // Filter teams based on rank selection
    let filteredTeams;
    if (rank === "all") {
      filteredTeams = teams;
    } else {
      filteredTeams = teams.filter((team) => team.ranking === rank);
    }

    // Shuffle teams and players
    const shuffledTeams = shuffle(filteredTeams);
    const shuffledPlayers = shuffle(players);

    // Generate random pairs of teams and players (each team can have 1 or 2 players)
    const pairs = shuffledTeams.map((team, index) => {
      const player1 = shuffledPlayers[index * 2];
      const player2 = shuffledPlayers[index * 2 + 1];

      // If there's only one player, just return the team with that one player
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
  };

  // Styles for button (extracted for readability)
  const buttonStyles = {
    backgroundColor: "#4CAF50",
    padding: "1rem",
    color: "white",
    "&:hover": {
      backgroundColor: "#45a049",
    },
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1rem",
        padding: "1rem",
        borderRadius: "5px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          alignSelf: "start",
        }}
      >
        <Box>
          <InputLabel id="demo-simple-select-label">Rank</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={rank}
            label="Rank Selection"
            onChange={handleRankChange}
            sx={{ width: "100px" }}
          >
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={4}>4</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={"all"}>All Ranks</MenuItem>
          </Select>
        </Box>
        <Button
          variant="contained"
          endIcon={<ShuffleIcon />}
          onClick={handleShuffle}
          sx={buttonStyles}
        >
          Shuffle Pairs
        </Button>
      </Box>
      {randomPairs.length > 0 && <PairsSection randomPairs={randomPairs} />}
    </Box>
  );
};

export default FormSubmit;
