'use client';

import { Button, Col, Row, Space, Typography } from 'antd';
import Head from 'next/head';
import React, { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import storeBusinessIntros from './store';
import Table from '@/components/Table';
import { TypeBusinessIntros } from '@/type/businessIntros';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import CustomModal from '@/components/CustomModalDelete/CustomModal';
import '@/styles/util.scss';

const Index = () => {
  const { data, details, setDetails, removeBusinessIntros, getBusinessIntro } =
    storeBusinessIntros();
  const router = useRouter();
  const pathname = usePathname();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOk = () => {
    setIsModalOpen(false);
    onRemove(details as TypeBusinessIntros);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onRemove = (record: TypeBusinessIntros) => {
    removeBusinessIntros({
      payload: { id: record.id, title: record.title },
      callback: (value) => {
        if (value) {
          getBusinessIntro();
        }
      },
    });
  };

  const colums = [
    {
      title: 'Số thử tự',
      key: 'stt',
      width: 200,
      className: 'min-width-200',
      render: (_: object, __: object, index: number) => index + 1,
    },
    {
      title: 'Tiêu đề',
      key: '',
      // width: 50,
      className: 'min-width-200',
      render: (record: TypeBusinessIntros) => record?.title,
    },
    {
      title: '',
      key: 'action',
      width: 80,
      className: 'min-width-80',
      render: (record: TypeBusinessIntros) => (
        <Space>
          <Button
            onClick={() => router.push(`${pathname}/chi-tiet/${record.slug}`)}
            icon={<EditOutlined />}
          />
          <Button
            onClick={() => {
              setIsModalOpen(true);
              setDetails(record);
            }}
            icon={<DeleteOutlined />}
            danger
          />
        </Space>
      ),
    },
  ];

  return (
    <>
      <Head>
        <title>Về chúng tôi</title>
      </Head>
      <div className='py-5 pr-3'>
        <Row>
          <Col span={24}>
            <div className='flex flex-row justify-between'>
              <Typography.Title level={2}>Về chúng tôi</Typography.Title>
              <Button
                type='primary'
                className='btn-type-primary'
                onClick={() => router.push(`${pathname}/them-moi`)}
              >
                Thêm mới
              </Button>
            </div>
          </Col>
          <Col span={24}>
            <Table columns={colums} data={data} />
          </Col>
          <CustomModal
            handleDelete={handleOk}
            handleCancel={handleCancel}
            open={isModalOpen}
            title={details?.title || ''}
          />
        </Row>
      </div>
    </>
  );
};

export default Index;
