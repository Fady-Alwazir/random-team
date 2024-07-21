import { Box, Typography } from "@mui/material";

const Header = () => {
  return (
    <Box
      sx={{
        textAlign: "center",
        margin: "1rem 0",
      }}
    >
      <Typography variant="h5" gutterBottom>
        Random Pair Generator
      </Typography>
    </Box>
  );
};

export default Header;
