'use client';

import { ResTypeNews } from '@/type/typeNews';
import { useEffect, useState } from 'react';
import * as services from '@/services';
import { notification } from 'antd';

interface argNews {
  payload: ResTypeNews;
  callback: (value: string | null) => void;
}

const storeTypeNews = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<ResTypeNews[]>([]);
  const [details, setDetails] = useState<ResTypeNews>();
  const createTypeNews = async ({ payload, callback }: argNews) => {
    try {
      setLoading(true);
      await services.createTypeNews(payload);
      setLoading(false);
      callback('success');
      setLoading(false);
      notification.success({
        message: 'Thông báo',
        description: `Lưu ${payload.title} thành công.`,
      });
    } catch (error) {
      setLoading(false);
      callback(null);
      notification.error({
        message: 'Thông báo',
        description:
          'Loại tin tức đã được sử dụng. Vui lòng thử lại với tên khác.',
      });
    }
  };

  const removeTypeNews = async ({ payload, callback }: argNews) => {
    try {
      setLoading(true);
      await services.removeTypeNews(`${payload.id}`);
      setLoading(false);
      callback('success');
      setLoading(false);
      notification.success({
        message: 'Thông báo',
        description: `Xóa ${payload.title} thành công`,
      });
    } catch (error) {
      setLoading(false);
      callback(null);
      notification.error({
        message: 'Thông báo',
        description: 'Dữ liệu đang được sử dụng, vui lòng kiểm tra lại',
      });
    }
  };

  const updateTypeNews = async ({ payload, callback }: argNews, id: string) => {
    try {
      setLoading(true);
      await services.updateTypeNews(payload, id);
      setLoading(false);
      callback('success');
      setLoading(false);
      notification.success({
        message: 'Thông báo',
        description: `Lưu ${payload.title} thành công.`,
      });
    } catch (error) {
      setLoading(false);
      callback(null);
      notification.error({
        message: 'Thông báo',
        description:
          'Loại tin tức đã được sử dụng. Vui lòng thử lại với tên khác.',
      });
    }
  };

  const getTypeNews = async () => {
    try {
      setLoading(true);
      const response = await services.getTypeNews();
      setData(response);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTypeNews();
  }, []);

  return {
    loading,
    data,
    createTypeNews,
    getTypeNews,
    updateTypeNews,
    removeTypeNews,
    setData,
    setDetails,
    details,
  };
};

export default storeTypeNews;
