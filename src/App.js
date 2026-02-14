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
                // Light Theme - Elegant & Premium
                primary: {
                  main: "#6366f1",
                  light: "#818cf8",
                  dark: "#4f46e5",
                },
                secondary: {
                  main: "#8b5cf6",
                  light: "#a78bfa",
                  dark: "#7c3aed",
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
                  default: "#fafafa",
                  paper: "rgba(255, 255, 255, 0.9)",
                },
                text: {
                  primary: "#1a1a2e",
                  secondary: "#64748b",
                },
              }
            : {
                // Dark Theme - NFT/Cyberpunk Inspired
                primary: {
                  main: "#8b5cf6",
                  light: "#a78bfa",
                  dark: "#7c3aed",
                },
                secondary: {
                  main: "#06b6d4",
                  light: "#22d3ee",
                  dark: "#0891b2",
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
                  default: "#0a0a0f",
                  paper: "rgba(17, 17, 27, 0.8)",
                },
                text: {
                  primary: "#f8fafc",
                  secondary: "#94a3b8",
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
              ? "linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 50%, #16213e 100%)"
              : "linear-gradient(135deg, #fafafa 0%, #f0f4ff 50%, #e8f0fe 100%)",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              mode === "dark"
                ? `radial-gradient(circle at 20% 50%, rgba(139, 92, 246, 0.15) 0%, transparent 50%),
                   radial-gradient(circle at 80% 80%, rgba(6, 182, 212, 0.15) 0%, transparent 50%),
                   radial-gradient(circle at 40% 20%, rgba(245, 158, 11, 0.1) 0%, transparent 50%)`
                : `radial-gradient(circle at 20% 50%, rgba(99, 102, 241, 0.08) 0%, transparent 50%),
                   radial-gradient(circle at 80% 80%, rgba(139, 92, 246, 0.08) 0%, transparent 50%)`,
            pointerEvents: "none",
            animation: "gradientShift 15s ease infinite",
          },
          "@keyframes gradientShift": {
            "0%, 100%": { opacity: 1 },
            "50%": { opacity: 0.8 },
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
                  ? "rgba(139, 92, 246, 0.2)"
                  : "rgba(99, 102, 241, 0.1)",
              backdropFilter: "blur(10px)",
              border: `1px solid ${mode === "dark" ? "rgba(139, 92, 246, 0.3)" : "rgba(99, 102, 241, 0.2)"}`,
              width: { xs: 48, sm: 56 },
              height: { xs: 48, sm: 56 },
              boxShadow:
                mode === "dark"
                  ? "0 8px 32px rgba(139, 92, 246, 0.3)"
                  : "0 4px 20px rgba(99, 102, 241, 0.2)",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              "&:hover": {
                background:
                  mode === "dark"
                    ? "rgba(139, 92, 246, 0.3)"
                    : "rgba(99, 102, 241, 0.15)",
                transform: "scale(1.05) rotate(180deg)",
                boxShadow:
                  mode === "dark"
                    ? "0 12px 48px rgba(139, 92, 246, 0.4)"
                    : "0 8px 32px rgba(99, 102, 241, 0.3)",
              },
            }}
          >
            {mode === "dark" ? (
              <Brightness7Icon
                sx={{ color: "#fbbf24", fontSize: { xs: 24, sm: 28 } }}
              />
            ) : (
              <Brightness4Icon
                sx={{ color: "#6366f1", fontSize: { xs: 24, sm: 28 } }}
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
