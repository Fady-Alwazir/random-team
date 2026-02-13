import {
  Modal,
  Button,
  Box,
  Typography,
  TextField,
  Alert,
  IconButton,
  Backdrop,
} from "@mui/material";
import { useContext, useState } from "react";
import { TeamsContext } from "../../../context/TeamsContext";
import CloseIcon from "@mui/icons-material/Close";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

const AddPlayerModal = ({ open, handleClose, mode }) => {
  const { setPlayers } = useContext(TeamsContext);
  const [player, setPlayer] = useState("");
  const [error, setError] = useState(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: { xs: "90vw", sm: "90%", md: "100%" },
    maxWidth: { xs: 300, sm: 450, md: 450 },
    borderRadius: "1.5rem",
    boxShadow:
      mode === "dark"
        ? "0 20px 60px rgba(139, 92, 246, 0.3)"
        : "0 20px 60px rgba(99, 102, 241, 0.2)",
    p: { xs: 2.5, sm: 4 },
    display: "flex",
    flexDirection: "column",
    gap: 2.5,
    maxHeight: { xs: "90vh", sm: "90vh" },
    overflowY: "auto",
    background:
      mode === "dark" ? "rgba(17, 17, 27, 0.95)" : "rgba(255, 255, 255, 0.95)",
    backdropFilter: "blur(20px)",
    border: `2px solid ${
      mode === "dark" ? "rgba(139, 92, 246, 0.3)" : "rgba(99, 102, 241, 0.2)"
    }`,
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
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
        sx: { backdropFilter: "blur(4px)" },
      }}
    >
      <Box sx={style}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 800, mb: 0.5 }}>
              ➕ Add New Player
            </Typography>
            <Typography variant="caption" sx={{ color: "text.secondary" }}>
              Build your team roster
            </Typography>
          </Box>
          <IconButton
            onClick={handleClose}
            size="small"
            sx={{
              color: "text.secondary",
              backgroundColor: "rgba(99, 102, 241, 0.05)",
              "&:hover": {
                backgroundColor: "rgba(99, 102, 241, 0.1)",
                transform: "rotate(90deg)",
              },
              transition: "all 0.3s ease",
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        <Alert
          severity="info"
          sx={{
            borderRadius: "0.75rem",
            background:
              "linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(99, 102, 241, 0.1) 100%)",
            border: "1px solid rgba(99, 102, 241, 0.2)",
            color: "text.primary",
            "& .MuiAlert-icon": {
              color: "primary.main",
            },
          }}
        >
          <Typography variant="body2">
            <strong>💡 Tip:</strong> Add one player or multiple at once!
            Separate names with a comma
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
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleAddPlayer();
            }
          }}
          error={error}
          multiline
          minRows={2}
          maxRows={4}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "0.75rem",
              transition: "all 0.3s ease",
              backgroundColor:
                mode === "dark"
                  ? "rgba(139, 92, 246, 0.05)"
                  : "rgba(255, 255, 255, 0.8)",
              "& fieldset": {
                borderColor:
                  mode === "dark"
                    ? "rgba(139, 92, 246, 0.3)"
                    : "rgba(99, 102, 241, 0.2)",
              },
              "&:hover fieldset": {
                borderColor:
                  mode === "dark"
                    ? "rgba(139, 92, 246, 0.5)"
                    : "rgba(99, 102, 241, 0.4)",
              },
              "&.Mui-focused fieldset": {
                borderColor: mode === "dark" ? "#8b5cf6" : "#6366f1",
              },
            },
            "& .MuiOutlinedInput-input": {
              fontWeight: 500,
              color: "text.primary",
            },
            "& .MuiInputLabel-root": {
              color: "text.secondary",
            },
          }}
        />

        {error && (
          <Alert
            severity="error"
            sx={{
              borderRadius: "0.75rem",
              background: "rgba(239, 68, 68, 0.08)",
              border: "1px solid rgba(239, 68, 68, 0.2)",
            }}
          >
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
            mt: 1,
          }}
        >
          <Button
            variant="outlined"
            color="inherit"
            onClick={handleClose}
            sx={{
              borderRadius: "0.75rem",
              border: "1.5px solid rgba(99, 102, 241, 0.2)",
              fontWeight: 600,
              "&:hover": {
                border: "1.5px solid rgba(99, 102, 241, 0.4)",
                backgroundColor: "rgba(99, 102, 241, 0.05)",
              },
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            startIcon={<PersonAddIcon />}
            onClick={handleAddPlayer}
            sx={{
              borderRadius: "0.75rem",
              fontWeight: 700,
              boxShadow: "0 4px 15px rgba(99, 102, 241, 0.3)",
              "&:hover": {
                boxShadow: "0 6px 20px rgba(99, 102, 241, 0.4)",
                transform: "translateY(-2px)",
              },
              transition: "all 0.3s ease",
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
