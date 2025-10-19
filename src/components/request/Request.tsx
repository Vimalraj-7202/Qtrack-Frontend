import CommonTitle from "@/common/Title";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector, type RootState } from "@/store/store";
import { newRequest, getAllRequests } from "@/store/request/request.thunk";
import {
  Box,
  Button,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TextField,
  Paper,
  Typography,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

// Type for a single row
type RequestRow = {
  FYEAR: string;
  Month: string;
  QC: string;
  Plant: string;
  Division: string;
  Category: string;
  QTCode: string;
  Location: string;
  State: string;
  Amount: number | "";
};

// Headers for table
const headers: (keyof RequestRow)[] = [
  "FYEAR",
  "Month",
  "QC",
  "Plant",
  "Division",
  "Category",
  "QTCode",
  "Location",
  "State",
  "Amount",
];

// Initial row state
const initialRowState: RequestRow = {
  FYEAR: "",
  Month: "",
  QC: "",
  Plant: "",
  Division: "",
  Category: "",
  QTCode: "",
  Location: "",
  State: "",
  Amount: "",
};

const Request = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state: RootState) => state.request);
  console.log(data, "dataaaaaaa");
  const [newRow, setNewRow] = useState<RequestRow>({ ...initialRowState });
  const [editable, setEditable] = useState(false);
  const [isContinueEnabled, setIsContinueEnabled] = useState(false);
  const [showUploadSection, setShowUploadSection] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  useEffect(() => {
    dispatch(getAllRequests() as any);
  }, [dispatch]);


  // Enable editing
  const handleNewRequest = () => setEditable(true);

  // Update input fields
  const handleInputChange = (
    field: keyof RequestRow,
    value: string | number
  ) => {
    setNewRow((prev) => {
      const updated = { ...prev, [field]: value };
      const allFilled = Object.values(updated).every(
        (val) => val !== "" && val !== null && val !== undefined
      );
      setIsContinueEnabled(allFilled);
      return updated;
    });
  };

  // Reset form
  const handleCancel = () => {
    setNewRow({ ...initialRowState });
    setEditable(false);
    setIsContinueEnabled(false);
    setShowUploadSection(false);
  };

  const handleContinueClick = () => setShowUploadSection(true);
  const handleSave = async () => {
    // Map frontend state to backend schema
    const payload = {
      Fyear: newRow.FYEAR,
      month: newRow.Month,
      QC: newRow.QC,
      Plant: newRow.Plant,
      Division: newRow.Division,
      Category: newRow.Category,
      QTCode: newRow.QTCode,
      Location: newRow.Location,
      State: newRow.State,
      Amount: Number(newRow.Amount),
    };

    // Optional: check all fields filled
    const allFilled = Object.values(payload).every(
      (val) => val !== "" && val !== null && val !== undefined
    );
    if (!allFilled) {
      alert("Please fill all fields before submitting");
      return;
    }

    await dispatch(newRequest(payload as any));
    handleCancel(); // reset form after submission
  };

  // Drag & Drop handlers
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(true);
  };
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
  };
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
    const files = Array.from(e.dataTransfer.files);
    console.log("Dropped files:", files);
  };
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      console.log("Selected files:", files);
    }
  };

  return (
    <>
      <CommonTitle title="New Request" subTitle="Create and Update Requests." />

      <Box>
        {/* New Request Button */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 1 }}>
          <Button
            sx={{
              height: "35px",
              width: "130px",
              backgroundColor: "#00b894",
              color: "white",
              textTransform: "none",
              borderRadius: 2,
            }}
            onClick={handleNewRequest}
          >
            New Request
          </Button>
        </Box>

        {/* Request Table */}
        <Box
          sx={{
            width: "100%",
            border: "2px solid #eaeff4",
            borderRadius: 2,
            overflowX: "auto",
            overflowY: "auto",
            height: "300px",
            mt: 2,
          }}
        >
          <Table sx={{ borderCollapse: "collapse", minWidth: "1200px" }}>
            <TableHead>
              <TableRow>
                {headers.map((header, idx) => (
                  <TableCell
                    key={header}
                    sx={{
                      fontWeight: 500,
                      color: "gray",
                      paddingY: 0.5,
                      paddingX: 1,
                      textAlign: "center",
                      borderRight:
                        idx !== headers.length - 1
                          ? "1px solid #e0e0e0"
                          : "none",
                      borderBottom: "2px solid #e0e0e0",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              <TableRow>
                {headers.map((header) => (
                  <TableCell
                    key={header}
                    sx={{
                      paddingY: 0.5,
                      paddingX: 1,
                      textAlign: header === "Amount" ? "right" : "left",
                      borderRight: "1px solid #e0e0e0",
                      borderBottom: "1px solid #e0e0e0",
                      whiteSpace: "nowrap",
                      backgroundColor: editable ? "transparent" : "#f0f0f0",
                    }}
                  >
                    <TextField
                      value={newRow[header]}
                      onChange={(e) =>
                        handleInputChange(
                          header,
                          header === "Amount"
                            ? Number(e.target.value)
                            : e.target.value
                        )
                      }
                      variant="standard"
                      size="small"
                      disabled={!editable}
                      fullWidth
                      InputProps={{
                        disableUnderline: true,
                        sx: {
                          fontSize: 14,
                          padding: 0,
                          height: "100%",
                          color: editable ? "black" : "gray",
                          backgroundColor: "transparent",
                        },
                      }}
                    />
                  </TableCell>
                ))}
              </TableRow>
            </TableBody>
          </Table>
        </Box>

        {/* Upload Section */}
        {showUploadSection && (
          <Box
            sx={{
              mt: 2,
              height: "200px",
              width: "100%",
              borderRadius: 2,
              border: dragActive ? "2px dashed #00b894" : "2px dashed #eaeff4",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              gap: 1,
            }}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <CloudUploadIcon sx={{ color: "#00b894", fontSize: 40 }} />
            <Typography sx={{ fontSize: "14px" }}>
              Drag & drop one or more files, or click to browse
            </Typography>
            <span style={{ color: "gray", fontSize: "12px" }}>
              Supported file types: .xlsx, .jpg, .pdf | Max size: 10MB
            </span>

            <Button
              component="label"
              sx={{
                height: "38px",
                backgroundColor: "#00b894",
                color: "white",
                textTransform: "none",
                borderRadius: 2,
                width: "110px",
                mt: 1,
              }}
            >
              Browse Files
              <input
                type="file"
                hidden
                multiple
                onChange={handleFileSelect}
                accept=".xlsx,.jpg,.pdf"
              />
            </Button>
          </Box>
        )}

        {/* Bottom Paper */}
        <Paper
          sx={{
            mt: 2,
            borderRadius: 2,
            width: "100%",
            p: 1.5,
            boxShadow: 3,
            display: "flex",
            justifyContent: "flex-end",
            gap: 1,
          }}
        >
          {!showUploadSection ? (
            <>
              <Button
                sx={{
                  height: "38px",
                  minWidth: "100px",
                  backgroundColor: "transparent",
                  color: "#00b894",
                  border: "1.5px solid #00b894",
                  borderRadius: 2,
                  textTransform: "none",
                  fontWeight: 500,
                }}
                onClick={handleCancel}
              >
                Cancel
              </Button>
              <Button
                sx={{
                  height: "38px",
                  minWidth: "100px",
                  backgroundColor: isContinueEnabled ? "#00b894" : "#e9eaeb",
                  color: isContinueEnabled ? "white" : "gray",
                  borderRadius: 2,
                  textTransform: "none",
                  fontWeight: 500,
                  "&:hover": {
                    backgroundColor: isContinueEnabled ? "#00a07a" : "#d6d7d8",
                  },
                }}
                disabled={!isContinueEnabled}
                onClick={handleContinueClick}
              >
                Continue
              </Button>
            </>
          ) : (
            <>
              <Button
                onClick={handleSave}
                sx={{
                  height: "38px",
                  minWidth: "100px",
                  backgroundColor: "#00b894",
                  color: "white",
                  textTransform: "none",
                  borderRadius: 2,
                  fontWeight: 500,
                  "&:hover": { backgroundColor: "#00a07a" },
                }}
              >
                Submit Ticket
              </Button>
              <Button
                sx={{
                  height: "38px",
                  minWidth: "100px",
                  backgroundColor: "#e9eaeb",
                  color: "gray",
                  textTransform: "none",
                  borderRadius: 2,
                  fontWeight: 500,
                  "&:hover": { backgroundColor: "#d6d7d8" },
                }}
              >
                Draft Ticket
              </Button>
              <Button
                sx={{
                  height: "38px",
                  minWidth: "100px",
                  backgroundColor: "transparent",
                  color: "#00b894",
                  border: "1.5px solid #00b894",
                  textTransform: "none",
                  borderRadius: 2,
                  fontWeight: 500,
                }}
                onClick={handleCancel}
              >
                Cancel
              </Button>
            </>
          )}
        </Paper>
      </Box>
    </>
  );
};

export default Request;
