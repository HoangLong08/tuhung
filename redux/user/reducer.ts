import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Role, UserResponse, UserState } from './types';
import { loginAsync } from './dispatcher';
import { Error } from '../types';
import StorageUtils from '@/utils/storage';
const initialState: UserState = {
  user: {
    id: '',
    email: '',
    firstName: '',
    lastName: '',
    avatar: '',
    createdAt: '',
    deletedAt: '',
    updatedAt: '',
    role: Role.ADMIN,
    password: '',
  },
  errors: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logoutAction: (state) => {
      state.errors = [];
    },
    setPasswordAction: (state, action) => {
      state.user.password = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      loginAsync.fulfilled.type,
      (state, action: PayloadAction<UserResponse>) => {
        StorageUtils.set('crf_tk', action.payload.token.accessToken);
        state.user = action.payload.user;
      }
    );
    builder.addCase(
      loginAsync.rejected.type,
      (state, action: PayloadAction<Error[]>) => {
        state.errors = action.payload;
      }
    );
  },
});

const userReducer = userSlice.reducer;
const { logoutAction, setPasswordAction } = userSlice.actions;
export { userReducer, logoutAction, setPasswordAction };
