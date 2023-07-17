import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../feautures/userSlice.js';

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});
