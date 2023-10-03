export interface TypeValuesBusinessInfo {
  logo?: string;
  businessName?: string;
  yearExperience?: string;
  service?: string;
  intro?: string;
  content?: string;
  email?: string;
  phone?: string;
  timeWorking?: string;
  youtubeUrl?: string;
  callback: (value: any) => void;
  id?: string;
  name?: string;
  description?: string;
  address?: string;
  fax?: string;
  googleMap?: string;
}

export interface TypeResBusinessInfo {
  data: TypeValuesBusinessInfo;
}

export type ImageSlideBusinessInfo = {
  id: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
  index?: number;
  image: string;
};

export type PartnerType = {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  name: string;
  description: string;
  link: string;
  image: string;
};
