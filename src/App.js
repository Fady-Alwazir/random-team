import { Box, Container, ThemeProvider, IconButton, Tooltip } from "@mui/material";
import { FormSubmit, Header, Players, Teams } from "./components";
import { createTheme } from "@mui/material/styles";
import { useState, useMemo, useEffect } from "react";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

function App() {
  const [mode, setMode] = useState(() => {
    const saved = localStorage.getItem("themeMode");
    return saved === "light" || saved === "dark" ? saved : "dark";
  });

  useEffect(() => {
    localStorage.setItem("themeMode", mode);
  }, [mode]);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === "dark"
            ? {
                primary:    { main: "#22c55e", light: "#4ade80", dark: "#16a34a" },
                secondary:  { main: "#60a5fa", light: "#93c5fd", dark: "#3b82f6" },
                warning:    { main: "#fbbf24", light: "#fcd34d", dark: "#f59e0b" },
                error:      { main: "#f87171", light: "#fca5a5", dark: "#ef4444" },
                success:    { main: "#22c55e" },
                background: { default: "#05101c", paper: "#0d1a2b" },
                text:       { primary: "#f0f6ff", secondary: "#64748b" },
              }
            : {
                primary:    { main: "#16a34a", light: "#22c55e", dark: "#15803d" },
                secondary:  { main: "#3b82f6", light: "#60a5fa", dark: "#2563eb" },
                warning:    { main: "#d97706", light: "#fbbf24", dark: "#b45309" },
                error:      { main: "#dc2626", light: "#ef4444", dark: "#b91c1c" },
                success:    { main: "#16a34a" },
                background: { default: "#f0f7f1", paper: "#ffffff" },
                text:       { primary: "#0f172a", secondary: "#64748b" },
              }),
        },
        typography: {
          fontFamily: "'Barlow', sans-serif",
          h1: { fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800 },
          h2: { fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700 },
          h3: { fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700 },
          h4: { fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700 },
          h5: { fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600 },
          h6: { fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600 },
          button: {
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 700,
            fontSize: "1rem",
            letterSpacing: "0.04em",
          },
        },
        shape: { borderRadius: 12 },
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                borderRadius: "10px",
                textTransform: "none",
                padding: "12px 20px",
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 700,
                fontSize: "1rem",
                letterSpacing: "0.03em",
                boxShadow: "none",
                "&:hover": { boxShadow: "none" },
              },
              contained: {
                "&:hover": { transform: "translateY(-1px)" },
              },
            },
          },
          MuiCard: {
            styleOverrides: { root: { borderRadius: "14px", boxShadow: "none" } },
          },
          MuiChip: {
            styleOverrides: { root: { borderRadius: "6px" } },
          },
        },
      }),
    [mode],
  );

  const isDark = mode === "dark";

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: "100vh",
          width: "100%",
          overflowX: "hidden",
          background: isDark
            ? "linear-gradient(170deg, #05101c 0%, #071520 60%, #060e18 100%)"
            : "linear-gradient(170deg, #f0f7f1 0%, #e8f5e9 60%, #f0f7f1 100%)",
        }}
      >
        {/* Mode toggle */}
        <Tooltip title={isDark ? "Light mode" : "Dark mode"} placement="left">
          <IconButton
            onClick={() => setMode(isDark ? "light" : "dark")}
            sx={{
              position: "fixed",
              top: { xs: 12, sm: 20 },
              right: { xs: 12, sm: 20 },
              zIndex: 1300,
              width: 44,
              height: 44,
              borderRadius: "10px",
              bgcolor: isDark ? "rgba(34,197,94,0.12)" : "rgba(22,163,74,0.1)",
              border: `1.5px solid ${isDark ? "rgba(34,197,94,0.3)" : "rgba(22,163,74,0.25)"}`,
              color: isDark ? "#22c55e" : "#16a34a",
              transition: "all 0.2s ease",
              "&:hover": {
                bgcolor: isDark ? "rgba(34,197,94,0.2)" : "rgba(22,163,74,0.18)",
                transform: "scale(1.06)",
              },
            }}
          >
            {isDark ? <LightModeIcon fontSize="small" /> : <DarkModeIcon fontSize="small" />}
          </IconButton>
        </Tooltip>

        <Container
          maxWidth="md"
          disableGutters
          sx={{ px: { xs: 2, sm: 3 }, py: { xs: 3, sm: 5 } }}
        >
          <Header mode={mode} />
          <Players mode={mode} />
          <Teams mode={mode} />
          <FormSubmit mode={mode} />
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
