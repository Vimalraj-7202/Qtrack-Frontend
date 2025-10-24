import CommonTitle from "@/common/Title";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { getAllRequests } from "@/store/request/request.thunk";
import { useEffect, useState } from "react";
import {Box,Table,TableHead,TableRow,TableCell,TableBody,IconButton,TextField,Typography } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";

const MyRequest = () => {
  const navigate=useNavigate();
  const dispatch = useAppDispatch();
  const requests = useAppSelector((state) => state.request.data);
  const loading = useAppSelector((state) => state.request.loading);

  const [editable, setEditable] = useState(false);

  useEffect(() => {
    dispatch(getAllRequests() as any);
  }, [dispatch]);

const handleView = (id: string) => {
  navigate(`view/${id}`);
};


  if (loading) return <Typography>Loading...</Typography>;

  const headers = [
    "FYear",
    "Month",
    "Category",
    "QTCode",
    "Location",
    "State",
    "Amount",
    "Action",
  ];

  const headerKeyMap: Record<string, string> = {
    FYear: "Fyear",
    Month: "Month",
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
            mt:3
          }}
        >
          <Table sx={{ borderCollapse: "collapse", minWidth: "800px" }}>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#eaeff4" }}>
                {headers.map((header) => (
                  <TableCell
                    key={header}
                    sx={{
                      color: "black",
                      paddingY: 0.6,
                      paddingX: 0.8,
                      textAlign: "center",
                      minWidth: 50,
                      borderBottom: "2px solid #e0e0e0",
                      whiteSpace: "nowrap",
                      fontSize: 13,
                    }}
                  >
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {requests.map((req) => (
                <TableRow key={req._id} sx={{ "&:hover": { backgroundColor: "#f5f5f5" } }}>
                  {headers.map((header) => (
                    <TableCell
                      key={header}
                      sx={{
                        paddingY: 0.5,
                        paddingX: 0.8,
                        textAlign: "center",
                        minWidth: 50,
                        borderBottom: "1px solid #e0e0e0",
                        whiteSpace: "nowrap",
                        verticalAlign: "middle",
                        fontSize: 12,
                      }}
                    >
                      {header === "Action" ? (
                        <IconButton onClick={() => handleView(req._id)} size="small">
                          <VisibilityIcon sx={{ color: "#00b894", fontSize: 20 }} />
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
                              fontSize: 12,
                              padding: 0,
                              textAlign: "center",
                              color: "#7b838c",
                              "& .MuiInputBase-input": {
                                textAlign: "center",
                                color: "#7b838c",
                              },
                              "& .MuiInputBase-input.Mui-disabled": {
                                WebkitTextFillColor: "#7b838c",
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
