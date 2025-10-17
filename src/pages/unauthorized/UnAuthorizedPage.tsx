import { Button, Typography, Box, GlobalStyles } from "@mui/material";
import { useNavigate } from "react-router-dom";

const UnAuthorizedPage = () => {
  const navigate = useNavigate();

  const handleError = () => navigate("/");

  return (
    <>
      {/* Global scrollbar hide */}
      <GlobalStyles
        styles={{
          "::-webkit-scrollbar": { display: "none" },
          html: { scrollbarWidth: "none", msOverflowStyle: "none" },
          body: { overflow: "hidden" },
        }}
      />

      <Box
        sx={{
          height: "97vh",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          backgroundColor: "#f9f9f9", 
          overflow: "hidden",
          mr:200
        }}
      >
        <Typography sx={{ fontWeight: "bold", fontSize: 90, color: "#00b894",mt:5 }}>
          404
        </Typography>

        <Typography sx={{ fontWeight: "bold", fontSize: 30, color: "#00b894"}}>
          Page Not Found
        </Typography>

        <Typography sx={{ color: "gray", fontSize: 16, mt: 1 }}>
          You are not authorized to view this page
        </Typography>

        <Button
          onClick={handleError}
          sx={{
            mt: 3,
            color: "white",
            backgroundColor: "#00b894",
            height: "42px",
            width: "120px",
            borderRadius: "8px",
            fontWeight: "bold",
            textTransform: "none",
            "&:hover": { backgroundColor: "#019870" },
          }}
        >
          Home
        </Button>
      </Box>
    </>
  );
};

export default UnAuthorizedPage;
