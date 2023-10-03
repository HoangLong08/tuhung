'use client';

import * as services from '@/services';
import { TypePartner } from '@/type/partner';
import { notification } from 'antd';
import { useState } from 'react';
interface argPartner {
  payload: TypePartner;
  callback: (value: string | null) => void;
}

const storePartner = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<TypePartner[]>([]);
  const [details, setDetails] = useState<TypePartner>();

  const createPartner = async ({ payload, callback }: argPartner) => {
    try {
      setLoading(true);
      await services.createPartner(payload);
      setLoading(false);
      callback('success');
      notification.success({
        message: 'Thông báo',
        description: `Thêm ${payload.name} thành công.`,
      });
    } catch (error) {
      setLoading(false);
      callback(null);
      notification.error({
        message: 'Thông báo',
        description:
          'Tên đối tác đã được sử dụng. Vui lòng thử lại với tên khác.',
      });
    }
  };

  const updatePartner = async (
    { payload, callback }: argPartner,
    id: string
  ) => {
    try {
      setLoading(true);
      await services.updatePartner(payload, id);
      setLoading(false);
      callback('success');
      notification.success({
        message: 'Thông báo',
        description: `Cập nhật ${payload.name} thành công.`,
      });
    } catch (error) {
      setLoading(false);
      callback(null);
      notification.error({
        message: 'Thông báo',
        description:
          'Tên đối tác đã được sử dụng. Vui lòng thử lại với tên khác.',
      });
    }
  };

  const removePartner = async ({ payload, callback }: argPartner) => {
    try {
      setLoading(true);
      await services.deletePartner(payload.id as string);
      setLoading(false);
      callback('success');
      notification.success({
        message: 'Thông báo',
        description: `Xóa ${payload.name} thành công`,
      });
    } catch (error) {
      setLoading(false);
      callback(null);
      notification.error({
        message: 'Thông báo',
        description: 'Đã có lỗi xảy ra, vui lòng kiểm tra lại',
      });
    }
  };

  const getDetailsPartner = async (id: string) => {
    try {
      setLoading(true);
      const response = await services.detailsPartner(id);
      setDetails(response);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const getPartner = async () => {
    try {
      setLoading(true);
      const response = await services.getPartner();
      setData(response);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  return {
    data,
    details,
    loading,
    getDetailsPartner,
    getPartner,
    createPartner,
    updatePartner,
    removePartner,
    setDetails,
  };
};

export default storePartner;
