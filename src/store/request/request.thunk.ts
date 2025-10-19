import { createAsyncThunk} from "@reduxjs/toolkit";
import { requestService } from "@/lib/request.management";

//new request
export const newRequest = createAsyncThunk(
  "request/create",
  async (
    payload: {
      FYEAR: string;
      Month:number;
      QC: string;
      Plant: string;
      Division: string;
      Category: string;
      QTCode: string;
      Location: string;
      State: string;
      Amount: number;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await requestService.newRequest(payload);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || "Failed to get response"
      );
    }
  }
);

//getAllRequest
export const getAllRequests = createAsyncThunk(
  "request/getall",
  async (_, {rejectWithValue}) => {
    try {
      const response = await requestService.getAllRequests();
      return response;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message || "Failed to get response");
    }
  }
);

