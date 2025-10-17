import { CircularProgress, Box } from "@mui/material";

export default function Spinner() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh"
      }}
    >
      <CircularProgress
        size={100}     
        thickness={1} 
        sx={{
          color: "#00b894",   
        }}
      />
    </Box>
  );
}
