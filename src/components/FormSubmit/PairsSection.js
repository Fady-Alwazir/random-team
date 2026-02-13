import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  Grid,
  Chip,
} from "@mui/material";

const PairsSection = ({ randomPairs }) => {
  const isOdd = randomPairs.length % 2 !== 0;

  const TeamCard = ({ pair }) => (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 1.5,
        p: 2,
        borderRadius: "0.75rem",
        background:
          "linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(16, 185, 129, 0.05) 100%)",
        border: "2px solid rgba(99, 102, 241, 0.2)",
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          borderColor: "primary.light",
          boxShadow: "0 8px 20px rgba(99, 102, 241, 0.15)",
        },
      }}
    >
      <Avatar
        src={pair.team.image}
        alt={pair.team.name}
        sx={{
          width: 80,
          height: 80,
          border: "3px solid white",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
        }}
      />
      <Typography
        variant="h6"
        sx={{
          fontWeight: 700,
          textAlign: "center",
          color: "primary.main",
        }}
      >
        {pair.team.name}
      </Typography>

      <Box
        sx={{
          display: "flex",
          gap: 1,
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {pair.player1 && (
          <Chip
            label={pair.player1.name}
            color="primary"
            variant="outlined"
            sx={{ fontWeight: 500 }}
          />
        )}
        {pair.player2 && (
          <Chip
            label={pair.player2.name}
            color="secondary"
            variant="outlined"
            sx={{ fontWeight: 500 }}
          />
        )}
      </Box>

      {!pair.player1 && !pair.player2 && (
        <Typography
          variant="caption"
          sx={{
            color: "text.secondary",
            fontStyle: "italic",
          }}
        >
          No players assigned
        </Typography>
      )}
    </Box>
  );

  return (
    <Box sx={{ mt: 4 }}>
      <Typography
        variant="h6"
        sx={{
          mb: 3,
          fontWeight: 700,
          color: "primary.main",
        }}
      >
        🎮 Generated Matchups ({randomPairs.length}{" "}
        {randomPairs.length === 1 ? "team" : "teams"})
      </Typography>

      <Grid container spacing={3}>
        {randomPairs.map((pair, index) => {
          // If it's the last team and the total number of teams is odd, display the team alone
          if (isOdd && index === randomPairs.length - 1) {
            return (
              <Grid item xs={12} key={index}>
                <Card
                  sx={{
                    borderRadius: "1rem",
                  }}
                >
                  <CardContent
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      p: 3,
                    }}
                  >
                    <Box sx={{ maxWidth: "300px", width: "100%" }}>
                      <TeamCard pair={pair} />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            );
          }

          // Display two teams facing off (normal case)
          if (index % 2 === 0) {
            return (
              <Grid item xs={12} key={index}>
                <Card
                  sx={{
                    borderRadius: "1rem",
                  }}
                >
                  <CardContent
                    sx={{
                      display: "flex",
                      flexDirection: { xs: "column", sm: "row" },
                      justifyContent: "center",
                      alignItems: "center",
                      gap: { xs: 2, sm: 3 },
                      p: 3,
                    }}
                  >
                    {/* First Team */}
                    <Box sx={{ flex: 1, maxWidth: "300px" }}>
                      <TeamCard pair={pair} />
                    </Box>

                    {/* VS Badge */}
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        px: 2,
                        py: 1,
                      }}
                    >
                      <Typography
                        variant="h5"
                        sx={{
                          fontWeight: 800,
                          color: "primary.main",
                          textShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                        }}
                      >
                        ⚔️
                      </Typography>
                    </Box>

                    {/* Second Team (next pair) */}
                    {index + 1 < randomPairs.length && (
                      <Box sx={{ flex: 1, maxWidth: "300px" }}>
                        <TeamCard pair={randomPairs[index + 1]} />
                      </Box>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            );
          }

          return null;
        })}
      </Grid>
    </Box>
  );
};

export default PairsSection;
