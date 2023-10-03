export interface TypeCategoryProduct {
  title?: string;
  description?: string;
  id?: string;
  ids?: string;
}

export interface TypeProduct {
  name?: string;
  image?: string;
  description?: string;
  price?: number | string;
  unit?: string;
  content?: string;
  categoryId?: string;
  id?: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
  isSpotlight?: boolean;
  category?: {
    title?: string;
    id?: string;
  };
  slug?: string;
}

export interface ResProduct {
  data: TypeProduct[];
  meta?: {
    pageCount?: number;
  };
}
