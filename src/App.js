import { Box, Container, ThemeProvider } from "@mui/material";
import { FormSubmit, Header, Players, Teams } from "./components";
import theme from "./theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: "100vh",
          backgroundColor: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
          background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            py: { xs: 2, sm: 3, md: 4 },
            px: { xs: 2, sm: 3, md: 4 },
          }}
        >
          <Header />
          <Players />
          <Teams />
          <FormSubmit />
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
