'use client';

import { useEffect, useState } from 'react';
import { notification } from 'antd';
import { ConstructionType, ResConstructionType } from '@/type/construction';
import Constructions from '@/services/construction.service';

interface argConstructions {
  payload: ConstructionType;
  callback: (value: string | null) => void;
}

const storeConstruction = () => {
  const [data, setData] = useState<ConstructionType[]>([]);
  const [loading, setLoading] = useState(false);
  const [detail, setDetail] = useState<ConstructionType>();
  const [typeConstructor, setTypeConstructor] = useState<ResConstructionType[]>(
    []
  );

  const createConstruction = async ({
    payload,
    callback,
  }: argConstructions) => {
    try {
      setLoading(true);
      await Constructions.createConstruction(payload);
      setLoading(false);
      callback('success');
      notification.success({
        message: 'Thông báo',
        description: `Thêm ${payload.title} thành công.`,
      });
    } catch (error) {
      setLoading(false);
      callback(null);
      notification.error({
        message: 'Thông báo',
        description:
          'Tên công trình đã được sử dụng. Vui lòng thử lại với tên khác.',
      });
    }
  };

  const getConstruction = async () => {
    try {
      setLoading(true);
      const response = await Constructions.getAllConstructions();
      setData(response);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      notification.error({
        message: 'Thông báo',
        description: 'Lỗi lấy danh sách công trình, vui lòng kiểm tra lại',
      });
    }
  };

  const updateConstruction = async (
    { payload, callback }: argConstructions,
    id: string
  ) => {
    try {
      setLoading(true);
      await Constructions.updateConstruction(payload, id);
      callback('success');
      setLoading(false);
      notification.success({
        message: 'Thông báo',
        description: `Cập nhật ${payload.title} thành công.`,
      });
    } catch (error) {
      setLoading(false);
      callback(null);
      notification.error({
        message: 'Thông báo',
        description:
          'Tên công trình đã được sử dụng. Vui lòng thử lại với tên khác.',
      });
    }
  };

  const removeConstruction = async ({
    payload,
    callback,
  }: argConstructions) => {
    try {
      setLoading(true);
      await Constructions.removeConstruction(`${payload.id}`);
      setLoading(false);
      callback('success');
      notification.success({
        message: 'Thông báo',
        description: `Xóa ${payload.title} thành công`,
      });
    } catch (error) {
      setLoading(false);
      notification.error({
        message: 'Thông báo',
        description: 'Lỗi xóa dữ liệu, vui lòng kiểm tra lại',
      });
      callback(null);
    }
  };

  const getDetailConstruction = async (slug: string) => {
    try {
      setLoading(true);
      const response = await Constructions.getConstructionBySlug(slug);
      setDetail(response);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const getTypeConstructor = async () => {
    try {
      const response = await Constructions.getAllTypeConstructor();
      setTypeConstructor(response as ResConstructionType[]);
    } catch (e) {}
  };

  useEffect(() => {
    getConstruction();
  }, []);

  return {
    getConstruction,
    createConstruction,
    updateConstruction,
    removeConstruction,
    loading,
    getDetailConstruction,
    detail,
    data,
    typeConstructor,
    setDetail,
    getTypeConstructor,
  };
};

export default storeConstruction;
