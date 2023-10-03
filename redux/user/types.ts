import { Error } from '../types';

export enum ActionType {
  LOGIN = 'LOGIN',
  SESSION = 'SESSION',
}

export enum Role {
  CUSTOMER = 'customer',
  ADMIN = 'admin',
}

export interface LoginInfo {
  email: string;
  password: string;
}

export interface ChangePasswordInfo {
  email: string;
  newPassword: string;
  oldPassword: string;
}

export interface UserInfo {
  id: string;
  createdAt: string;
  updatedAt: string;
  role: Role;
  email: string;
  firstName: string;
  lastName: string;
  avatar: string;
  deletedAt: string;
  password: string;
}

export interface UserResponse {
  user: UserInfo;
  token: {
    expiresIn: number;
    accessToken: string;
    refreshToken: string;
  };
}

export interface UserState {
  user: UserInfo;
  errors: Error[];
}
