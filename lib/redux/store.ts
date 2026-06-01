import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import todoSlice from './todoSlice';
import searchSlice from './searchSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    todo:todoSlice,
    search:searchSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
