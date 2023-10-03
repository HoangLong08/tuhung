'use client';

import { Button, Col, Image, Row, Space, Typography } from 'antd';
import Table from '@/components/Table';
import { TypePartner } from '@/type/partner';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useRouter, usePathname } from 'next/navigation';
import storePartner from '../store';
import { isValidUrl } from '@/utils/Helper';
import { useEffect, useState } from 'react';
import CustomModal from '@/components/CustomModalDelete/CustomModal';
import '@/styles/util.scss';

const Index = () => {
  const { data, loading, details, setDetails, removePartner, getPartner } =
    storePartner();
  const router = useRouter();
  const pathname = usePathname();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOk = () => {
    setIsModalOpen(false);
    onRemove(details as TypePartner);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onRemove = (partner: TypePartner) => {
    removePartner({
      payload: { id: partner.id, name: partner.name },
      callback: (value) => {
        if (value) {
          getPartner();
        }
      },
    });
  };

  useEffect(() => {
    getPartner();
  }, []);

  const columns = [
    {
      title: 'Tên đối tác',
      width: 150,
      className: 'min-width-150',
      key: 'name',
      render: (record: TypePartner) => record?.name,
    },
    {
      title: 'Hình ảnh',
      width: 150,
      className: 'min-width-150',
      key: 'image',
      render: (record: TypePartner) => (
        <Image src={record?.image} width={100} height={100} />
      ),
    },
    {
      title: 'Mô tả',
      width: 200,
      className: 'min-width-200',
      key: 'description',
      render: (record: TypePartner) => record?.description,
    },
    {
      title: 'Link đối tác',
      width: 300,
      className: 'min-width-300',
      key: 'partner',
      render: (record: TypePartner) => {
        if (isValidUrl(record.link as string)) {
          return (
            <a href={record?.link} target='_blank'>
              {record?.link}
            </a>
          );
        }
        return record.link;
      },
    },
    {
      title: '',
      width: 90,
      className: 'min-width-90',
      key: 'action',
      align: 'right',
      render: (record: TypePartner) => (
        <Space>
          <Button
            onClick={() => router.push(`${pathname}/chi-tiet/${record.id}`)}
            icon={<EditOutlined />}
          ></Button>
          <Button
            onClick={() => {
              setDetails(record);
              setIsModalOpen(true);
            }}
            danger
            icon={<DeleteOutlined />}
          />
        </Space>
      ),
    },
  ];

  return (
    <Row>
      <Col span={24}>
        <div className='flex flex-row justify-between'>
          <Typography.Title level={2}>Danh sách đối tác</Typography.Title>
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
