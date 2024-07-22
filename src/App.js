import { Container } from "@mui/material";
import { Header, Players } from "./components";

function App() {
  return (
    <Container maxWidth="md">
      <Header />
      <Players />
    </Container>
  );
}

export default App;
