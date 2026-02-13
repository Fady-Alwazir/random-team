import {
  Modal,
  Button,
  Box,
  Typography,
  TextField,
  Alert,
  IconButton,
} from "@mui/material";
import { useContext, useState } from "react";
import { TeamsContext } from "../../../context/TeamsContext";
import CloseIcon from "@mui/icons-material/Close";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

const AddPlayerModal = ({ open, handleClose }) => {
  const { setPlayers } = useContext(TeamsContext);
  const [player, setPlayer] = useState("");
  const [error, setError] = useState(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "100%",
    maxWidth: 450,
    bgcolor: "background.paper",
    borderRadius: "1rem",
    boxShadow: 24,
    p: { xs: 3, sm: 4 },
    display: "flex",
    flexDirection: "column",
    gap: 2,
    maxHeight: "90vh",
    overflowY: "auto",
  };

  const handleInputChange = (e) => {
    if (e.target.value.includes(",")) {
      const players = e.target.value.split(",");
      setPlayer(players);
    } else {
      setPlayer(e.target.value);
    }
    setError(false);
  };

  const handleAddPlayer = () => {
    if (typeof player === "string" && player.trim() === "") {
      setError(true);
      return;
    }

    if (Array.isArray(player)) {
      player.forEach((player, index) => {
        if (player.trim()) {
          setPlayers((players) => [
            ...players,
            {
              name: player.trim(),
              id: new Date().getTime() + index,
            },
          ]);
        }
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
    <Modal 
      open={open} 
      onClose={handleClose}
      closeAfterTransition
    >
      <Box sx={style}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            Add New Player
          </Typography>
          <IconButton
            onClick={handleClose}
            size="small"
            sx={{
              color: "text.secondary",
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.05)",
              },
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        <Alert severity="info" sx={{ borderRadius: "0.5rem" }}>
          <Typography variant="body2">
            💡 <strong>Tip:</strong> Separate multiple players with a comma (e.g., "John, Sarah, Mike")
          </Typography>
        </Alert>

        <TextField
          fullWidth
          label="Player Name(s)"
          placeholder="e.g., John Doe or John, Sarah, Mike"
          variant="outlined"
          value={Array.isArray(player) ? player.join(", ") : player}
          onChange={(e) => handleInputChange(e)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleAddPlayer();
            }
          }}
          error={error}
          multiline
          minRows={2}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "0.5rem",
            },
          }}
        />

        {error && (
          <Alert severity="error" sx={{ borderRadius: "0.5rem" }}>
            <Typography variant="body2">
              Please enter a valid player name
            </Typography>
          </Alert>
        )}

        <Box
          sx={{
            display: "flex",
            gap: 1.5,
            justifyContent: "flex-end",
            mt: 2,
          }}
        >
          <Button
            variant="outlined"
            color="inherit"
            onClick={handleClose}
            sx={{ borderRadius: "0.5rem" }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            startIcon={<PersonAddIcon />}
            onClick={handleAddPlayer}
            sx={{
              borderRadius: "0.5rem",
            }}
          >
            Add Player
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddPlayerModal;
