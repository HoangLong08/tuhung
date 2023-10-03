'use client';

import { Button, Col, Row, Space, Typography } from 'antd';
import Head from 'next/head';
import React, { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import Table from '@/components/Table';
import storeConstruction from './store';
import { ConstructionType } from '@/type/construction';
import CustomModal from '@/components/CustomModalDelete/CustomModal';
import '@/styles/util.scss';

const Index = () => {
  const { data, removeConstruction, detail, setDetail, getConstruction } =
    storeConstruction();
  const router = useRouter();
  const pathname = usePathname();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOk = () => {
    setIsModalOpen(false);
    onRemove(detail as ConstructionType);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onRemove = (record: ConstructionType) => {
    removeConstruction({
      payload: {
        id: record.id,
        title: record.title,
      },
      callback: (value) => {
        if (value) {
          getConstruction();
        }
      },
    });
  };

  const colums = [
    {
      title: 'STT',
      key: 'stt',
      width: 100,
      className: 'min-width-100',
      render: (_: object, __: object, index: number) => index + 1,
    },
    {
      title: 'Tiêu đề công trình',
      key: 'td',
      width: 200,
      className: 'min-width-200',
      render: (record: ConstructionType) => record?.title,
    },
    {
      title: 'Mô tả',
      key: 'mt',
      width: 200,
      className: 'min-width-200',
      render: (record: ConstructionType) => record?.description,
    },
    {
      title: '',
      key: 'action',
      width: 100,
      className: 'min-width-100',
      align: 'right',
      render: (record: ConstructionType) => (
        <Space>
          <Button
            className='mr-1'
            onClick={() => router.push(`${pathname}/chi-tiet/${record.slug}`)}
            icon={<EditOutlined />}
          ></Button>
          <Button
            onClick={() => {
              setIsModalOpen(true);
              setDetail(record);
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
        <title>Công trình trọng điểm</title>
      </Head>
      <div className='py-5 pr-3'>
        <Row>
          <Col span={24}>
            <div className='flex flex-row justify-between'>
              <Typography.Title level={2}>
                Công trình trọng điểm
              </Typography.Title>
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
            title={detail?.title || ''}
          />
        </Row>
      </div>
    </>
  );
};

export default Index;
