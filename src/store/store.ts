import { configureStore } from "@reduxjs/toolkit";
import type { TypedUseSelectorHook } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import authReducer from "./auth/auth.slice";
import requestReducer from './request/request.slice';
import reportReducer from './report/report.slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    request:requestReducer,
    report:reportReducer
  },
});

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Hooks
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
