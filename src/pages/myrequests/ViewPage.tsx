import { Box, Button, Typography, Paper, Divider } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { getRequestById } from "@/store/request/request.thunk";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector, type RootState } from "@/store/store";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const ViewPage = () => {
  const response = useAppSelector((state: RootState) => state.request.request);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const handleBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    if (id) {
      dispatch(getRequestById(id) as any);
    }
  }, [dispatch, id]);

  const InfoRow = ({ label, value }: { label: string; value: any }) => (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        py: 2,
      }}
    >
      <Typography
        variant="body1"
        sx={{
          color: "#86868b",
          fontSize: "15px",
          fontWeight: 400,
          letterSpacing: "0.2px",
        }}
      >
        {label}
      </Typography>
      <Typography
        variant="body1"
        sx={{
          color: "#1d1d1f",
          fontSize: "15px",
          fontWeight: 500,
          textAlign: "right",
        }}
      >
        {value || "—"}
      </Typography>
    </Box>
  );

  return (
    <Box>
      <Box sx={{ width: "100%" }}>
        {/* Header with Back Button */}
        <Box sx={{ mb: 3 }}>
          <Button
            onClick={handleBack}
            startIcon={<ArrowBackIcon />}
            sx={{
              textTransform: "none",
              color: "#0071e3",
              fontSize: "17px",
              fontWeight: 400,
              padding: "8px 0",
              "&:hover": {
                backgroundColor: "transparent",
                color: "#0077ed",
              },
            }}
          >
            Back
          </Button>
        </Box>

        {/* Main Content Card */}
        <Paper
          elevation={0}
          sx={{
            borderRadius: "18px",
            overflow: "hidden",
            width: "100%",
            backgroundColor: "#ffffff",
            border: "1px solid #d2d2d7",
          }}
        >
          {/* Header */}
          <Box
            sx={{
              px: 2,
              pt: 1,
              pb: 1,
            }}
          >
            <Typography
              variant="h5"
              sx={{
                color: "#1d1d1f",
                fontSize: "28px",
                fontWeight: 600,
                letterSpacing: "-0.5px",
                mb: 1,
              }}
            >
              Request Details
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "#86868b",
                fontSize: "14px",
              }}
            >
              ID: {id}
            </Typography>
          </Box>

          <Divider sx={{ borderColor: "#d2d2d7" }} />

          {/* Details Section */}
          <Box sx={{ px: 3, pb: 1 }}>
            <InfoRow label="Financial Year" value={response?.data?.Fyear} />
            <Divider sx={{ borderColor: "#f5f5f7" }} />

            <InfoRow label="Month" value={response?.data?.Month} />
            <Divider sx={{ borderColor: "#f5f5f7" }} />

            <InfoRow label="QC" value={response?.data?.QC} />
            <Divider sx={{ borderColor: "#f5f5f7" }} />

            <InfoRow label="Plant" value={response?.data?.Plant} />
            <Divider sx={{ borderColor: "#f5f5f7" }} />

            <InfoRow label="Division" value={response?.data?.Division} />
            <Divider sx={{ borderColor: "#f5f5f7" }} />

            <InfoRow label="Category" value={response?.data?.Category} />
            <Divider sx={{ borderColor: "#f5f5f7" }} />

            <InfoRow label="QT Code" value={response?.data?.QTCode} />
            <Divider sx={{ borderColor: "#f5f5f7" }} />

            <InfoRow label="Location" value={response?.data?.Location} />
            <Divider sx={{ borderColor: "#f5f5f7" }} />

            <InfoRow label="State" value={response?.data?.State} />
            <Divider sx={{ borderColor: "#f5f5f7" }} />

            <InfoRow
              label="Amount"
              value={
                response?.data?.Amount
                  ? `$${response.data.Amount.toLocaleString()}`
                  : "—"
              }
            />
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default ViewPage;
