import requests from '@/api/axios';
import { LoginInfo, UserState } from './types';

export class UserService {
  static prefix = '/auth';
  static login(body: LoginInfo): Promise<UserState> {
    return requests.post(`${this.prefix}/login`, body);
  }
}
