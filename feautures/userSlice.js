import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { authService } from '../services/authService';
const initialState = {
  token: '',
  loading: false,
  error: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    assignUser: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const { assignUser } = userSlice.actions;

export default userSlice.reducer;
