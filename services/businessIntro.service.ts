import requests from '@/api/axios';
import { BusinessIntro } from '@/redux/intro/type';

export class BusinessIntroService {
  static prefix = 'business-intros';
  static getAllBusinessIntro(): Promise<BusinessIntro[]> {
    return requests.get(this.prefix);
  }
  static updateBusinessIntro(
    body: BusinessIntro,
    id: string
  ): Promise<BusinessIntro[]> {
    return requests.put(`${this.prefix}/${id}`, body);
  }

  static getBusinessIntroByTitle(title: string): Promise<BusinessIntro> {
    return requests.get(`${this.prefix}/slug/${title}`);
  }
}
