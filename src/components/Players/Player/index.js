import { Box } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
const Player = ({ name, id }) => {
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
        onClick={() => console.log("Delete player with id: ", id)}
      />
    </Box>
  );
};

export default Player;
