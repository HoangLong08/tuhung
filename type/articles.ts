export type DirectoryType = {
  id?: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
  title?: string;
  slug?: string;
  description?: string;
  articles?: Article[];
};

export type ArticleType = {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  title: string;
  image: string;
  description: string;
  content: string;
  directoty: DirectoryType;
  slug?: string;
};

export interface QueryParams {
  page?: number;
  take?: number;
  searchKey?: string;
  directoryId?: string;
  order?: 'ASC' | 'DESC';
}
export type Article = {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  title: string;
  image: string;
  description: string;
  content: string;
  slug?: string;
};
