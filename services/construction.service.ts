import requests from '@/api/axios';
import { QueryParams } from '@/type/articles';
import {
  ConstructionQueryParams,
  ConstructionType,
  ResConstructionBySlugType,
  ResConstructionType,
} from '@/type/construction';
import { removeEmptyProperties } from '@/utils/removeEmptyProperties';

class Constructions {
  static prefix = 'constructions';

  static getAllConstructions(
    params?: QueryParams
  ): Promise<ConstructionType[]> {
    return requests.get(`${this.prefix}?${removeEmptyProperties(params)}`);
  }
  static getConstructionById(id: string): Promise<ConstructionType> {
    return requests.get(`${this.prefix}/${id}`);
  }
  static getConstructionBySlug(slug: string): Promise<ConstructionType> {
    return requests.get(`${this.prefix}/slug/${slug}`);
  }
  static removeConstruction(id: string): Promise<void> {
    return requests.del(`${this.prefix}/${id}`);
  }

  static updateConstruction(body: ConstructionType, id: string): Promise<void> {
    return requests.put(`${this.prefix}/${id}`, body);
  }

  static createConstruction(body: ConstructionType): Promise<void> {
    return requests.post(`${this.prefix}`, body);
  }

  // loai cong trinh
  static getAllTypeConstructor(
    query?: ConstructionQueryParams
  ): Promise<ResConstructionType[]> {
    return requests.get(`${this.prefix}/type?${removeEmptyProperties(query)}`);
  }

  static removeTypeConstructor(id: string): Promise<void> {
    return requests.del(`${this.prefix}/type/${id}`);
  }

  static updateConstructionById(
    body: ResConstructionType,
    id: string
  ): Promise<void> {
    return requests.put(`${this.prefix}/type/${id}`, body);
  }

  static createTypeConstructor(body: ResConstructionType): Promise<void> {
    return requests.post(`${this.prefix}/type`, body);
  }
  static getConstructorBySlugType(
    slug: string
  ): Promise<ResConstructionBySlugType> {
    return requests.get(`${this.prefix}/type/slug/${slug}`);
  }
  static getConstructorTypeById(
    id: string
  ): Promise<ResConstructionBySlugType> {
    return requests.get(`${this.prefix}/type/${id}`);
  }
}

export default Constructions;
