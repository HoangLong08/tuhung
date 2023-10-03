'use client';

import { useEffect, useState } from 'react';
import { notification } from 'antd';
import { ResConstructionType } from '@/type/construction';
import Constructions from '@/services/construction.service';

interface argConstruction {
  payload: ResConstructionType;
  callback: (value: string | null) => void;
}

const storeTypeConstruction = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<ResConstructionType[]>([]);
  const [details, setDetails] = useState<ResConstructionType>();

  const createTypeConstructor = async ({
    payload,
    callback,
  }: argConstruction) => {
    try {
      setLoading(true);
      await Constructions.createTypeConstructor({
        title: payload.title,
        description: payload.description,
      });
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
          'Loại công trình này đã được sử dụng. Vui lòng thử lại với tên khác.',
      });
    }
  };

  const removeTypeConstructor = async ({
    payload,
    callback,
  }: argConstruction) => {
    try {
      setLoading(true);
      await Constructions.removeTypeConstructor(`${payload.id}`);
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

  const updateTypeConstructor = async (
    { payload, callback }: argConstruction,
    id: string
  ) => {
    try {
      setLoading(true);
      await Constructions.updateConstructionById(payload, id);
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

  const getTypeConstructor = async () => {
    try {
      setLoading(true);
      const response = await Constructions.getAllTypeConstructor();
      setData(response);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTypeConstructor();
  }, []);

  return {
    loading,
    data,
    createTypeConstructor,
    getTypeConstructor,
    updateTypeConstructor,
    removeTypeConstructor,
    setData,
    setDetails,
    details,
  };
};

export default storeTypeConstruction;
