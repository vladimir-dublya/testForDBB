import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../feautures/userSlice.js';
import filesReducer from '../feautures/filesSlice.js';
import logger from 'redux-logger';

import createSagaMiddleware from 'redux-saga';
const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    user: userReducer,
    files: filesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});
