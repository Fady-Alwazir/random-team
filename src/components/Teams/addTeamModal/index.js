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
  Backdrop,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import { useContext, useEffect, useState } from "react";
import { TeamsContext } from "../../../context/TeamsContext";

const AddTeamModal = ({ open, onClose, selectedTeamId, mode }) => {
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
    maxWidth: { xs: "90vw", sm: 500, md: 500 },
    borderRadius: "1.5rem",
    boxShadow:
      mode === "dark"
        ? "0 20px 60px rgba(139, 92, 246, 0.3)"
        : "0 20px 60px rgba(99, 102, 241, 0.2)",
    p: { xs: 2.5, sm: 4 },
    display: "flex",
    flexDirection: "column",
    gap: 2,
    maxHeight: { xs: "90vh", sm: "90vh" },
    overflowY: "auto",
    background:
      mode === "dark" ? "rgba(17, 17, 27, 0.95)" : "rgba(255, 255, 255, 0.95)",
    backdropFilter: "blur(20px)",
    border: `2px solid ${
      mode === "dark" ? "rgba(139, 92, 246, 0.3)" : "rgba(99, 102, 241, 0.2)"
    }`,
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

    const imageSource = team.image ? "custom" : team.imageSource;

    if (selectedTeamId) {
      const updatedTeam = teams.map((t) =>
        t.id === selectedTeamId ? { ...t, ...team, imageSource } : t,
      );
      setTeams(updatedTeam);
    } else {
      setTeams([
        ...teams,
        {
          ...team,
          imageSource,
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
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
        sx: { backdropFilter: "blur(6px)" },
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
          <Typography
            variant="h5"
            sx={{ fontWeight: 700, color: "text.primary" }}
          >
            {selectedTeamId ? "✏️ Edit Team" : "➕ Add New Team"}
          </Typography>
          <IconButton
            onClick={onClose}
            size="small"
            sx={{
              color: "text.secondary",
              "&:hover": {
                backgroundColor:
                  mode === "dark"
                    ? "rgba(255, 255, 255, 0.08)"
                    : "rgba(0, 0, 0, 0.05)",
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
            helperText={
              error && team.name.trim() === "" ? "Team name is required" : ""
            }
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "0.75rem",
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
                color: "text.primary",
              },
              "& .MuiInputLabel-root": {
                color: "text.secondary",
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
                borderRadius: "0.75rem",
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
                color: "text.primary",
              },
              "& .MuiInputLabel-root": {
                color: "text.secondary",
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
                backgroundColor:
                  mode === "dark"
                    ? "rgba(139, 92, 246, 0.08)"
                    : "rgba(99, 102, 241, 0.05)",
                borderRadius: "0.75rem",
                border: `2px dashed ${
                  mode === "dark"
                    ? "rgba(139, 92, 246, 0.3)"
                    : "rgba(99, 102, 241, 0.3)"
                }`,
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
                  border: `3px solid ${
                    mode === "dark" ? "rgba(255, 255, 255, 0.8)" : "white"
                  }`,
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                }}
              />
            </Box>
          )}

          <Box>
            <Typography
              variant="subtitle2"
              sx={{ mb: 1.5, fontWeight: 600, color: "text.primary" }}
            >
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
            <Alert
              severity="error"
              sx={{
                borderRadius: "0.75rem",
                background:
                  mode === "dark"
                    ? "rgba(239, 68, 68, 0.15)"
                    : "rgba(239, 68, 68, 0.08)",
                border: `1px solid ${
                  mode === "dark"
                    ? "rgba(239, 68, 68, 0.4)"
                    : "rgba(239, 68, 68, 0.2)"
                }`,
              }}
            >
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
            borderRadius: "0.75rem",
            py: 1.25,
            fontWeight: 700,
            mt: 2,
            background:
              mode === "dark"
                ? "linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%)"
                : "linear-gradient(135deg, #6366f1 0%, #818cf8 100%)",
            boxShadow:
              mode === "dark"
                ? "0 8px 24px rgba(139, 92, 246, 0.4)"
                : "0 6px 20px rgba(99, 102, 241, 0.3)",
            "&:hover": {
              transform: "translateY(-2px)",
              boxShadow:
                mode === "dark"
                  ? "0 12px 32px rgba(139, 92, 246, 0.5)"
                  : "0 10px 28px rgba(99, 102, 241, 0.4)",
            },
          }}
        >
          {selectedTeamId ? "Update Team" : "Add Team"}
        </Button>
      </Box>
    </Modal>
  );
};

export default AddTeamModal;
