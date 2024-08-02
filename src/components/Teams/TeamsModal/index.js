import { Modal, Button, Box, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useContext } from "react";
import { TeamsContext } from "../../../context/TeamsContext";
import TeamCard from "./teamCard";

const TeamsModal = ({ open, onClose, showAddTeam }) => {
  const { teams } = useContext(TeamsContext);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 900,
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
          Teams
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: "1rem",
            pb: "4rem", // Ensure there's enough padding at the bottom
          }}
        >
          {teams?.map((team) => (
            <TeamCard key={team.id} team={team} />
          ))}
        </Box>

        <Button
          sx={{
            // greenish button most likely to yellow
            background: "greenyellow",
            color: "white",
            maxWidth: "100px",
            "&:hover": {
              background: "#b9e6b2",
            },
            position: "sticky",
            bottom: "1rem", // Adjust this value if necessary
            marginTop: "auto", // Ensures it stays at the bottom
            alignSelf: "center", // Center align the button
          }}
          onClick={showAddTeam}
        >
          Add Team
        </Button>
      </Box>
    </Modal>
  );
};

export default TeamsModal;
