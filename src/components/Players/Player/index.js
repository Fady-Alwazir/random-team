import { Box } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { TeamsContext } from "../../../context/TeamsContext";
import { useContext } from "react";
const Player = ({ name, id }) => {
  const { setPlayers } = useContext(TeamsContext);
  const deletePlayer = (id) => {
    //set players and set locale storage
    setPlayers((players) => players.filter((player) => player.id !== id));
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0.5rem",
        borderBottom: "1px solid #ccc",
      }}
    >
      <span>{name}</span>
      <DeleteIcon
        sx={{
          cursor: "pointer",
          color: "red",
          "&:hover": {
            color: "darkred",
          },
        }}
        onClick={() => deletePlayer(id)}
      />
    </Box>
  );
};

export default Player;
