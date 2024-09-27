import { Container } from "@mui/material";
import { FormSubmit, Header, Players, Teams } from "./components";

function App() {
  return (
    <Container maxWidth="md">
      <Header />
      <Players />
      <Teams />
      <FormSubmit />
    </Container>
  );
}

export default App;
