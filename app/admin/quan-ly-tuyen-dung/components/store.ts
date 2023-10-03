'use client';

import { ContactService } from '@/services/contact.service';
import { ContactResponse } from '@/type/contacts';
import { notification } from 'antd';
import { useEffect, useState } from 'react';

interface argContacts {
  payload: ContactResponse;
  callback: (value: string | null) => void;
}

const storeContacts = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<ContactResponse[]>([]);
  const [detail, setDetails] = useState<ContactResponse>();

  const getContacts = async () => {
    try {
      setLoading(true);
      const response = await ContactService.getAllContact();
      setData(response);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const updateContact = async ({ payload, callback }: argContacts) => {
    try {
      setLoading(true);
      await ContactService.updateContact(
        { status: payload.status as string },
        payload.id as string
      );
      setLoading(false);
      callback('success');
    } catch (error) {
      callback(null);
      setLoading(false);
      notification.error({
        message: 'Thông báo',
        description: 'Đã có lỗi xảy ra, vui lòng kiểm tra lại',
      });
    }
  };

  const removeContacts = async ({ payload, callback }: argContacts) => {
    try {
      setLoading(true);
      await ContactService.removeContacts(payload.id as string);
      setLoading(false);
      callback('success');
      notification.success({
        message: 'Thông báo',
        description: `Xóa ${payload.fullname} thành công`,
      });
    } catch (error) {
      callback(null);
    }
  };

  useEffect(() => {
    getContacts();
  }, []);

  return {
    loading,
    data,
    setData,
    detail,
    getContacts,
    updateContact,
    removeContacts,
    setDetails,
  };
};

export default storeContacts;
