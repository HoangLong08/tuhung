import { ReactNode } from 'react';
export interface TypeRecord {
  name?: string;
  title?: string;
  description?: string;
  image?: string;
}

export interface TypeColumns {
  title?: string;
  key?: string;
  className?: string;
  width?: number;
  align?: string;
  render: (
    value?: TypeRecord,
    record?: TypeRecord,
    valueIndex?: number
  ) => ReactNode | string;
}
