import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import todoSlice from './todoSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    todo:todoSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
