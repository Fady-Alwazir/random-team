import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import TeamsModal from "./TeamsModal";

const Teams = () => {
  const [showTeams, setShowTeams] = useState(false);
  return (
    <Box
      sx={{ padding: "1rem", display: "flex", flexDirection: "column", gap: 2 }}
    >
      <Typography variant="h5" gutterBottom>
        Teams
      </Typography>
      <Button
        sx={{
          backgroundColor: "yellowGreen",
          color: "white",
          "&:hover": {
            backgroundColor: "#7cb342",
          },
          maxWidth: "200px",
        }}
        onClick={() => setShowTeams(true)}
      >
        Show Teams
      </Button>
      <TeamsModal open={showTeams} onClose={() => setShowTeams(false)} />
    </Box>
  );
};

export default Teams;
