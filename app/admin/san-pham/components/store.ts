'use client';

import * as services from '@/services';
import ProductService from '@/services/product.service';
import { TypePagination } from '@/type/pagination';
import { TypeCategoryProduct, TypeProduct } from '@/type/product';
import { TypeSearch } from '@/type/search';
import { notification } from 'antd';
import { omit } from 'lodash';
import { useState } from 'react';

interface argProduct {
  payload: TypeProduct;
  callback: (value: string | null, error?: any) => void;
}

const storeTypeProduct = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<TypeProduct[]>([]);
  const [details, setDetails] = useState<TypeProduct>();
  const [categories, setCategory] = useState<TypeCategoryProduct[]>([]);
  const [pagination, setPagination] = useState<TypePagination>();

  const createProduct = async ({ payload, callback }: argProduct) => {
    try {
      setLoading(true);
      await services.createProduct(payload);
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
          'Tên sản phẩm đã được sử dụng. Vui lòng thử lại với tên khác.',
      });
    }
  };

  const updateProduct = async ({ payload, callback }: argProduct) => {
    try {
      setLoading(true);
      await services.updateProduct(omit(payload, 'id'), payload.id as string);
      setLoading(false);
      callback('success');
      notification.success({
        message: 'Thông báo',
        description: `Cập nhật ${payload.name} thành công.`,
      });
    } catch (error) {
      callback(null);
      setLoading(false);
      notification.error({
        message: 'Thông báo',
        description:
          'Tên sản phẩm đã được sử dụng. Vui lòng thử lại với tên khác.',
      });
    }
  };

  const getDetailProduct = async (id: string) => {
    try {
      setLoading(true);
      const response = await ProductService.getProductBySlug(id);
      setDetails(response);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const getProduct = async (params: TypeSearch) => {
    try {
      setLoading(true);
      const response = await services.getProduct(params);
      response.data.sort((a: TypeProduct, b: TypeProduct) => {
        return (
          new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
        );
      });
      setData(response.data);
      setPagination(response.meta);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      notification.error({
        message: 'Thông báo',
        description: 'Đã có lỗi xảy ra, vui lòng kiểm tra lại',
      });
    }
  };

  const removePorduct = async ({ payload, callback }: argProduct) => {
    try {
      setLoading(true);
      await services.removeProduct(payload.id as string);
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

  const getCategory = async () => {
    const response = await services.getCategoryProduct();
    setCategory(response);
  };

  return {
    data,
    details,
    createProduct,
    getProduct,
    updateProduct,
    getDetailProduct,
    removePorduct,
    loading,
    getCategory,
    categories,
    pagination,
    setDetails,
  };
};

export default storeTypeProduct;
