import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { filesService } from '../services/filesService';

const initialState = {
  entries: [],
  loading: false,
  path: '',
  loadingInfo: false,
  error: null,
  info: { data: { client_modified: '', size: '' } },
  token: '',
};

const filesSlice = createSlice({
  name: 'files',
  initialState,
  reducers: {
    assignFiles: (state, action) => {
      state.files = action.payload;
    },
    movePathForward: (state, action) => {
      state.path = state.path + `/${action.payload}`;
    },
    movePathBack: (state) => {
      const arrPath = state.path.split('/');
      state.path = state.path.slice(0, -arrPath[arrPath.length - 1].length - 1);
    },
    moveHome: (state, action) => {
      state.path = '';
    },
    assignUser: (state, action) => {
      state.token = action.payload;
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
      if (state.token) {
        alert(state.error);
      }
    });
    builder.addCase(deleteFile.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteFile.fulfilled, (state, action) => {
      state.entries = state.entries.filter(
        (entry) => entry.name !== action.payload.data.metadata.name,
      );
      state.loading = false;
    });
    builder.addCase(deleteFile.rejected, (state, action) => {
      state.loading = false;
      state.error = 'rejected';
      if (state.token) {
        alert(state.error);
      }
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
      if (state.token) {
        alert(state.error);
      }
    });
    builder.addCase(getMove.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getMove.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(getMove.rejected, (state, action) => {
      state.loading = false;
      state.error = 'rejected';
      if (state.token) {
        alert(state.error);
      }
    });
  },
});

export const {
  assignFiles,
  movePathForward,
  movePathBack,
  moveHome,
  assignUser,
} = filesSlice.actions;

export const initFiles = createAsyncThunk(
  'files/fetch',
  async (path = '', thunkAPI) => {
    const currentState = thunkAPI.getState();
    console.log('pathFetch:', currentState.files.path);
    const temp = await filesService.getFiles({
      token: currentState.files.token,
      path: currentState.files.path,
    });
    return temp;
  },
);

export const deleteFile = createAsyncThunk(
  'files/delete',
  async (file, thunkAPI) => {
    const currentState = thunkAPI.getState();
    const temp = await filesService.deleteFile({
      token: currentState.files.token,
      path: currentState.files.path,
      file,
    });
    return temp;
  },
);

export const getInfo = createAsyncThunk(
  'files/info',
  async (file, thunkAPI) => {
    const currentState = thunkAPI.getState();
    const temp = await filesService.getInfo({
      token: currentState.files.token,
      path: currentState.files.path,
      file,
    });
    return temp;
  },
);

export const getMove = createAsyncThunk(
  'files/getMove',
  async (request, thunkAPI) => {
    const currentState = thunkAPI.getState();
    const temp = await filesService.getMove({
      token: currentState.files.token,
      path: currentState.files.path,
      toPath: request.toPath,
      fileName: request.fileName,
    });
    return temp;
  },
);

export default filesSlice.reducer;
