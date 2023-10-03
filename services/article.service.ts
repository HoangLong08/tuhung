import { ArticleType, DirectoryType, QueryParams } from '@/type/articles';
import requests from '@/api/axios';
import { removeEmptyProperties } from '@/utils/removeEmptyProperties';

export class ArticleService {
  static prefix = 'articles';

  static getAllDirectory(): Promise<DirectoryType[]> {
    return requests.get(`${this.prefix}/directory`);
  }

  static getAllArticles(params?: QueryParams): Promise<ArticleType[]> {
    return requests.get(`${this.prefix}?${removeEmptyProperties(params)}`);
  }

  static getArticlesById(id: string): Promise<ArticleType> {
    return requests.get(`${this.prefix}/${id}`);
  }

  static getArticlesBySlug(slug: string): Promise<ArticleType> {
    return requests.get(`${this.prefix}/slug/${slug}`);
  }

  static getArticlesByDirectorySlug(slug: string): Promise<DirectoryType> {
    return requests.get(`${this.prefix}/directory/slug/${slug}`);
  }
}
