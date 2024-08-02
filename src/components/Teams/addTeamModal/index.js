import {
  Modal,
  Button,
  Box,
  Typography,
  IconButton,
  TextField,
  Rating,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useContext, useState } from "react";
import { TeamsContext } from "../../../context/TeamsContext";

const AddTeamModal = ({ open, onClose }) => {
  const { teams, setTeams } = useContext(TeamsContext);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    borderRadius: 4,
    boxShadow: 24,
    p: 4,
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    maxHeight: "80vh",
    overflowY: "auto",
    // Scrollbar
    "&::-webkit-scrollbar": {
      width: "0.4em",
    },
    "&::-webkit-scrollbar-track": {
      boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(0,0,0,.1)",
      outline: "1px solid grey",
    },
    "@media (max-width: 600px)": {
      width: 300,
    },
  };

  const [team, setTeam] = useState({
    name: "",
    ranking: 0,
    image: "",
  });
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    setTeam({ ...team, [e.target.name]: e.target.value });
    console.log(team);
  };
  const handleRatingChange = (e, newValue) => {
    setTeam({ ...team, ranking: newValue });
  };
  const onSubmit = () => {
    if (team.name.trim() === "") {
      setError(true);
      return;
    }
    setError(false);
    setTeams([
      ...teams,
      {
        ...team,
        id: new Date().getTime(),
      },
    ]);
    setTeam({ name: "", ranking: 0, image: "" });
    onClose();
    //alert from mui
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <IconButton
          sx={{
            position: "absolute",
            top: "0.5rem",
            right: "0.5rem",
          }}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
        <Typography sx={{ textAlign: "center" }} variant="h5" gutterBottom>
          add Team
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            width: "100%",
            maxWidth: "400px",
            margin: "0 auto",
            justifyContent: "center",
            alignItems: "center",
            paddingBottom: "1rem",
          }}
        >
          <TextField
            id="outlined-basic"
            label="Team Name"
            variant="outlined"
            name="name"
            value={team.name}
            onChange={handleChange}
          />
          <TextField
            id="outlined-basic"
            label="Team image URL"
            variant="outlined"
            name="image"
            value={team.image}
            onChange={handleChange}
          />
          <Rating
            name="ranking"
            value={team.ranking}
            onChange={(e, newValue) => handleRatingChange(e, newValue)}
          />
        </Box>

        <Button
          sx={{
            backgroundColor: "green",
            color: "white",
            maxWidth: "200px",
            "&:hover": {
              backgroundColor: "#4caf50",
            },
            position: "sticky",
            bottom: "1rem", // Adjust this value if necessary
            marginTop: "auto", // Ensures it stays at the bottom
            alignSelf: "center", // Center align the button
          }}
          onClick={onSubmit}
        >
          Add Team
        </Button>

        {error && (
          <Typography variant="p" color="red" gutterBottom>
            Please enter a valid team name and valid rating
          </Typography>
        )}
      </Box>
    </Modal>
  );
};

export default AddTeamModal;
