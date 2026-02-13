import { Box, Typography } from "@mui/material";

const Header = () => {
  return (
    <Box
      sx={{
        textAlign: "center",
        my: { xs: 3, sm: 4, md: 5 },
        pb: { xs: 2, sm: 3, md: 4 },
        borderBottom: "2px solid",
        borderColor: "primary.light",
      }}
    >
      <Typography
        variant="h1"
        sx={{
          background: "linear-gradient(135deg, #6366f1 0%, #10b981 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          mb: 2,
          fontWeight: 800,
          fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
        }}
      >
        🎯 Team Pair Generator
      </Typography>
      <Typography
        variant="body1"
        sx={{
          color: "text.secondary",
          fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" },
          maxWidth: "600px",
          mx: "auto",
          lineHeight: 1.6,
        }}
      >
        Randomly generate team pairs with players for efficient team building
      </Typography>
    </Box>
  );
};

export default Header;
