import { Box, Container, ThemeProvider, Drawer, List, ListItemButton, ListItemIcon, ListItemText, useMediaQuery, useTheme as useMuiTheme, AppBar, Toolbar, IconButton } from "@mui/material";
import { FormSubmit, Header, Players, Teams } from "./components";
import theme from "./theme";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import PeopleIcon from "@mui/icons-material/People";
import ShuffleIcon from "@mui/icons-material/Shuffle";

function App() {
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("md"));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const menuItems = [
    { id: "home", label: "Home", icon: <SportsSoccerIcon /> },
    { id: "players", label: "Players", icon: <PeopleIcon /> },
    { id: "teams", label: "Teams", icon: <SportsSoccerIcon /> },
    { id: "generate", label: "Generate", icon: <ShuffleIcon /> },
  ];

  const handleMenuClick = (id) => {
    setActiveSection(id);
    setDrawerOpen(false);
  };

  const drawerContent = (
    <Box sx={{ p: 2 }}>
      <List>
        {menuItems.map((item) => (
          <ListItemButton
            key={item.id}
            onClick={() => handleMenuClick(item.id)}
            selected={activeSection === item.id}
            sx={{
              borderRadius: "0.75rem",
              mb: 1,
              transition: "all 0.3s",
              "&.Mui-selected": {
                backgroundColor: "primary.light",
                color: "white",
              },
            }}
          >
            <ListItemIcon sx={{ color: "inherit" }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex", minHeight: "100vh", backgroundColor: "#f8fafc" }}>
        {/* Desktop Sidebar */}
        {!isMobile && (
          <Drawer
            variant="permanent"
            sx={{
              width: 280,
              "& .MuiDrawer-paper": {
                width: 280,
                backgroundColor: "#ffffff",
                borderRight: "2px solid rgba(99, 102, 241, 0.1)",
              },
            }}
          >
            <Box sx={{ p: 3, textAlign: "center" }}>
              <Box sx={{ fontSize: "2.5rem", mb: 1 }}>🎯</Box>
              <Box sx={{ fontWeight: 700, color: "primary.main", fontSize: "1.1rem" }}>
                Team Generator
              </Box>
            </Box>
            {drawerContent}
          </Drawer>
        )}

        {/* Mobile AppBar */}
        {isMobile && (
          <AppBar position="sticky" sx={{ backgroundColor: "#ffffff", color: "primary.main" }}>
            <Toolbar>
              <Box sx={{ flex: 1, display: "flex", alignItems: "center", gap: 1 }}>
                <Box sx={{ fontSize: "1.8rem" }}>🎯</Box>
                <Box sx={{ fontWeight: 700 }}>Team Generator</Box>
              </Box>
              <IconButton onClick={() => setDrawerOpen(!drawerOpen)}>
                {drawerOpen ? <CloseIcon /> : <MenuIcon />}
              </IconButton>
            </Toolbar>
          </AppBar>
        )}

        {/* Mobile Drawer */}
        {isMobile && (
          <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
            {drawerContent}
          </Drawer>
        )}

        {/* Main Content */}
        <Box sx={{ flex: 1, overflowY: "auto" }}>
          <Container
            maxWidth="xl"
            sx={{
              py: { xs: 2, sm: 3, md: 4 },
              px: { xs: 2, sm: 3, md: 4 },
            }}
          >
            <Header />
            {(activeSection === "home" || !isMobile) && <Players />}
            {(activeSection === "teams" || !isMobile) && <Teams />}
            {(activeSection === "generate" || !isMobile) && <FormSubmit />}
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
