import { createAsyncThunk } from '@reduxjs/toolkit';
import { TypeUpload } from './types';
import {
  uploadFiles,
  uploadImageFiles,
  uploadVideoFiles,
} from '@/services/upload.services';
import { notification } from 'antd';

export const upload = createAsyncThunk('UPLOAD', async (action: TypeUpload) => {
  const { value, callback } = action;
  try {
    const response = await uploadFiles(value);
    if (response && callback) {
      callback(response);
    }
    return response;
  } catch (err: unknown) {
    notification.error({
      message: 'Thông báo',
      description: 'Upload file lỗi',
    });
    if (callback) {
      callback(null);
    }
  }
});

export const uploadImage = createAsyncThunk(
  'UPLOAD_IMAGE',
  async (action: TypeUpload) => {
    const { value, callback } = action;

    try {
      const response = await uploadImageFiles(value);
      if (response && callback) {
        callback(response);
      }
      return response;
    } catch (err: unknown) {
      notification.error({
        message: 'Thông báo',
        description: 'Upload file lỗi',
      });
      if (callback) {
        callback(null);
      }
    }
  }
);

export const uploadVideo = createAsyncThunk(
  'UPLOAD_VIDEO',
  async (action: TypeUpload) => {
    const { value, callback } = action;
    try {
      const response = await uploadVideoFiles(value);
      if (response && callback) {
        callback(response);
      }
      return response;
    } catch (err: unknown) {
      notification.error({
        message: 'Thông báo',
        description: 'Upload file lỗi',
      });
      if (callback) {
        callback(null);
      }
    }
  }
);
