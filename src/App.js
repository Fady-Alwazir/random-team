import { Box, Container, ThemeProvider, IconButton, Fade } from "@mui/material";
import { FormSubmit, Header, Players, Teams } from "./components";
import { createTheme } from "@mui/material/styles";
import { useState, useMemo, useEffect } from "react";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

function App() {
  // Load saved mode preference from localStorage, default to "dark"
  const [mode, setMode] = useState(() => {
    const savedMode = localStorage.getItem("themeMode");
    return savedMode === "light" || savedMode === "dark" ? savedMode : "dark";
  });

  // Save mode preference to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("themeMode", mode);
  }, [mode]);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === "light"
            ? {
                // Light Theme - Clean & Joyful
                primary: {
                  main: "#7c3aed",
                  light: "#a78bfa",
                  dark: "#6d28d9",
                },
                secondary: {
                  main: "#7c3aed",
                  light: "#a78bfa",
                  dark: "#6d28d9",
                },
                success: {
                  main: "#10b981",
                  light: "#34d399",
                },
                warning: {
                  main: "#f59e0b",
                  light: "#fbbf24",
                },
                error: {
                  main: "#ef4444",
                  light: "#f87171",
                },
                background: {
                  default: "#ffffff",
                  paper: "rgba(255, 255, 255, 0.95)",
                },
                text: {
                  primary: "#1f2937",
                  secondary: "#6b7280",
                },
              }
            : {
                // Dark Theme - Simple NFT Vibe
                primary: {
                  main: "#a78bfa",
                  light: "#c4b5fd",
                  dark: "#8b5cf6",
                },
                secondary: {
                  main: "#a78bfa",
                  light: "#c4b5fd",
                  dark: "#8b5cf6",
                },
                success: {
                  main: "#10b981",
                  light: "#34d399",
                },
                warning: {
                  main: "#f59e0b",
                  light: "#fbbf24",
                },
                error: {
                  main: "#ef4444",
                  light: "#f87171",
                },
                background: {
                  default: "#0f0f1a",
                  paper: "rgba(24, 24, 37, 0.9)",
                },
                text: {
                  primary: "#f9fafb",
                  secondary: "#9ca3af",
                },
              }),
        },
        typography: {
          fontFamily: [
            "Inter",
            "-apple-system",
            "BlinkMacSystemFont",
            '"Segoe UI"',
            "Roboto",
            "sans-serif",
          ].join(","),
          h1: {
            fontWeight: 800,
            letterSpacing: "-0.02em",
          },
          h2: {
            fontWeight: 700,
            letterSpacing: "-0.01em",
          },
          button: {
            fontWeight: 600,
            textTransform: "none",
          },
        },
        shape: {
          borderRadius: 16,
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                borderRadius: "12px",
                padding: "10px 24px",
              },
            },
          },
        },
      }),
    [mode],
  );

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: "100vh",
          position: "relative",
          width: "100%",
          overflowX: "hidden",
          background:
            mode === "dark"
              ? "linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 100%)"
              : "linear-gradient(135deg, #ffffff 0%, #faf5ff 100%)",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              mode === "dark"
                ? `radial-gradient(circle at 30% 40%, rgba(167, 139, 250, 0.1) 0%, transparent 50%),
                   radial-gradient(circle at 70% 70%, rgba(167, 139, 250, 0.08) 0%, transparent 50%)`
                : `radial-gradient(circle at 30% 40%, rgba(124, 58, 237, 0.06) 0%, transparent 50%),
                   radial-gradient(circle at 70% 70%, rgba(124, 58, 237, 0.04) 0%, transparent 50%)`,
            pointerEvents: "none",
            animation: "gradientShift 20s ease infinite",
          },
          "@keyframes gradientShift": {
            "0%, 100%": { opacity: 1 },
            "50%": { opacity: 0.7 },
          },
        }}
      >
        {/* Floating Theme Toggle */}
        <Fade in={true} timeout={1000}>
          <IconButton
            onClick={toggleTheme}
            sx={{
              position: "fixed",
              top: { xs: 16, sm: 24 },
              right: { xs: 16, sm: 24 },
              zIndex: 1300,
              background:
                mode === "dark"
                  ? "rgba(167, 139, 250, 0.15)"
                  : "rgba(124, 58, 237, 0.08)",
              backdropFilter: "blur(10px)",
              border: `1px solid ${mode === "dark" ? "rgba(167, 139, 250, 0.25)" : "rgba(124, 58, 237, 0.15)"}`,
              width: { xs: 48, sm: 56 },
              height: { xs: 48, sm: 56 },
              boxShadow:
                mode === "dark"
                  ? "0 8px 32px rgba(167, 139, 250, 0.2)"
                  : "0 4px 20px rgba(124, 58, 237, 0.15)",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              "&:hover": {
                background:
                  mode === "dark"
                    ? "rgba(167, 139, 250, 0.25)"
                    : "rgba(124, 58, 237, 0.12)",
                transform: "scale(1.05) rotate(180deg)",
                boxShadow:
                  mode === "dark"
                    ? "0 12px 48px rgba(167, 139, 250, 0.3)"
                    : "0 8px 32px rgba(124, 58, 237, 0.2)",
              },
            }}
          >
            {mode === "dark" ? (
              <Brightness7Icon
                sx={{ color: "#fbbf24", fontSize: { xs: 24, sm: 28 } }}
              />
            ) : (
              <Brightness4Icon
                sx={{ color: "#7c3aed", fontSize: { xs: 24, sm: 28 } }}
              />
            )}
          </IconButton>
        </Fade>

        <Container
          maxWidth="lg"
          disableGutters
          sx={{
            position: "relative",
            zIndex: 1,
            py: { xs: 3, sm: 4, md: 6 },
            px: { xs: 2, sm: 3, md: 4 },
          }}
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
