import { Outlet } from "react-router-dom";
import Sidebar from "../components/Layout/Sidebar";
import { Box } from "@mui/material";

const Layout = () => {
  return (
 <Box sx={{ display: "flex", height: "100vh" }}>
  <Box
    sx={{
      flexShrink: 0,
      height: "100vh",
      overflowY: "auto",
      bgcolor: "#fff",
    }}
  >
    <Sidebar />
  </Box>

  <Box
    sx={{
      flexGrow: 1,
      flexShrink: 1,
      minWidth: 0,
      p:1,
      overflowY: "auto",
      bgcolor: "#fafafa",
    }}
  >
    <Outlet />
  </Box>
</Box>

  );
};

export default Layout;
