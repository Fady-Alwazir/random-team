import {
  Modal,
  Button,
  Box,
  Typography,
  IconButton,
  TextField,
  Rating,
  Alert,
  Stack,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import { useContext, useEffect, useState } from "react";
import { TeamsContext } from "../../../context/TeamsContext";

const AddTeamModal = ({ open, onClose, selectedTeamId }) => {
  const { teams, setTeams } = useContext(TeamsContext);
  const [team, setTeam] = useState({
    name: "",
    ranking: 0,
    image: "",
  });
  const [error, setError] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: { xs: "90vw", sm: "90%", md: "100%" },
    maxWidth: { xs: 300, sm: 500, md: 500 },
    bgcolor: "background.paper",
    borderRadius: "1rem",
    boxShadow: 24,
    p: { xs: 2.5, sm: 4 },
    display: "flex",
    flexDirection: "column",
    gap: 2,
    maxHeight: { xs: "90vh", sm: "90vh" },
    overflowY: "auto",
    "&::-webkit-scrollbar": {
      width: "0.5em",
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: "rgba(0, 0, 0, 0.05)",
      borderRadius: "1em",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(99, 102, 241, 0.3)",
      borderRadius: "1em",
      "&:hover": {
        backgroundColor: "rgba(99, 102, 241, 0.5)",
      },
    },
  };

  useEffect(() => {
    if (selectedTeamId) {
      const selectedTeam = teams.find((t) => t.id === selectedTeamId);
      if (selectedTeam) {
        setTeam(selectedTeam);
        setPreviewImage(selectedTeam.image);
      }
    } else {
      setTeam({ name: "", ranking: 0, image: "" });
      setPreviewImage("");
    }
  }, [teams, selectedTeamId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTeam({ ...team, [name]: value });
    if (name === "image") {
      setPreviewImage(value);
    }
  };

  const handleRatingChange = (e, newValue) => {
    setTeam({ ...team, ranking: newValue });
  };

  const onSubmit = () => {
    if (team.name.trim() === "") {
      setError(true);
      return;
    }

    if (selectedTeamId) {
      const updatedTeam = teams.map((t) =>
        t.id === selectedTeamId ? { ...t, ...team } : t
      );
      setTeams(updatedTeam);
    } else {
      setTeams([
        ...teams,
        {
          ...team,
          id: new Date().getTime(),
        },
      ]);
    }
    setError(false);
    onClose();
    setTeam({ name: "", ranking: 0, image: "" });
    setPreviewImage("");
  };

  return (
    <Modal open={open} onClose={onClose} closeAfterTransition>
      <Box sx={style}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            {selectedTeamId ? "✏️ Edit Team" : "➕ Add New Team"}
          </Typography>
          <IconButton
            onClick={onClose}
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

        <Stack spacing={2.5}>
          <TextField
            fullWidth
            label="Team Name"
            placeholder="e.g., Dragons, Tigers, Phoenix"
            variant="outlined"
            name="name"
            value={team.name}
            onChange={handleChange}
            error={error && team.name.trim() === ""}
            helperText={error && team.name.trim() === "" ? "Team name is required" : ""}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "0.5rem",
              },
            }}
          />

          <TextField
            fullWidth
            label="Team Image URL"
            placeholder="https://example.com/image.png"
            variant="outlined"
            name="image"
            value={team.image}
            onChange={handleChange}
            helperText="Paste the URL of your team's logo or image"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "0.5rem",
              },
            }}
          />

          {previewImage && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 1,
                p: 2,
                backgroundColor: "rgba(99, 102, 241, 0.05)",
                borderRadius: "0.75rem",
                border: "2px dashed rgba(99, 102, 241, 0.3)",
              }}
            >
              <Typography variant="caption" sx={{ color: "text.secondary" }}>
                Preview
              </Typography>
              <Box
                component="img"
                src={previewImage}
                onError={() => setPreviewImage("")}
                alt="Team preview"
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "3px solid white",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                }}
              />
            </Box>
          )}

          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
              Team Rating ⭐
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Rating
                name="ranking"
                value={team.ranking}
                onChange={(e, newValue) => handleRatingChange(e, newValue)}
                size="large"
              />
            </Box>
          </Box>

          {error && team.name.trim() === "" && (
            <Alert severity="error" sx={{ borderRadius: "0.5rem" }}>
              <Typography variant="body2">
                Please enter a valid team name
              </Typography>
            </Alert>
          )}
        </Stack>

        <Button
          fullWidth
          variant="contained"
          color="secondary"
          startIcon={<SaveIcon />}
          onClick={onSubmit}
          sx={{
            borderRadius: "0.5rem",
            py: 1.25,
            fontWeight: 600,
            mt: 2,
          }}
        >
          {selectedTeamId ? "Update Team" : "Add Team"}
        </Button>
      </Box>
    </Modal>
  );
};

export default AddTeamModal;
