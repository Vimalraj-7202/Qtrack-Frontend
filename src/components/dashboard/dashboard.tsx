import { Box, Grid, Paper, Typography } from "@mui/material";
import {
  TextSnippetRounded as TextSnippetIcon,
  CheckCircleRounded as CheckCircleIcon,
  HistoryRounded as HistoryIcon,
  CancelRounded as CancelIcon,
} from "@mui/icons-material";
import CommonTitle from "@/common/Title";

const sampleData = [
  {
    id: 1,
    number: 6,
    text: "Total Requests",
    icon: <TextSnippetIcon sx={{ fontSize: 38, color: "#fff" }} />,
    bgShape: "linear-gradient(135deg, #da8b00, transparent)",
  },
  {
    id: 2,
    number: 12,
    text: "Completed Requests",
    icon: <CheckCircleIcon sx={{ fontSize: 38, color: "#fff" }} />,
    bgShape: "linear-gradient(135deg, #00b894, transparent)",
  },
  {
    id: 3,
    number: 3,
    text: "Pending Requests",
    icon: <HistoryIcon sx={{ fontSize: 38, color: "#fff" }} />,
    bgShape: "linear-gradient(135deg, #6b24d6, transparent)",
  },
  {
    id: 4,
    number: 8,
    text: "Rejected Requets",
    icon: <CancelIcon sx={{ fontSize: 38, color: "#fff" }} />,
    bgShape: "linear-gradient(135deg, #ea0e0eff, transparent)",
  },
];

const CardComponent = ({ number, text, icon, bgShape }: any) => {
  return (
    <>
      <Paper
        elevation={2}
        sx={{
          borderRadius: "16px",
          p: 2,
          position: "relative",
          overflow: "hidden",
          width: "100%",
          height: 120,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        {/* Background Shape */}
        <Box
          sx={{
            position: "absolute",
            top: -30,
            right: -100,
            width: 160,
            height: 170,
            background: bgShape,
            transform: "rotate(46deg)",
            borderRadius:8,
            zIndex: 0,
          }}
        />

        {/* Icon on right side */}
        <Box
          sx={{
            position: "absolute",
            right: 12,
            top: "50%",
            transform: "translateY(-50%)",
            width: 40,
            height: 40,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1
          }}
        >
          {icon}
        </Box>

        {/* Number (top-left) */}
        <Typography
          sx={{
            fontSize: 34,
            fontWeight:600,
            lineHeight: 1,
            zIndex: 1,
            color: "#000",
          }}
        >
          {number}
        </Typography>

        {/* Text (bottom-left) */}
        <Typography
          variant="body2"
          sx={{
            zIndex: 1,
            fontWeight:500,
            color: "gray",
            fontSize:17
          }}
        >
          {text}
        </Typography>
      </Paper>
    </>
  );
};

const DashboardCards = () => {
  return (
    <>
      <CommonTitle
        title="Dashboard"
        subTitle="Overview of all processes at a glance."
      />
      <Grid
        container
        spacing={1.3}
        sx={{ justifyContent: "center", alignItems: "center", mt: 1 }}
      >
        {sampleData.map((card) => (
          <Grid size={{ lg: 3, md: 3, sm: 6, xs: 12 }}>
            <CardComponent
              number={card.number}
              text={card.text}
              icon={card.icon}
              bgShape={card.bgShape}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default DashboardCards;
