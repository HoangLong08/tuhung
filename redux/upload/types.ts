import { RcFile } from 'antd/es/upload';

export interface TypeUpload {
  value: File;
  callback?: (value: any) => void;
}

export interface TypeFile {
  filename?: string;
  originalname?: string;
  url?: string;
}

export interface TypeFileUpload {
  name?: string;
  file?: RcFile;
}
