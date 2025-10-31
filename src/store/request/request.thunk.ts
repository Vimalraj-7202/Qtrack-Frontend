import { createAsyncThunk} from "@reduxjs/toolkit";
import { requestService } from "@/lib/request.management";
 
//new request
export const newRequest = createAsyncThunk(
  "request/create",
  async (
    payload: {
      FYEAR: string;
      Month: number;
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
      return response.data.data;
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
  async (_, { rejectWithValue }) => {
    try {
      const response = await requestService.getAllRequests();
      const requests = Array.isArray(response.data) ? response.data : [];
      return requests;
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || "Failed to get response"
      );
    }
  }
);

//getRequestById
export const getRequestById = createAsyncThunk(
  "request/getById",
  async (id: any, { rejectWithValue }) => {
    try {
      const response = await requestService.getRequestbyId(id);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || "Failed to get response"
      );
    }
  }
);

 
