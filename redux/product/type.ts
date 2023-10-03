export enum ActionType {
  GET_ALL_PRODUCT_BY_CATEGORY = 'GET_ALL_PRODUCT_BY_CATEGORY',
}
export type Category = {
  id?: string;
  title?: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
  slug?: string;
};

export type CategoryEdit = {
  title: string;
  description: string;
};

export type CategoryProduct = {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  title: string;
  description: string;
  slug?: string;
  products: Product[];
};

export type Product = {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  name: string;
  image: string;
  description: string;
  price: number;
  unit: number;
  content: string;
  slug?: string;
  category?: Category;
};

export type ProductState = {
  products: CategoryProduct;
};

export interface ProductAdd extends ProductForm {
  categoryId: string;
}
export interface ProductEdit extends ProductForm {
  id: string;
}

export type ProductForm = {
  name: string;
  image: any;
  description: string;
  price: number;
  unit: number;
  content: string;
};

export type ResponseProduct = {
  data: Product[];
  meta: {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    itemCount: number;
    page: number;
    pageCount: number;
    take: number;
  };
  statusCode: number;
};
