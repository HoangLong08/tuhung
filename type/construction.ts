export interface ResConstruction {
  title?: string;
  image?: string;
  description?: string;
  content?: string;
  id?: string;
  slug?: string;
}

export enum ActionType {
  GET_ALL_CONSTRUCTIONS = 'GET_ALL_CONSTRUCTIONS',
}

export type ConstructionType = {
  id?: string;
  createdAt?: string;
  updatedAt?: string;
  title?: string;
  slug?: string;
  image?: string;
  description?: string;
  content?: string;
  type?: {
    id?: string;
    title?: string;
  };
  typeId?: string;
};

export interface ResConstructionType {
  id?: string;
  ids?: string;
  title?: string;
  description?: string;
  slug?: string;
}

export interface ResConstructionBySlugType {
  id?: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
  title?: string;
  slug?: string;
  description?: string;
  constructions?: ResConstruction[];
}

export interface ConstructionQueryParams {
  order?: 'ASC' | 'DESC';
  page?: number;
  take?: number;
  searchKey?: string;
}
