import { Container } from "@mui/material";
import { Header, Players, Teams } from "./components";

function App() {
  return (
    <Container maxWidth="md">
      <Header />
      <Players />
      <Teams />
    </Container>
  );
}

export default App;
