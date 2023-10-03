import requests from '@/api/axios';

export const uploadFiles = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  return await requests.post('/upload/single-file', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const uploadImageFiles = async (files: File) => {
  const file = new FormData();
  file.append('files', files);
  return await requests.post('/upload/single-image', file, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const uploadVideoFiles = async (file: File) => {
  const formData = new FormData();
  formData.append('files', file);
  return await requests.post('/upload/single-video', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const deleteUploadFile = async (url: string) => {
  return await requests.del(`/upload/assets?url=${url}`);
};
