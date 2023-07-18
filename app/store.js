import { configureStore } from '@reduxjs/toolkit';
import filesReducer from '../feautures/filesSlice.js';

export const store = configureStore({
  reducer: {
    files: filesReducer,
  },
});
