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

// Safe localStorage getter
const getLocalItem = (key: string) => {
  if (typeof window === "undefined") return null;
  const item = localStorage.getItem(key);
  if (!item || item === "undefined") return null;
  try {
    return JSON.parse(item);
  } catch {
    return null;
  }
};

// Helper to save auth data
const saveAuthToLocal = (user: User, token: string) => {
  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("token", JSON.stringify(token));
};

// Helper to clear auth data
const clearAuthFromLocal = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
};

const initialState: AuthState = {
  user: getLocalItem("user"),
  token: getLocalItem("token") as string | null,
  users: [],
  loading: false,
  error: null,
  isAuthenticated: !!getLocalItem("token"),
  data: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      if (action.payload) {
        localStorage.setItem("user", JSON.stringify(action.payload));
      } else {
        localStorage.removeItem("user");
      }
    },
    setAuth: (state, action: PayloadAction<{ user: User; token: string }>) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      state.isAuthenticated = true;
      saveAuthToLocal(user, token);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      clearAuthFromLocal();
    },
  },
  extraReducers: (builder) => {
    // LOGIN
    builder.addCase(login.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      login.fulfilled,
      (state, action: PayloadAction<{ user: User; token: string }>) => {
        state.loading = false;
        const { user, token } = action.payload;
        state.user = user;
        state.token = token;
        state.isAuthenticated = true;
        saveAuthToLocal(user, token);
      }
    );
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Login failed";
    });

    // REGISTER
    builder.addCase(register.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      register.fulfilled,
      (state, action: PayloadAction<{ user: User; token: string }>) => {
        state.loading = false;
        const { user, token } = action.payload;
        state.user = user;
        state.token = token;
        state.isAuthenticated = true;
        saveAuthToLocal(user, token);
      }
    );
    builder.addCase(register.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Registration failed";
    });
  },
});

export const { setUser, setAuth, logout } = authSlice.actions;
export default authSlice.reducer;
