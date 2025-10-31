import { useEffect, useState, useRef, useCallback } from "react";
import CommonTitle from "@/common/Title";
import { useAppDispatch, useAppSelector, type RootState } from "@/store/store";
import { getOverallReports } from "@/store/report/report.thunk";
import {
  Box,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";
import Nodata from "@/assets/nodata.jpg";

const Escalation = () => {
  const dispatch = useAppDispatch();
  const { reportloading, data, hasNext, totalRecordCount } = useAppSelector(
    (state: RootState) => state.report
  );

  const headers = ["S.No", "Report Name", "Description"];
  const [pageNo, setPageNo] = useState(1);
  const [rows, setRows] = useState<any[]>([]);
  const [delayedLoading, setDelayedLoading] = useState(false);
  const tableContainerRef = useRef<HTMLDivElement>(null);

  //Load first 10 on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(getOverallReports({ userId: "", pageNo: 1, pageSize: 10 }));
    }, 3000);

    return () => clearTimeout(timer);
  }, [dispatch]);

  // Append data when received
  useEffect(() => {
    if (data && Array.isArray(data)) {
      setRows((prev) => {
        if (pageNo === 1) return data;
        const merged = [...prev, ...data];
        // Remove duplicates by ID
        return merged.filter(
          (item, index, self) =>
            index === self.findIndex((r) => r.id === item.id)
        );
      });
    }
  }, [data, pageNo]);

  //Fetch next page with 3s delay
  const loadMoreData = useCallback(async () => {
    if (reportloading || delayedLoading || !hasNext) return;
    setDelayedLoading(true);
    await new Promise((res) => setTimeout(res, 3000)); // wait 3 sec

    const nextPage = pageNo + 1;
    setPageNo(nextPage);
    dispatch(getOverallReports({ userId: "", pageNo: nextPage, pageSize: 10 }));
    setDelayedLoading(false);
  }, [dispatch, hasNext, pageNo, reportloading, delayedLoading]);

  //Infinite scroll listener
  const handleScroll = useCallback(() => {
    const container = tableContainerRef.current;
    if (!container || reportloading || delayedLoading || !hasNext) return;

    const { scrollTop, scrollHeight, clientHeight } = container;
    if (scrollHeight - scrollTop - clientHeight < 80) {
      loadMoreData();
    }
  }, [loadMoreData, reportloading, delayedLoading, hasNext]);

  useEffect(() => {
    const container = tableContainerRef.current;
    if (!container) return;
    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <>
      <CommonTitle
        title="Escalated Requests"
        subTitle="High-priority requests needing action."
      />

      <Box mt={2}>
        <Typography variant="subtitle2" mb={1}>
          Total Records: {totalRecordCount}
        </Typography>
        <TableContainer
          component={Paper}
          ref={tableContainerRef}
          sx={{
            maxHeight: 580,
            overflow: "auto",
            border: "1px solid #e2e8f0",
            borderRadius: 2,
          }}
        >
          <Table stickyHeader sx={{ tableLayout: "fixed", width: "100%" }}>
            <TableHead>
              <TableRow>
                {headers.map((header, i) => (
                  <TableCell
                    key={i}
                    sx={{
                      fontWeight: 600,
                      textTransform: "capitalize",
                      backgroundColor: "#eaeff4",
                      textAlign: "center",
                      width:
                        i === 0
                          ? "20%" 
                          : i === 1
                          ? "40%" 
                          : "40%"
                    }}
                  >
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {rows.length > 0 ? (
                rows.map((row, index) => (
                  <TableRow key={row.id}>
                    <TableCell align="center">{index + 1}</TableCell>
                    <TableCell align="center">{row.reportName}</TableCell>
                    <TableCell align="center">{row.description}</TableCell>
                  </TableRow>
                ))
              ) : !reportloading ? (
                <TableRow>
                  <TableCell colSpan={3} align="center" sx={{ py: 4 }}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <img
                        src={Nodata}
                        alt="No data"
                        style={{
                          height: "250px",
                          width: "auto",
                          marginBottom: "10px",
                          opacity: 0.8,
                        }}
                      />
                      <Typography variant="body1" color="text.secondary">
                        No records found
                      </Typography>
                    </Box>
                  </TableCell>
                </TableRow>
              ) : null}

              {(reportloading || delayedLoading) && (
                <TableRow>
                  <TableCell colSpan={3} align="center" sx={{ py: 3 }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 1,
                      }}
                    >
                      <CircularProgress size={22} sx={{ color: "#3b82f6" }} />
                      <Typography variant="body2" sx={{ color: "#64748b" }}>
                        Loading
                      </Typography>
                    </Box>
                  </TableCell>
                </TableRow>
              )}

              {!hasNext && rows.length > 0 && (
                <TableRow>
                  <TableCell colSpan={3} align="center" sx={{ py: 2 }}>
                    <Typography variant="body2" sx={{ color: "#94a3b8" }}>
                      All records loaded
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default Escalation;
