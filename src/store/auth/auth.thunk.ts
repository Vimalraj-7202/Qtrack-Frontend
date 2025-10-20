import { createAsyncThunk } from "@reduxjs/toolkit";
import { authService } from "@/lib/auth.management";

// LOGIN
export const login = createAsyncThunk(
  "auth/login",
  async (payload: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const { data } = await authService.loginUser(payload);
      const { token, ...user } = data || {};
      if (!token) throw new Error("Token missing in response");
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      return { user, token };
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message || "Login failed");
    }
  }
);

// REGISTER
export const register = createAsyncThunk(
  "auth/register",
  async (
    payload: { name: string; email: string; password: string; role: string },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await authService.registerUser(payload);
      const { token, ...user } = data || {};

      if (!token) throw new Error("Token missing in response");

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      return { user, token };
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || "Registration failed"
      );
    }
  }
);
