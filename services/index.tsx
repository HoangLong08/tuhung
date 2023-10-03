import request from '@/api/axios';
import { TypeValuesBusinessInfo } from '@/type/businessInfo';
import { TypeBusinessInfoAddress } from '@/type/businessInfoAddress';
import { TypeBusinessIntros } from '@/type/businessIntros';
import { ResConstruction } from '@/type/construction';
import { TypeContacts } from '@/type/contacts';
import { TypePartner } from '@/type/partner';
import { ResProduct, TypeCategoryProduct, TypeProduct } from '@/type/product';
import { TypeSearch } from '@/type/search';
import { ResSlide } from '@/type/slideImage';
import { ResNews, ResTypeNews } from '@/type/typeNews';

export const createSlideHomePage = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  return await request.post('/businessinfos/slide/images', formData);
};

export const createSlideThumbnail = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  return await request.post(
    '/businessinfos/slide/thumbnail-info/images',
    formData
  );
};

export const getSlideHomPage = async () => {
  return await request.get<ResSlide[]>('/businessinfos/slide/images', {});
};

export const getSlideThumbnail = async () => {
  return await request.get<ResSlide[]>(
    '/businessinfos/slide/thumbnail-info/images',
    {}
  );
};

export const removeSlideHome = (id: string) => {
  return request.del(`/businessinfos/slide/images/${id}`);
};

export const removeSlideThumbnail = (id: string) => {
  return request.del(`/businessinfos/slide/thumbnail-info/images/${id}`);
};

export const createBusinessInfoContact = async (
  value: TypeValuesBusinessInfo
) => {
  return await request.post('/businessinfos/address', value);
};
export const getBusinessInfoContact = async () => {
  return await request.get<TypeValuesBusinessInfo[]>(
    '/businessinfos/address',
    {}
  );
};

export const getBusinessInfo = async () => {
  return await request.get<TypeValuesBusinessInfo>('/businessinfos', {});
};

export const updateBusinessInfoContact = async (
  value: TypeValuesBusinessInfo,
  id: string
) => {
  return await request.put(`/businessinfos/address/${id}`, value);
};

export const createTypeNews = async (data: ResTypeNews) => {
  return await request.post('/articles/directory', data);
};

export const updateTypeNews = async (data: ResTypeNews, id: string) => {
  return await request.put(`/articles/directory/${id}`, data);
};

export const removeTypeNews = async (id: string) => {
  return await request.del(`/articles/directory/${id}`);
};

export const getTypeNews = async () => {
  return await request.get<ResTypeNews[]>(`/articles/directory`);
};

export const createNews = async (data: ResNews) => {
  return await request.post('/articles', data);
};

export const updateNews = async (data: ResNews, id: string) => {
  return await request.put(`/articles/${id}`, data);
};

export const removeNews = async (id: string) => {
  return await request.del(`/articles/${id}`);
};

export const getNews = async (params: TypeSearch) => {
  return await request.get(`/articles`, {
    params,
    isPagination: true,
  });
};

export const getDetailNews = async (id: string) => {
  return await request.get<ResNews>(`/articles/${id}`);
};

export const createConstruction = async (data: ResConstruction) => {
  return await request.post('/constructions', data);
};

export const updateConstruction = async (data: ResConstruction, id: string) => {
  return await request.put(`/constructions/${id}`, data);
};

export const removeConstruction = async (id: string) => {
  return await request.del(`/constructions/${id}`);
};

export const detailConstruction = async (id: string) => {
  return await request.get<ResConstruction>(`/constructions/${id}`);
};

export const getConstruction = async () => {
  return await request.get<ResConstruction[]>(`/constructions`);
};

export const createBusinessIntros = async (data: TypeBusinessIntros) => {
  return await request.post('/business-intros', data);
};

export const updateBusinessIntros = async (
  data: TypeBusinessIntros,
  id: string
) => {
  return await request.put(`/business-intros/${id}`, data);
};

export const removeBusinessIntros = async (id: string) => {
  return await request.del(`/business-intros/${id}`);
};

export const detailBusinessIntros = async (id: string) => {
  return await request.get<TypeBusinessIntros>(`/business-intros/${id}`);
};

export const listBusinessIntros = async () => {
  return await request.get<TypeBusinessIntros[]>(`/business-intros`);
};

export const getListContacts = async () => {
  return await request.get<TypeContacts[]>('/contacts');
};

export const removeContacts = async (id: string) => {
  return await request.del(`/contacts/${id}`);
};

export const createBusinessInfoAddress = async (
  data: TypeBusinessInfoAddress
) => {
  return await request.post('/businessinfos/address', data);
};

export const updateBusinessInfoAddress = async (
  data: TypeBusinessInfoAddress,
  id: string
) => {
  return await request.put(`/businessinfos/address/${id}`, data);
};

export const removeBusinessInfoAddress = async (id: string) => {
  return await request.del(`/businessinfos/address/${id}`);
};

export const detailsBusinessInfoAddress = async (id: string) => {
  return await request.get<TypeBusinessInfoAddress>(
    `/businessinfos/address/${id}`
  );
};

export const getBusinessInfoAddress = async () => {
  return await request.get<TypeBusinessInfoAddress[]>(`/businessinfos/address`);
};

export const createCategoryProduct = async (data: TypeCategoryProduct) => {
  return await request.post('/products/categories', data);
};

export const updateCategoryProduct = async (
  data: TypeCategoryProduct,
  id: string
) => {
  return await request.put(`/products/categories/${id}`, data);
};

export const removeCategoryProduct = async (id: string) => {
  return await request.del(`/products/categories/${id}`);
};

export const getCategoryProduct = async () => {
  return await request.get<TypeCategoryProduct[]>(`/products/categories`);
};

export const createProduct = async (data: TypeProduct) => {
  return await request.post('/products', data);
};

export const updateProduct = async (data: TypeProduct, id: string) => {
  return await request.put(`/products/${id}`, data);
};

export const removeProduct = async (id: string) => {
  return await request.del(`/products/${id}`);
};

export const detailsProduct = async (id: string) => {
  return await request.get<TypeProduct>(`/products/${id}`);
};

export const getProduct = async (params: TypeSearch) => {
  return await request.get(`/products`, {
    params,
    // isPagination: true,
  });
};

export const createPartner = async (data: TypePartner) => {
  return await request.post('/businessinfos/business/partner', data);
};

export const updatePartner = async (data: TypePartner, id: string) => {
  return await request.put(`/businessinfos/business/partner/${id}`, data);
};

export const deletePartner = async (id: string) => {
  return await request.del(`/businessinfos/business/partner/${id}`);
};

export const detailsPartner = async (id: string) => {
  return await request.get<TypePartner>(
    `/businessinfos/business/partner/${id}`
  );
};

export const getPartner = async () => {
  return await request.get<TypePartner[]>(`/businessinfos/business/partner`);
};
