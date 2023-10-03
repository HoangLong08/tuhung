'use client';

import * as services from '@/services';
import { TypeBusinessInfoAddress } from '@/type/businessInfoAddress';
import { notification } from 'antd';
import { useEffect, useState } from 'react';

interface argBusinessInfoAddress {
  payload: TypeBusinessInfoAddress;
  callback: (value: string | null) => void;
}

const storeBusinessInfoAddress = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<TypeBusinessInfoAddress[]>([]);
  const [details, setDetails] = useState<TypeBusinessInfoAddress>();

  const createBusinessInfoAddress = async ({
    payload,
    callback,
  }: argBusinessInfoAddress) => {
    try {
      setLoading(true);
      await services.createBusinessInfoAddress(payload);
      setLoading(false);
      callback('success');
      notification.success({
        message: 'Thông báo',
        description: `Thêm ${payload.name} thành công.`,
      });
    } catch (error) {
      setLoading(false);
      notification.error({
        message: 'Thông báo',
        description: 'Đã xảy ra lỗi, vui lòng kiểm tra lại',
      });
      callback(null);
    }
  };

  const updateBusinessInfoAddress = async (
    { payload, callback }: argBusinessInfoAddress,
    id: string
  ) => {
    try {
      setLoading(true);
      await services.updateBusinessInfoAddress(payload, id);
      setLoading(false);
      callback('success');
      notification.success({
        message: 'Thông báo',
        description: `Cập nhật ${payload.name} thành công.`,
      });
    } catch (error) {
      setLoading(false);
      notification.error({
        message: 'Thông báo',
        description: 'Đã xảy ra lỗi, vui lòng kiểm tra lại',
      });
      callback(null);
    }
  };

  const removeBusinessInfoAddress = async ({
    payload,
    callback,
  }: argBusinessInfoAddress) => {
    try {
      setLoading(true);
      await services.removeBusinessInfoAddress(payload.id as string);
      setLoading(false);
      callback('success');
      notification.success({
        message: 'Thông báo',
        description: `Xóa ${payload.name} thành công`,
      });
    } catch (error) {
      setLoading(false);
      notification.error({
        message: 'Thông báo',
        description: 'Đã xảy ra lỗi, vui lòng kiểm tra lại',
      });
      callback(null);
    }
  };

  const detailsBusinessInfoAddress = async (id: string) => {
    try {
      setLoading(true);
      const response = await services.detailsBusinessInfoAddress(id);
      setDetails(response);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      notification.error({
        message: 'Thông báo',
        description: 'Đã xảy ra lỗi, vui lòng kiểm tra lại',
      });
    }
  };

  const getBusinessInfoAddress = async () => {
    try {
      setLoading(true);
      const response = await services.getBusinessInfoAddress();
      setData(response);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      notification.error({
        message: 'Thông báo',
        description: 'Đã xảy ra lỗi, vui lòng kiểm tra lại',
      });
    }
  };

  useEffect(() => {
    getBusinessInfoAddress();
  }, []);

  return {
    data,
    details,
    loading,
    createBusinessInfoAddress,
    updateBusinessInfoAddress,
    getBusinessInfoAddress,
    detailsBusinessInfoAddress,
    removeBusinessInfoAddress,
    setDetails,
  };
};

export default storeBusinessInfoAddress;
