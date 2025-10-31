import { createAsyncThunk } from "@reduxjs/toolkit";
import { reportService } from "@/lib/report.managemt";

interface ReportRequest {
  userId: string;
  pageNo: number|any;
  pageSize: number|any;
}

export const getOverallReports = createAsyncThunk(
  "report/getOverallReports",
  async ({ userId, pageNo, pageSize }: ReportRequest, { rejectWithValue }) => {
    try {
      const response = await reportService.getOverallReport(userId, pageNo, pageSize);
      console.log(response,'responsedata');
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to fetch overall report");
    }
  }
);
