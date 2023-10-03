import { createAsyncThunk } from '@reduxjs/toolkit';

import { UserService } from './service';
import { ActionType, LoginInfo } from './types';

export const loginAsync = createAsyncThunk(
  ActionType.LOGIN,
  async (arg: LoginInfo, { rejectWithValue }) => {
    try {
      return await UserService.login(arg);
    } catch (error: unknown) {
      return rejectWithValue([
        {
          errorMessage: 'Email hoặc mật khẩu chưa đúng!',
        },
      ]);
    }
  }
);
