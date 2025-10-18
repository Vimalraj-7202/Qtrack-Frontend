import { createAsyncThunk } from "@reduxjs/toolkit";
import { authService } from "@/lib/auth.management";

//login
export const login = createAsyncThunk(
  "auth/login",
  async (payload: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const { data } = await authService.loginUser(payload);
      if (data?.token) {
        localStorage.setItem("token", data.token);
      }
      if (data?.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      }
      return data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message || "Login failed");
    }
  }
);

//register
export const register = createAsyncThunk(
  "auth/register",
  async (
    payload: { name: string; email: string; password: string; role: string },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await authService.registerUser(payload);
      return data;
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || "Registration failed"
      );
    }
  }
);
