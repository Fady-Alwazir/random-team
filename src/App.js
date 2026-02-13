import { Container, ThemeProvider } from "@mui/material";
import { FormSubmit, Header, Players, Teams } from "./components";
import theme from "./theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Container
        maxWidth="lg"
        sx={{
          py: { xs: 3, sm: 4, md: 6 },
          minHeight: "100vh",
          backgroundColor: "#f8fafc",
        }}
      >
        <Header />
        <Players />
        <Teams />
        <FormSubmit />
      </Container>
    </ThemeProvider>
  );
}

export default App;
