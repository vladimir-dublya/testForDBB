import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { filesService } from '../services/filesService';

const initialState = {
  entries: [],
  loading: false,
  error: null,
};

const filesSlice = createSlice({
  name: 'files',
  initialState,
  reducers: {
    assignFiles: (state, action) => {
      state.files = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(initFiles.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(initFiles.fulfilled, (state, action) => {
      state.entries = action.payload.data.entries;
      state.loading = false;
    });
    builder.addCase(initFiles.rejected, (state, action) => {
      state.loading = false;
      state.error = 'rejected';
    });
  },
});

export const { assignFiles } = filesSlice.actions;

export const initFiles = createAsyncThunk(
  'files/fetch',
  async (token, path) => {
    const temp = await filesService.getFiles(token);
    return temp;
  },
);

export default filesSlice.reducer;
