export interface TypeContacts {
  fullname?: string;
  email?: string;
  phoneNumber?: string;
  content?: string;
  file?: string;
  id?: string;
}

export type ContactType = {
  fullname: string;
  email: string;
  phoneNumber: string;
  content: string;
  file: any;
};

export type ContactResponse = {
  id?: string;
  createdAt?: string;
  updatedAt?: string;
  fullname?: string;
  email?: string;
  phoneNumber?: string;
  content?: string;
  file?: string;
  status?: string;
};

export type ContactEdit = {
  status: string;
};
