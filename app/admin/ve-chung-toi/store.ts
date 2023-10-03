'use client';

import * as services from '@/services';
import { BusinessIntroService } from '@/services/businessIntro.service';
import { TypeBusinessIntros } from '@/type/businessIntros';
import { notification } from 'antd';
import { useEffect, useState } from 'react';

interface argBusinessIntros {
  payload: TypeBusinessIntros;
  callback: (value: string | null) => void;
}

const storeBusinessIntros = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<TypeBusinessIntros[]>([]);
  const [details, setDetails] = useState<TypeBusinessIntros>();

  const getBusinessIntro = async () => {
    try {
      setLoading(true);
      const response = await services.listBusinessIntros();
      setData(response);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const createBusinessIntros = async ({
    payload,
    callback,
  }: argBusinessIntros) => {
    try {
      setLoading(true);
      await services.createBusinessIntros(payload);
      callback('success');
      setLoading(false);
      notification.success({
        message: 'Thông báo',
        description: `Thêm ${payload.title} thành công.`,
      });
    } catch (error) {
      callback(null);
      setLoading(false);
      notification.error({
        message: 'Thông báo',
        description: 'Tiêu đề đã được sử dụng. Vui lòng thử lại với tên khác.',
      });
    }
  };

  const updateBusinessIntros = async (
    { payload, callback }: argBusinessIntros,
    id: string
  ) => {
    try {
      setLoading(true);
      await services.updateBusinessIntros(payload, id);
      callback('success');
      setLoading(false);
      notification.success({
        message: 'Thông báo',
        description: `Cập nhật ${payload.title} thành công.`,
      });
    } catch (error) {
      callback(null);
      setLoading(false);
      notification.error({
        message: 'Thông báo',
        description: 'Tiêu đề đã được sử dụng. Vui lòng thử lại với tên khác.',
      });
    }
  };

  const removeBusinessIntros = async ({
    payload,
    callback,
  }: argBusinessIntros) => {
    try {
      setLoading(true);
      await services.removeBusinessIntros(`${payload.id}`);
      callback('success');
      setLoading(false);
      notification.success({
        message: 'Thông báo',
        description: `Xóa ${payload.title} thành công`,
      });
    } catch (error) {
      callback(null);
      setLoading(false);
      notification.error({
        message: 'Thông báo',
        description: 'Đã có lỗi xảy ra, vui lòng kiểm tra lại',
      });
    }
  };

  const detailBusinessIntros = async (title: string) => {
    try {
      setLoading(true);
      const response =
        await BusinessIntroService.getBusinessIntroByTitle(title);
      setDetails(response);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBusinessIntro();
  }, []);

  return {
    data,
    loading,
    createBusinessIntros,
    getBusinessIntro,
    updateBusinessIntros,
    detailBusinessIntros,
    removeBusinessIntros,
    details,
    setDetails,
  };
};

export default storeBusinessIntros;
