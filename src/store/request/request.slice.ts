import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { newRequest, getAllRequests } from "./request.thunk";

interface Request {
  period: string;
  name: string;
  _id: string;
  Fyear: string;
  Month: number;
  QC: string;
  Plant: string;
  Division: string;
  Category: string;
  QTCode: string;
  Location: string;
  State: string;
  Amount: number;
}

interface RequestState {
  loading: boolean;
  data: Request[];
  error: string | null;
}

const initialState: RequestState = {
  loading: false,
  data: [],
  error: null,
};

const requestSlice = createSlice({
  name: "request",
  initialState,
  reducers: {
    resetRequestState: (state) => {
      (state.loading = false), (state.error = null);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(newRequest.pending, (state: any) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(newRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(newRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(getAllRequests.pending, (state: any) => {
        state.loading = true;
        state.error = null;
      })
     .addCase(getAllRequests.fulfilled, (state, action: PayloadAction<Request[]>) => {
  state.loading = false;
  state.data = action.payload; // payload is the array
})


      .addCase(getAllRequests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetRequestState } = requestSlice.actions;
export default requestSlice.reducer;
