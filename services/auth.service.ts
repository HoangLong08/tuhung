import requests from '@/api/axios';
import { ChangePasswordInfo, UserInfo } from '@/redux/user/types';

export class AuthService {
  static prefix = 'auth';

  static changePassword(body: ChangePasswordInfo): Promise<void> {
    return requests.patch(`${this.prefix}/reset-password`, body);
  }

  static getUserCurrent(): Promise<UserInfo> {
    return requests.get(`v1/${this.prefix}/me`);
  }
}
