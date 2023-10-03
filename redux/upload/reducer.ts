import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { upload } from './dispatcher';

const uploadSlice = createSlice({
  name: 'upload',
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(upload.fulfilled, (_, action: PayloadAction<any>) => {});
  },
});

const uploadReducer = uploadSlice.reducer;
export { uploadReducer };
