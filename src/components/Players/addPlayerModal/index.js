import { Modal, Button, Box, TextField, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { TeamsContext } from "../../../context/TeamsContext";

const AddPlayerModal = ({ open, handleClose }) => {
  const { setPlayers } = useContext(TeamsContext);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    borderRadius: 4,
    boxShadow: 24,
    p: 4,
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    "@media (max-width: 600px)": {
      width: 300,
    },
  };
  const [player, setPlayer] = useState("");
  const [error, setError] = useState(false);

  const handleInputChange = (e) => {
    //if there is a comma, add players to the list and make sure there in no empty string
    if (e.target.value.includes(",")) {
      const players = e.target.value.split(",");
      setPlayer(players);
    } else {
      setPlayer(e.target.value);
    }
  };
  const handleAddPlayer = () => {
    if (typeof player === "string" && player.trim() === "") {
      setError(true);
      return;
    }
    //if its an array, add all the players
    if (Array.isArray(player)) {
      player.forEach((player, index) => {
        setPlayers((players) => [
          ...players,
          {
            name: player,
            id: new Date().getTime() + index,
          },
        ]);
      });
    } else {
      setPlayers((players) => [
        ...players,
        {
          name: player,
          id: new Date().getTime(),
        },
      ]);
    }
    setError(false);
    setPlayer("");
    handleClose();
  };
  return (
    <Modal open={open} onClose={handleClose} maskClosable>
      <Box sx={style}>
        <Typography variant="p" gutterBottom>
          To add mulitple players, separate them with a comma (,)
        </Typography>
        <TextField
          id="outlined-basic"
          label="player"
          variant="outlined"
          onChange={(e) => handleInputChange(e)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleAddPlayer();
            }
          }}
        />
        <Button
          variant="primary"
          type="button"
          sx={{
            maxWidth: "200px",
            backgroundColor: "#3f51b5",
            color: "white",
            "&:hover": {
              backgroundColor: "#303f9f",
            },
          }}
          onClick={handleAddPlayer}
        >
          Add Player
        </Button>
        {error && (
          <Typography variant="p" color="red" gutterBottom>
            Please enter a valid player name or names
          </Typography>
        )}
      </Box>
    </Modal>
  );
};

export default AddPlayerModal;
