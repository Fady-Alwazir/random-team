import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  Grid,
  Chip,
  Divider,
  Fade,
  Stack,
  Skeleton,
} from "@mui/material";

const PairsSection = ({
  randomPairs,
  disableAnimation = false,
  isGenerating = false,
}) => {
  const isOdd = randomPairs.length % 2 !== 0;
  const skeletonCount = Math.max(randomPairs.length || 4, 4);

  const TeamCard = ({ pair, index }) => {
    const content = (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
          p: 2.5,
          borderRadius: "1.25rem",
          background:
            "linear-gradient(135deg, rgba(99, 102, 241, 0.08) 0%, rgba(16, 185, 129, 0.08) 100%)",
          border: "2px solid rgba(99, 102, 241, 0.3)",
          transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          position: "relative",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: "-100%",
            width: "100%",
            height: "100%",
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)",
            transition: "left 0.6s ease",
          },
          "&:hover": {
            transform: "translateY(-8px) scale(1.02)",
            borderColor: "primary.light",
            boxShadow: "0 12px 30px rgba(99, 102, 241, 0.25)",
            "& .team-avatar": {
              transform: "scale(1.1) rotate(5deg)",
            },
            "& .team-name": {
              color: "primary.main",
            },
          },
        }}
      >
        <Avatar
          src={pair.team.image}
          alt={pair.team.name}
          className="team-avatar"
          sx={{
            width: 90,
            height: 90,
            border: "4px solid white",
            boxShadow: "0 6px 20px rgba(0, 0, 0, 0.15)",
            transition: "all 0.3s ease",
          }}
        />
        <Typography
          className="team-name"
          variant="h6"
          sx={{
            fontWeight: 800,
            textAlign: "center",
            color: "text.primary",
            transition: "all 0.3s ease",
            fontSize: { xs: "0.95rem", sm: "1.1rem" },
          }}
        >
          {pair.team.name}
        </Typography>

        <Divider sx={{ width: "100%", my: 0.5 }} />

        <Stack spacing={1} sx={{ width: "100%", alignItems: "center" }}>
          {pair.player1 && (
            <Chip
              label={pair.player1.name}
              color="primary"
              variant="filled"
              sx={{
                fontWeight: 700,
                fontSize: { xs: "0.75rem", sm: "0.85rem" },
                backgroundColor: "rgba(99, 102, 241, 0.9)",
                color: "white",
                boxShadow: "0 2px 8px rgba(99, 102, 241, 0.3)",
              }}
            />
          )}
          {pair.player2 && (
            <Chip
              label={pair.player2.name}
              color="secondary"
              variant="filled"
              sx={{
                fontWeight: 700,
                fontSize: { xs: "0.75rem", sm: "0.85rem" },
                backgroundColor: "rgba(16, 185, 129, 0.9)",
                color: "white",
                boxShadow: "0 2px 8px rgba(16, 185, 129, 0.3)",
              }}
            />
          )}
        </Stack>

        {!pair.player1 && !pair.player2 && (
          <Typography
            variant="caption"
            sx={{
              color: "text.secondary",
              fontStyle: "italic",
              fontWeight: 500,
            }}
          >
            No players assigned
          </Typography>
        )}
      </Box>
    );

    if (disableAnimation) {
      return content;
    }

    return (
      <Fade in={true} timeout={300 + index * 100}>
        {content}
      </Fade>
    );
  };

  return (
    <Box sx={{ mt: 5 }}>
      <Box sx={{ mb: 4, textAlign: "center" }}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 800,
            mb: 1,
            background: "linear-gradient(135deg, #6366f1 0%, #10b981 100%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          🎮 Generated Matchups
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
            fontWeight: 600,
          }}
        >
          {isGenerating
            ? "Refreshing matchups..."
            : `${randomPairs.length} ${
                randomPairs.length === 1 ? "team" : "teams"
              } ready to battle`}
        </Typography>
      </Box>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        {isGenerating
          ? Array.from({ length: skeletonCount }).map((_, index) => (
              <Grid item xs={12} key={`skeleton-${index}`}>
                <Card
                  sx={{
                    borderRadius: "1.5rem",
                    border: "2px solid rgba(99, 102, 241, 0.15)",
                    background:
                      "linear-gradient(135deg, rgba(99, 102, 241, 0.02) 0%, rgba(16, 185, 129, 0.02) 100%)",
                    boxShadow: "0 4px 15px rgba(99, 102, 241, 0.08)",
                  }}
                >
                  <CardContent
                    sx={{
                      display: "flex",
                      flexDirection: { xs: "column", sm: "row" },
                      justifyContent: "center",
                      alignItems: "center",
                      gap: { xs: 2.5, sm: 4 },
                      p: { xs: 2.5, sm: 4 },
                    }}
                  >
                    <Box sx={{ flex: 1, maxWidth: "320px", width: "100%" }}>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          gap: 2,
                          p: 2.5,
                          borderRadius: "1.25rem",
                          background:
                            "linear-gradient(135deg, rgba(99, 102, 241, 0.08) 0%, rgba(16, 185, 129, 0.08) 100%)",
                          border: "2px solid rgba(99, 102, 241, 0.3)",
                        }}
                      >
                        <Skeleton variant="circular" width={90} height={90} />
                        <Skeleton variant="text" width="70%" height={28} />
                        <Skeleton variant="text" width="50%" height={20} />
                        <Skeleton variant="rounded" width="80%" height={32} />
                        <Skeleton variant="rounded" width="75%" height={32} />
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))
          : randomPairs.map((pair, index) => {
              if (isOdd && index === randomPairs.length - 1) {
                return (
                  <Grid item xs={12} key={index}>
                    <Card
                      sx={{
                        borderRadius: "1.5rem",
                        border: "2px solid rgba(99, 102, 241, 0.15)",
                        background:
                          "linear-gradient(135deg, rgba(99, 102, 241, 0.02) 0%, rgba(16, 185, 129, 0.02) 100%)",
                        boxShadow: "0 4px 15px rgba(99, 102, 241, 0.08)",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          boxShadow: "0 8px 25px rgba(99, 102, 241, 0.12)",
                        },
                      }}
                    >
                      <CardContent
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          p: 4,
                        }}
                      >
                        <Box sx={{ maxWidth: "320px", width: "100%" }}>
                          <TeamCard pair={pair} index={index} />
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                );
              }

              if (index % 2 === 0) {
                return (
                  <Grid item xs={12} key={index}>
                    <Card
                      sx={{
                        borderRadius: "1.5rem",
                        border: "2px solid rgba(99, 102, 241, 0.15)",
                        background:
                          "linear-gradient(135deg, rgba(99, 102, 241, 0.02) 0%, rgba(16, 185, 129, 0.02) 100%)",
                        boxShadow: "0 4px 15px rgba(99, 102, 241, 0.08)",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          boxShadow: "0 8px 25px rgba(99, 102, 241, 0.12)",
                        },
                      }}
                    >
                      <CardContent
                        sx={{
                          display: "flex",
                          flexDirection: { xs: "column", sm: "row" },
                          justifyContent: "center",
                          alignItems: "center",
                          gap: { xs: 2.5, sm: 4 },
                          p: { xs: 2.5, sm: 4 },
                        }}
                      >
                        <Box sx={{ flex: 1, maxWidth: "320px", width: "100%" }}>
                          <TeamCard pair={pair} index={index} />
                        </Box>

                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            px: 2,
                            py: { xs: 1, sm: 2 },
                            gap: 1,
                          }}
                        >
                          <Typography
                            variant="h4"
                            sx={{
                              fontWeight: 900,
                              background:
                                "linear-gradient(135deg, #f59e0b 0%, #f97316 100%)",
                              backgroundClip: "text",
                              WebkitBackgroundClip: "text",
                              WebkitTextFillColor: "transparent",
                              filter:
                                "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))",
                            }}
                          >
                            ⚔️
                          </Typography>
                        </Box>

                        {index + 1 < randomPairs.length && (
                          <Box
                            sx={{ flex: 1, maxWidth: "320px", width: "100%" }}
                          >
                            <TeamCard
                              pair={randomPairs[index + 1]}
                              index={index + 1}
                            />
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
