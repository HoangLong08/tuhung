'use client';

import * as services from '@/services';
import { TypeCategoryProduct } from '@/type/product';
import { notification } from 'antd';
import { useEffect, useState } from 'react';

interface argCategory {
  payload: TypeCategoryProduct;
  callback: (value: string | null) => void;
}

const storeCategoryProduct = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<TypeCategoryProduct[]>([]);
  const [detail, setDetail] = useState<TypeCategoryProduct>();

  const createCategory = async ({ payload, callback }: argCategory) => {
    try {
      setLoading(true);
      await services.createCategoryProduct(payload);
      setLoading(false);
      callback('success');
      setLoading(false);
    } catch (error) {
      setLoading(false);
      callback(null);
    }
  };

  const removeCategory = async ({ payload, callback }: argCategory) => {
    try {
      setLoading(true);
      await services.removeCategoryProduct(`${payload.id}`);
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

  const updateCategory = async (
    { payload, callback }: argCategory,
    id: string
  ) => {
    try {
      setLoading(true);
      await services.updateCategoryProduct(payload, id);
      setLoading(false);
      callback('success');
      setLoading(false);
    } catch (error) {
      setLoading(false);
      callback(null);
    }
  };

  const getCategory = async () => {
    try {
      setLoading(true);
      const response = await services.getCategoryProduct();
      setData(response);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  return {
    loading,
    data,
    getCategory,
    createCategory,
    updateCategory,
    removeCategory,
    setData,
    detail,
    setDetail,
  };
};

export default storeCategoryProduct;
