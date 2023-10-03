'use client';

import { useEffect, useState } from 'react';
import * as services from '@/services';
import { notification } from 'antd';
import { ResSlide } from '@/type/slideImage';

interface TypeArg {
  file?: File;
  callback: (value: string | null) => void;
  id?: string;
}

const storeSlideHome = () => {
  const [loading, setLoading] = useState(false);
  const [slides, setSlide] = useState<ResSlide[]>([]);

  const createSlideHomPage = async ({ file, callback }: TypeArg) => {
    try {
      setLoading(true);
      await services.createSlideHomePage(file as File);
      setLoading(false);
      callback('success');
      notification.success({
        message: 'Thông báo',
        description: 'Thêm mới ảnh thành công.',
      });
    } catch (error) {
      setLoading(false);
      callback(null);
      notification.error({
        message: 'Thông báo',
        description: 'Lỗi upload ảnh',
      });
    }
  };

  const getSlideHomepage = async () => {
    try {
      setLoading(true);
      const response = await services.getSlideHomPage();
      setSlide(response);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const removeImage = async ({ id, callback }: TypeArg) => {
    try {
      setLoading(true);
      await services.removeSlideHome(id as string);
      setLoading(false);
      callback('success');
      notification.success({
        message: 'Thông báo',
        description: 'Xóa ảnh thành công.',
      });
    } catch (error) {
      setLoading(false);
      callback(null);
      notification.error({
        message: 'Thông báo',
        description: 'Lỗi xóa ảnh',
      });
    }
  };

  useEffect(() => {
    getSlideHomepage();
  }, []);

  return { slides, getSlideHomepage, createSlideHomPage, loading, removeImage };
};

export default storeSlideHome;
