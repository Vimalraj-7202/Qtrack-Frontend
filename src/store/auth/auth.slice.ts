import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { login, register } from "./auth.thunk";

interface User {
  id: string;
  name: string;
  email: string;
  role: "Admin" | "Supervisor";
  password?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  users: User[];
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  data: any;
}

const getLocalItem = (key: string): any => {
  if (typeof window === "undefined") return null;

  const item = localStorage.getItem(key);

  if (!item || item === "undefined") return null;

  try {
    return JSON.parse(item);
  } catch {
    return null;
  }
};

const initialState: AuthState = {
  user: getLocalItem("user"),
  token: localStorage.getItem("token") || null,
  users: [],
  loading: false,
  error: null,
  isAuthenticated: !!localStorage.getItem("token"),
  data: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Update only user info
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      if (action.payload) {
        localStorage.setItem("user", JSON.stringify(action.payload));
      } else {
        localStorage.removeItem("user");
      }
    },
    // Set both user and token (for hydration or login)
    setAuth: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;

      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", action.payload.token);
    },
    // Logout clears everything
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    // LOGIN USER
    builder.addCase(login.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      login.fulfilled,
      (state, action: PayloadAction<{ user: User; token: string }>) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;

        localStorage.setItem("user", JSON.stringify(action.payload.user));
        localStorage.setItem("token", action.payload.token);
      }
    );
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // REGISTER USER
    builder.addCase(register.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      register.fulfilled,
      (state, action: PayloadAction<{ user: User; token: string }>) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;

        localStorage.setItem("user", JSON.stringify(action.payload.user));
        localStorage.setItem("token", action.payload.token);
      }
    );
    builder.addCase(register.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const { setUser, setAuth, logout } = authSlice.actions;
export default authSlice.reducer;
