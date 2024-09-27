import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  Grid,
} from "@mui/material";

const PairsSection = ({ randomPairs }) => {
  const isOdd = randomPairs.length % 2 !== 0;

  return (
    <Grid container spacing={3}>
      {randomPairs.map((pair, index) => {
        // If it's the last team and the total number of teams is odd, display the team alone
        if (isOdd && index === randomPairs.length - 1) {
          return (
            <Grid item xs={12} key={index}>
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: "1rem",
                }}
              >
                <CardContent
                  sx={{ display: "flex", alignItems: "center", gap: "2rem" }}
                >
                  {/* Team */}
                  <Box
                    sx={{
                      textAlign: "center",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "1rem",
                      padding: "1rem",
                      borderRadius: "5px",
                      boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <Avatar
                      src={pair.team.image}
                      alt={pair.team.name}
                      sx={{ width: 56, height: 56 }}
                    />
                    <Typography variant="h6">{pair.team.name}</Typography>

                    {/* Players */}
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: "bold",
                      }}
                    >
                      {pair.player1?.name || "No Player"}{" "}
                      {`& ${pair.player2?.name}` || null}
                    </Typography>
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
                  display: "flex",
                  justifyContent: "center",
                  padding: "1rem",
                }}
              >
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "2rem",
                    justifyContent: "center",
                  }}
                >
                  {/* First Team */}
                  <Box
                    sx={{
                      textAlign: "center",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "1rem",
                      padding: "1rem",
                      borderRadius: "5px",
                      boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <Avatar
                      src={pair.team.image}
                      alt={pair.team.name}
                      sx={{ width: 56, height: 56 }}
                    />
                    <Typography variant="h6">{pair.team.name}</Typography>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: "bold",
                      }}
                    >
                      {pair.player1?.name || "No Player"}
                      {" & "}
                      {pair.player2?.name || "No Player"}
                    </Typography>
                  </Box>

                  {/* VS */}
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                      VS
                    </Typography>
                  </Box>

                  {/* Second Team (next pair) */}
                  {index + 1 < randomPairs.length && (
                    <Box
                      sx={{
                        textAlign: "center",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "1rem",
                        padding: "1rem",
                        borderRadius: "5px",
                        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      <Avatar
                        src={randomPairs[index + 1].team.image}
                        alt={randomPairs[index + 1].team.name}
                        sx={{ width: 56, height: 56 }}
                      />
                      <Typography variant="h6">
                        {randomPairs[index + 1].team.name}
                      </Typography>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: "bold",
                        }}
                      >
                        {randomPairs[index + 1].player1?.name || "No Player"}
                        {" & "}{" "}
                        {randomPairs[index + 1].player2?.name || "No Player"}
                      </Typography>
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Grid>
          );
        }
        return null; // Skip rendering of the second team in the pair, it's handled in the previous iteration
      })}
    </Grid>
  );
};

export default PairsSection;
