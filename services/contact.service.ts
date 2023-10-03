import requests from '@/api/axios';
import { ContactEdit, ContactResponse, ContactType } from '@/type/contacts';
import { removeEmptyProperties } from '@/utils/removeEmptyProperties';

export class ContactService {
  static prefix = 'contacts';

  static sendContact(contact: ContactType): Promise<ContactResponse> {
    return requests.post(`${this.prefix}`, contact);
  }
  static getAllContact(params?: object): Promise<ContactResponse[]> {
    return requests.get(`${this.prefix}?${removeEmptyProperties(params)}`);
  }
  static updateContact(body: ContactEdit, id: string): Promise<void> {
    return requests.put(`${this.prefix}/${id}`, body);
  }
  static removeContacts(id: string): Promise<void> {
    return requests.del(`${this.prefix}/${id}`);
  }
}
