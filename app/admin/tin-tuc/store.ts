'use client';

import { ResNews, ResTypeNews } from '@/type/typeNews';
import { useState } from 'react';
import * as services from '@/services';
import { notification } from 'antd';
import { TypeSearch } from '@/type/search';
import { TypePagination } from '@/type/pagination';
import { ArticleService } from '@/services/article.service';

interface argNews {
  payload: ResNews;
  callback: (value: string | null, error?: any) => void;
}

const storeNews = () => {
  const [typeNews, setTypeNews] = useState<ResTypeNews[]>([]);
  const [news, setNews] = useState<ResNews[]>([]);
  const [loading, setLoading] = useState(false);
  const [detail, setDetail] = useState<ResNews>();
  const [pagination, setPagination] = useState<TypePagination>();

  const createNews = async ({ payload, callback }: argNews) => {
    try {
      setLoading(true);
      await services.createNews(payload);
      setLoading(false);
      callback('success');
      notification.success({
        message: 'Thông báo',
        description: `Thêm ${payload.title} thành công`,
      });
    } catch (err) {
      setLoading(false);
      notification.error({
        message: 'Thông báo',
        description: 'Tiêu đề đã được sử dụng. Vui lòng thử lại với tên khác.',
      });
    }
  };

  const getNews = async (params: TypeSearch) => {
    try {
      setLoading(true);
      const response = await services.getNews(params);
      setNews(response.data as ResNews[]);
      setPagination(response.meta as TypePagination);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      notification.error({
        message: 'Thông báo',
        description: 'Lỗi lấy danh sách tin tức, vui lòng kiểm tra lại',
      });
    }
  };

  const updateNews = async ({ payload, callback }: argNews, id: string) => {
    try {
      setLoading(true);
      await services.updateNews(payload, id);
      callback('success');
      setLoading(false);
      notification.success({
        message: 'Thông báo',
        description: `Cập nhật ${payload.title} thành công`,
      });
    } catch (err) {
      setLoading(false);
      notification.error({
        message: 'Thông báo',
        description: 'Tiêu đề đã được sử dụng. Vui lòng thử lại với tên khác.',
      });
    }
  };

  const removeNews = async ({ payload, callback }: argNews) => {
    try {
      setLoading(true);
      await services.removeNews(`${payload.id}`);
      setLoading(false);
      callback('success');
      notification.success({
        message: 'Thông báo',
        description: `Xóa ${payload.title} thành công`,
      });
    } catch (error) {
      callback(null);
      setLoading(false);
      notification.error({
        message: 'Thông báo',
        description: 'Lỗi xóa dữ liệu, vui lòng kiểm tra lại',
      });
    }
  };

  const getTypeNews = async () => {
    try {
      const response = await services.getTypeNews();
      setTypeNews(response as ResTypeNews[]);
    } catch (error) {
      setLoading(false);
    }
  };

  const getDetailNews = async (slug: string) => {
    try {
      setLoading(true);
      const response = await ArticleService.getArticlesBySlug(slug);
      setDetail(response as ResNews);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  return {
    getNews,
    getTypeNews,
    createNews,
    updateNews,
    removeNews,
    typeNews,
    news,
    loading,
    getDetailNews,
    detail,
    pagination,
    setDetail,
  };
};

export default storeNews;
