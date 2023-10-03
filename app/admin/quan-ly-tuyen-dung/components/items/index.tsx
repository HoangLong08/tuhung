'use client';

import CustomModal from '@/components/CustomModalDelete/CustomModal';
import Table from '@/components/Table';
import { ContactResponse } from '@/type/contacts';
import { DeleteOutlined, SaveOutlined } from '@ant-design/icons';
import { Button, Col, Row, Select, Space, Typography } from 'antd';
import moment from 'moment';
import { useState } from 'react';
import storeContacts from '../store';

const Index = () => {
  const {
    loading,
    setData,
    data,
    setDetails,
    detail,
    removeContacts,
    getContacts,
    updateContact,
  } = storeContacts();

  const onRemove = (record: ContactResponse) => {
    removeContacts({
      payload: { id: record.id, fullname: record.fullname },
      callback: (value) => {
        if (value) getContacts();
      },
    });
  };

  const onChangeInput = (
    record: ContactResponse,
    value: string,
    key: string
  ) => {
    setData((prev) =>
      prev.map((item: ContactResponse) => {
        const itemId = item?.id || item?.id;
        const recordId = record?.id || record?.id;
        if (itemId === recordId) {
          return { ...item, [key]: value };
        }
        return item;
      })
    );
  };

  const onSave = (record: ContactResponse) => {
    updateContact({
      payload: { id: record.id, status: record.status },
      callback: (value) => {},
    });
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOk = () => {
    setIsModalOpen(false);
    onRemove(detail as ContactResponse);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const options = [
    {
      value: 'NORMAL',
      label: '-------',
    },
    {
      value: 'PROCESSING',
      label: 'Đang xử lý',
    },
    {
      value: 'COMPLETED',
      label: 'Hoàn thành',
    },
    {
      value: 'ACCEPTED',
      label: 'Chấp thuận',
    },
    {
      value: 'REJECTED',
      label: 'Từ chối',
    },
  ];
  const columns = [
    {
      title: 'Họ và tên',
      key: 'name',
      width: 150,
      className: 'min-width-150',
      render: (record: ContactResponse) => record?.fullname,
    },
    {
      title: 'Email',
      key: 'mail',
      width: 150,
      className: 'min-width-150',
      render: (record: ContactResponse) => record?.email,
    },
    {
      title: 'SĐT',
      key: 'phone',
      width: 100,
      className: 'min-width-100',
      render: (record: ContactResponse) => record?.phoneNumber,
    },
    {
      title: 'Nội dung',
      key: 'nd',
      width: 200,
      className: 'min-width-200',
      render: (record: ContactResponse) => record.content,
    },
    {
      title: 'Trạng thái',
      key: 'nd',
      width: 100,
      className: 'min-width-100',
      render: (record: ContactResponse) => (
        <Select
          style={{ minWidth: '120px' }}
          value={record.status}
          placeholder='Select a person'
          optionFilterProp='children'
          onChange={(value) => {
            onChangeInput(record, value, 'status');
          }}
          options={options}
        />
      ),
    },
    {
      title: 'Ngày gửi',
      key: 'file',
      width: 100,
      className: 'min-width-100',
      render: (record: ContactResponse) =>
        moment(record.createdAt).format('DD/MM/YYYY HH:mm:ss'),
    },
    {
      title: 'File tài liệu',
      key: 'file',
      width: 100,
      className: 'max-w-xs',
      render: (record: ContactResponse) => (
        <a href={record.file} target='_blank'>
          {(record.file?.length as number) > 30
            ? record.file?.substring(0, 30) + '...'
            : record.file}
        </a>
      ),
    },
    {
      title: '',
      key: 'action',
      width: 50,
      className: 'max-w-50',
      align: 'right',
      render: (record: ContactResponse) => (
        <Space>
          <Button
            onClick={() => onSave(record)}
            icon={<SaveOutlined />}
          ></Button>
          <Button
            onClick={() => {
              setDetails(record);
              setIsModalOpen(true);
            }}
            icon={<DeleteOutlined />}
            danger
          />
        </Space>
      ),
    },
  ];

  return (
    <Row>
      <Col span={24}>
        <Typography.Title level={2}>
          Danh sách liên hệ - tuyển dụng
        </Typography.Title>
      </Col>
      <Col span={24}>
        <Table columns={columns} data={data} />
      </Col>
      <CustomModal
        handleDelete={handleOk}
        handleCancel={handleCancel}
        open={isModalOpen}
        title={detail?.fullname || ''}
      />
    </Row>
  );
};

export default Index;
