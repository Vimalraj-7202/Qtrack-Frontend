import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Toolbar,
  Typography,
  Box,
} from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import Logo from "@/assets/track3.svg";
import DashboardIcon from "@mui/icons-material/SpaceDashboardRounded";
import AddIcon from "@mui/icons-material/AddRounded";
import DescriptionIcon from "@mui/icons-material/DescriptionRounded";
import PivotTableChartIcon from "@mui/icons-material/PivotTableChartRounded";
import StackedBarChartIcon from "@mui/icons-material/StackedBarChartRounded";
import LinearScaleIcon from "@mui/icons-material/LinearScaleRounded";
import NotificationsIcon from "@mui/icons-material/NotificationsRounded";
import SettingsIcon from "@mui/icons-material/SettingsSuggestRounded";
import LogoutIcon from "@mui/icons-material/LogoutRounded";

const drawerWidth = 230;
const size = 28;

const Sidebar = () => {
  const navigate = useNavigate();

  const links = [
    {
      path: "/dashboard",
      label: "Dashboard",
      icon: <DashboardIcon sx={{ fontSize: size }} />,
    },
    {
      path: "/request",
      label: "New Request",
      icon: <AddIcon sx={{ fontSize: size }} />,
    },
    {
      path: "/myrequests",
      label: "My Requests",
      icon: <DescriptionIcon sx={{ fontSize: size }} />,
    },
    {
      path: "/escalation",
      label: "Escalated Request",
      icon: <PivotTableChartIcon sx={{ fontSize: size }} />,
    },
    {
      path: "/requeststatus",
      label: "Request Status",
      icon: <LinearScaleIcon sx={{ fontSize: size }} />,
    },
    {
      path: "/reports",
      label: "Reports",
      icon: <StackedBarChartIcon sx={{ fontSize: size }} />,
    },
    {
      path: "/notifications",
      label: "Notifications",
      icon: <NotificationsIcon sx={{ fontSize: size }} />,
    },
    {
      path: "/settings",
      label: "Settings",
      icon: <SettingsIcon sx={{ fontSize: size }} />,
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/auth/login", { replace: true });
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          color: "black",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        },
      }}
    >
      {/* Logo Section */}
      <Box>
        <Toolbar>
          <Typography
            sx={{ fontSize: 21, display: "flex", alignItems: "center" }}
          >
            <Box
              component="img"
              src={Logo}
              alt="App Logo"
              sx={{
                width: 40,
                height: 35,
                objectFit: "contain",
                cursor: "pointer",
              }}
            />
            <Typography sx={{ fontWeight: 600, fontSize: 22, ml: 1 }}>
              QTrack
            </Typography>
          </Typography>
        </Toolbar>

        {/* Navigation Links */}

        <List>
          {links.map((link) => (
            <ListItemButton
              key={link.path}
              component={NavLink}
              to={link.path}
              sx={{
                borderRadius: 2,
                color: "black",
                display: "flex",
                alignItems: "center",
                gap: 1,
                mb: 0.5,
                position: "relative",
                textDecoration: "none",
                mx:0.6,

                "&.active": {
                  backgroundColor: "rgba(0, 200, 83, 0.15)",
                  color: "#087f6e",
                  fontWeight: 600,
                  "& .MuiListItemIcon-root": {
                    color: "#087f6e",
                    borderRadius: "0 6px 6px 0",
                  },
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    left: 1,
                    top: 6,
                    bottom: 6,
                    width: "4px",
                    borderRadius: "0 6px 6px 0",
                    backgroundColor: "#00b894",
                  },
                },

                "&:hover": {
                  backgroundColor: "rgba(0,200,83,0.1)",
                },
              }}
              className={({ isActive }: { isActive: boolean }) =>
                isActive ? "active" : ""
              }
              {...({} as any)}
            >
              <ListItemIcon sx={{ minWidth:36 }}>{link.icon}</ListItemIcon>
              <ListItemText
                primary={link.label}
                primaryTypographyProps={{ fontSize: 14.3, fontWeight: 500 }}
              />
            </ListItemButton>
          ))}
        </List>
      </Box>

      <Box p={1}>
        <ListItemButton
          onClick={handleLogout}
          sx={{
            borderRadius: 2,
            color: "#2a3547",
            display: "flex",
            alignItems: "center",
            gap: 1,
            "&:hover": {
              backgroundColor: "rgba(0,128,128,0.08)",
            },
          }}
        >
          <ListItemIcon sx={{ minWidth: 36 }}>
            <LogoutIcon sx={{ fontSize: size, color: "#707070" }} />
          </ListItemIcon>
          <ListItemText
            primary="Logout"
            primaryTypographyProps={{ fontSize: 15, fontWeight: 500 }}
          />
        </ListItemButton>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
