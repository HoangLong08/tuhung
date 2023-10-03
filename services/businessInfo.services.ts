import requests from '@/api/axios';
import {
  ImageSlideBusinessInfo,
  PartnerType,
  TypeValuesBusinessInfo,
} from '@/type/businessInfo';

export const createBusinessInfo = async (value: TypeValuesBusinessInfo) => {
  return await requests.post('/businessinfos', value);
};

export const getBusinessInfo = async () => {
  return await requests.get<TypeValuesBusinessInfo>('/businessinfos', {});
};

export const updateBusinessInfo = async (
  value: TypeValuesBusinessInfo,
  id: string
) => {
  return await requests.put(`/businessinfos/${id}`, value);
};

export const getImageSlideBusinessInfo = async () => {
  return await requests.get<ImageSlideBusinessInfo[]>(
    '/businessinfos/slide/images'
  );
};

export const getThumbnailSlideBusinessInfo = async () => {
  return await requests.get<ImageSlideBusinessInfo[]>(
    'businessinfos/slide/thumbnail-info/images'
  );
};

export const getAllPartnerBusinessInfo = async () => {
  return await requests.get<PartnerType[]>('businessinfos/business/partner');
};
