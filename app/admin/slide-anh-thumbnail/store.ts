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

const storeSlideThumbnail = () => {
  const [loading, setLoading] = useState(false);
  const [slides, setSlide] = useState<ResSlide[]>([]);

  const createSlideThumbnail = async ({ file, callback }: TypeArg) => {
    try {
      setLoading(true);
      await services.createSlideThumbnail(file as File);
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

  const removeSlideThumbnail = async ({ id, callback }: TypeArg) => {
    try {
      setLoading(true);
      await services.removeSlideThumbnail(id as string);
      setLoading(false);
      callback('success');
      notification.success({
        message: 'Thông báo',
        description: 'Xóa ảnh thành công.',
      });
    } catch (error) {
      setLoading(false);
      notification.error({
        message: 'Thông báo',
        description: 'Lỗi xóa ảnh',
      });
    }
  };

  const getSlideThumbnail = async () => {
    try {
      setLoading(true);
      const response = await services.getSlideThumbnail();
      setSlide(response);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSlideThumbnail();
  }, []);

  return {
    slides,
    getSlideThumbnail,
    createSlideThumbnail,
    loading,
    removeSlideThumbnail,
  };
};

export default storeSlideThumbnail;
