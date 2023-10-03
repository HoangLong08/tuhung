import requests from '@/api/axios';
import { DashboardType } from '@/type/dashboard';

export class DashboardTypeService {
  static prefix = 'businessinfos/business/dashboard';
  static getDashboard(): Promise<DashboardType> {
    return requests.get(this.prefix);
  }
}
