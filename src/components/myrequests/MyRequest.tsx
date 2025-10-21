import CommonTitle from "@/common/Title";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { getAllRequests } from "@/store/request/request.thunk";
import { useEffect, useState } from "react";
import {
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";

const MyRequest = () => {
  const dispatch = useAppDispatch();
  const requests = useAppSelector((state) => state.request.data);
  const loading = useAppSelector((state) => state.request.loading);

  const [editable, setEditable] = useState(false);

  useEffect(() => {
    dispatch(getAllRequests() as any);
  }, [dispatch]);

  const handleInputChange = (key: string, value: any) => {};

  const handleView = (id: string) => {
    console.log("View request by ID:", id);
  };

  if (loading) return <Typography>Loading...</Typography>;

  const headers = [
    "FYear",
    "Period",
    "QC",
    "Plant",
    "Division",
    "Category",
    "QTCode",
    "Location",
    "State",
    "Amount",
    "Action",
  ];

  const headerKeyMap: Record<string, string> = {
    FYear: "Fyear",
    Period: "Month",
    QC: "QC",
    Plant: "Plant",
    Division: "Division",
    Category: "Category",
    QTCode: "QTCode",
    Location: "Location",
    State: "State",
    Amount: "Amount",
    Action: "Action",
  };

  return (
    <>
      <CommonTitle
        title="My Requests"
        subTitle="View and track all your submitted requests."
      />

      {requests.length === 0 ? (
        <Typography>No requests found</Typography>
      ) : (
        <Box
          sx={{
            width: "100%",
            border: "1px solid #e0e0e0",
            borderRadius: 2,
            overflowX: "auto",
            overflowY: "auto",
            height: "400px",
            mt: 2,
            "&::-webkit-scrollbar": {
              width: "6px",
              height: "6px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#c1c1c1",
              borderRadius: 3,
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: "#f0f0f0",
            },
          }}
        >
          <Table sx={{ borderCollapse: "collapse", minWidth: "1400px" }}>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f9f9f9" }}>
                {headers.map((header, idx) => (
                  <TableCell
                    key={header}
                    sx={{
                      fontWeight: 600,
                      color: "gray",
                      paddingY: 1,
                      paddingX: 2,
                      textAlign: "center",
                      minWidth: 120,
                      borderBottom: "2px solid #e0e0e0",
                      borderRight:
                        idx !== headers.length - 1
                          ? "1px solid #e0e0e0"
                          : "none",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {requests.map((req) => (
                <TableRow
                  key={req._id}
                  sx={{
                    "&:hover": {
                      backgroundColor: "#f5f5f5",
                    },
                  }}
                >
                  {headers.map((header, idx) => (
                    <TableCell
                      key={header}
                      sx={{
                        paddingY: 0.8,
                        paddingX: 1.5,
                        textAlign: "center",
                        minWidth: 100,
                        borderBottom: "1px solid #e0e0e0",
                        borderRight:
                          idx !== headers.length - 1
                            ? "1px solid #e0e0e0"
                            : "none",
                        whiteSpace: "nowrap",
                        verticalAlign: "middle",
                      }}
                    >
                      {header === "Action" ? (
                        <IconButton onClick={() => handleView(req._id)}>
                          <VisibilityIcon sx={{ color: "#00b894" }} />
                        </IconButton>
                      ) : (
                        <TextField
                          value={(req as any)[headerKeyMap[header]] || ""}
                          variant="standard"
                          size="small"
                          disabled={!editable}
                          fullWidth
                          InputProps={{
                            disableUnderline: true,
                            sx: {
                              fontSize: 14,
                              padding: 0,
                              textAlign: "center",
                              color: "black",
                              "& .MuiInputBase-input": {
                                textAlign: "center",
                                color: "black",
                              },
                              "& .MuiInputBase-input.Mui-disabled": {
                                WebkitTextFillColor: "black",
                                opacity: 1,
                              },
                            },
                          }}
                        />
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      )}
    </>
  );
};

export default MyRequest;
