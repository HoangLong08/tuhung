export const isValidUrl = (url: string) => {
  try {
    new URL(url);
    return true;
  } catch (err) {
    return false;
  }
};

import { TypeSearch } from '@/type/search';
import { PAGINATION } from './variables';
import { omit, pickBy } from 'lodash';

export const paginationFunction = ({
  pagination,
  query,
  callback,
  options,
}: any) => ({
  size: 'default',
  total: pagination?.itemCount,
  pageSize: query?.take || PAGINATION.PAGE_SIZE,
  defaultCurrent: Number(query?.page || PAGINATION.PAGE),
  current: Number(query?.page || PAGINATION.PAGE),
  hideOnSinglePage: pagination?.itemCount <= 10,
  showSizeChanger:
    options?.showSizeChanger !== undefined
      ? options?.showSizeChanger
      : PAGINATION.SHOW_SIZE_CHANGER,
  pageSizeOptions: PAGINATION.PAGE_SIZE_OPTIONS,
  locale: { items_per_page: PAGINATION.PER_PAGE_TEXT },
  onChange: (page: number, size: number) => {
    callback({ page, size });
  },
  onShowSizeChange: (current: number, size: number) => {
    callback({ page: current, size });
  },
  showTotal: (total: number, [start, end]: number[]) =>
    `Hiển thị kết quả từ ${start}-${end} trên tổng ${total} kết quả.`,
});

export const removeParams = (params: TypeSearch) => {
  if (!params) {
    return {};
  }
  return omit(pickBy(params, (value) => value !== null && value !== undefined));
};
