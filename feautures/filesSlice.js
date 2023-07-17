import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { filesService } from '../services/filesService';

const initialState = {
  entries: [],
  loading: false,
  loadingInfo: false,
  error: null,
  info: { data: { client_modified: '', size: '' } },
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
    builder.addCase(deleteFile.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteFile.fulfilled, (state, action) => {
      console.log('action: ', action.payload.data.metadata);
      state.entries = state.entries.filter(
        (entry) => entry.name !== action.payload.data.metadata.name,
      );
      state.loading = false;
    });
    builder.addCase(deleteFile.rejected, (state, action) => {
      state.loading = false;
      state.error = 'rejected';
    });
    builder.addCase(getInfo.pending, (state) => {
      state.loadingInfo = true;
    });
    builder.addCase(getInfo.fulfilled, (state, action) => {
      state.info = action.payload;
      state.loadingInfo = false;
    });
    builder.addCase(getInfo.rejected, (state, action) => {
      state.loadingInfo = false;
      state.error = 'rejected';
    });
  },
});

export const { assignFiles } = filesSlice.actions;

export const initFiles = createAsyncThunk('files/fetch', async (token) => {
  const temp = await filesService.getFiles(token);
  return temp;
});

export const deleteFile = createAsyncThunk('files/delete', async (token) => {
  const temp = await filesService.deleteFile(token);
  return temp;
});

export const getInfo = createAsyncThunk('files/info', async (token) => {
  const temp = await filesService.getInfo(token);
  return temp;
});

export default filesSlice.reducer;
