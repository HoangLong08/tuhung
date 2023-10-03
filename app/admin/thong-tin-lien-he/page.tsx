'use client';

import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Col, Row, Space, Typography } from 'antd';
import Table from '@/components/Table';
import storeBusinessInfoAddress from './store';
import { TypeBusinessInfoAddress } from '@/type/businessInfoAddress';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import CustomModal from '@/components/CustomModalDelete/CustomModal';
import '@/styles/util.scss';

const Index = () => {
  const {
    loading,
    data,
    details,
    setDetails,
    getBusinessInfoAddress,
    removeBusinessInfoAddress,
  } = storeBusinessInfoAddress();
  const pathname = usePathname();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOk = () => {
    setIsModalOpen(false);
    onRemove(details as TypeBusinessInfoAddress);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onRemove = (record: TypeBusinessInfoAddress) => {
    removeBusinessInfoAddress({
      payload: { id: record.id, name: record.name },
      callback: (value) => {
        if (value) {
          getBusinessInfoAddress();
        }
      },
    });
  };

  const columns = [
    {
      title: 'Loại',
      key: 'vp',
      width: 150,
      className: 'min-width-150',
      render: (record: TypeBusinessInfoAddress) => record?.name,
    },
    {
      title: 'Địa chỉ',
      key: 'ad',
      width: 150,
      className: 'min-width-150',
      render: (record: TypeBusinessInfoAddress) => record?.address,
    },
    {
      title: 'Email',
      key: 'mail',
      width: 120,
      className: 'min-width-120',
      render: (record: TypeBusinessInfoAddress) => record?.email,
    },
    {
      title: 'Số điện thoại',
      key: 'ph',
      width: 120,
      className: 'min-width-120',
      render: (record: TypeBusinessInfoAddress) => record?.phone,
    },
    {
      title: 'Fax',
      key: 'fax',
      width: 120,
      className: 'min-width-120',
      render: (record: TypeBusinessInfoAddress) => record?.fax,
    },
    {
      title: 'Nội dung',
      key: 'des',
      width: 100,
      className: 'min-width-100',
      render: (record: TypeBusinessInfoAddress) => record?.description,
    },
    {
      title: '',
      key: 'action',
      width: 80,
      className: 'min-width-80',
      align: 'right',
      render: (record: TypeBusinessInfoAddress) => (
        <Space>
          <Button
            className='mr-2'
            onClick={() => router.push(`${pathname}/chi-tiet/${record.id}`)}
            icon={<EditOutlined />}
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
        <div className='flex flex-row justify-between'>
          <Typography.Title level={2}>
            Danh sách văn phòng chính và các chi nhánh
          </Typography.Title>
          <Button
            onClick={() => router.push(`${pathname}/them-moi`)}
            type='primary'
            className='btn-type-primary'
          >
            Thêm mới
          </Button>
        </div>
      </Col>
      <Col span={24}>
        <Table columns={columns} data={data} />
      </Col>
      <CustomModal
        handleDelete={handleOk}
        handleCancel={handleCancel}
        open={isModalOpen}
        title={details?.name || ''}
      />
    </Row>
  );
};

export default Index;
