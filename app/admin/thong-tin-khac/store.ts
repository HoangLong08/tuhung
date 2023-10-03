'use client';

import { useEffect, useState } from 'react';
import * as services from '@/services/businessInfo.services';
import { TypeValuesBusinessInfo } from '@/type/businessInfo';
import { notification } from 'antd';

export interface TypeBusiness {
  payload: TypeValuesBusinessInfo;
  callback: (value: string | null) => void;
}

const storeBusinessInfo = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<TypeValuesBusinessInfo>();

  const createBusinessInfo = async ({ payload, callback }: TypeBusiness) => {
    try {
      setLoading(true);
      await services.createBusinessInfo(payload);
      setLoading(false);
      callback('success');
      notification.success({
        message: 'Thông báo',
        description: 'Thêm mới thành công.',
      });
    } catch (err) {
      setLoading(false);
      notification.error({
        message: 'Thông báo',
        description: 'Lỗi',
      });
      callback(null);
    }
  };

  const updateBusinessInfo = async (
    values: TypeValuesBusinessInfo,
    id: string
  ) => {
    try {
      setLoading(true);
      await services.updateBusinessInfo(values, id);
      setLoading(false);
      notification.success({
        message: 'Thông báo',
        description: 'Cập nhật thành công.',
      });
    } catch (err) {
      setLoading(false);
      notification.error({
        message: 'Thông báo',
        description: 'Lỗi',
      });
    }
  };

  const getBusinessInfo = async () => {
    try {
      setLoading(true);
      const response = await services.getBusinessInfo();
      setLoading(false);
      if (response) {
        setData(response);
      }
    } catch (err) {
      setLoading(false);
      notification.error({
        message: 'Thông báo',
        description: 'Lỗi',
      });
    }
  };

  useEffect(() => {
    getBusinessInfo();
  }, []);

  return {
    getBusinessInfo,
    createBusinessInfo,
    updateBusinessInfo,
    loading,
    data,
  };
};

export default storeBusinessInfo;
