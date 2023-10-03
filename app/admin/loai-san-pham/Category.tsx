'use client';

import CustomModal from '@/components/CustomModalDelete/CustomModal';
import Table, { TypeColumn } from '@/components/Table';
import { TypeCategoryProduct } from '@/type/product';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Col, Input, Row, Typography, notification } from 'antd';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import storeCategoryProduct from './store';
import '@/styles/util.scss';

const Index = () => {
  const {
    data,
    getCategory,
    createCategory,
    updateCategory,
    removeCategory,
    setData,
    detail,
    setDetail,
  } = storeCategoryProduct();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOk = () => {
    setIsModalOpen(false);
    onRemove(detail as TypeCategoryProduct);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onAdd = () => {
    setData([
      ...data,
      { ids: `${Math.floor(Math.random() * 100)}`, title: '', description: '' },
    ]);
  };

  const onChangeInput = (
    record: TypeCategoryProduct,
    value: string,
    key: string
  ) => {
    setData((prev) =>
      prev.map((item: TypeCategoryProduct) => {
        const itemId = item?.id || item?.ids;
        const recordId = record?.id || record?.ids;
        if (itemId === recordId) {
          return { ...item, [key]: value };
        }
        return item;
      })
    );
  };

  const onSave = (record: TypeCategoryProduct) => {
    if (!record.description || !record.title) {
      notification.error({
        message: 'Thông báo',
        description: 'Vui lòng nhập đầy đủ thông tin cho loại sản phẩm',
      });
      return;
    }
    if (record.ids) {
      createCategory({
        payload: {
          title: record.title,
          description: record.description,
        },
        callback: (value) => {
          if (value) {
            getCategory();
          }
        },
      });
    }
    if (record.id) {
      updateCategory(
        {
          payload: {
            title: record.title,
            description: record.description,
          },
          callback: (value) => {
            if (value) {
              getCategory();
            }
          },
        },
        record.id
      );
    }
  };

  const onRemove = (record: TypeCategoryProduct) => {
    if (record.ids) {
      setData((prev) => prev.filter((item) => item.ids !== record.ids));
    }
    if (record.id) {
      removeCategory({
        payload: { id: record.id },
        callback: (value) => {
          if (value) {
            getCategory();
          }
        },
      });
    }
  };

  const columns: TypeColumn[] = [
    {
      title: 'STT',
      key: 'stt',
      width: 80,
      className: 'min-width-80',
      render: (_: any, __: any, index: number) => index + 1,
    },
    {
      title: 'Loại sản phẩm',
      key: 'tt',
      width: 200,
      className: 'min-width-200',
      render: (record: TypeCategoryProduct) => (
        <Input
          value={record?.title}
          className='w-full'
          onChange={(event) => {
            const {
              target: { value },
            } = event;
            onChangeInput(record, value, 'title');
          }}
        />
      ),
    },
    {
      title: 'Mô tả',
      key: 'mt',
      className: 'min-width-300',
      render: (record: TypeCategoryProduct) => (
        <Input.TextArea
          value={record?.description}
          className='w-full'
          onChange={(event) => {
            const {
              target: { value },
            } = event;
            onChangeInput(record, value, 'description');
          }}
        />
      ),
    },
    {
      title: '',
      key: 'tt',
      className: 'min-width-100',
      render: (record: TypeCategoryProduct) => (
        <div className='flex flex-row'>
          <Button
            onClick={() => onSave(record)}
            icon={<EditOutlined />}
          ></Button>
          <Button
            onClick={() => onRemove(record)}
            danger
            icon={<DeleteOutlined />}
          ></Button>
        </div>
      ),
    },
  ];

  return (
    <Row>
      <Col span={24}>
        <Typography.Title level={3}>Danh sách loại sản phẩm</Typography.Title>
      </Col>
      <Col span={24}>
        <Table
          columns={columns}
          data={data}
          footer={() => [
            <Button
              key={uuidv4()}
              type='primary'
              className='btn-type-primary'
              onClick={onAdd}
            >
              Thêm loại sản phẩm
            </Button>,
          ]}
        />
      </Col>
      <CustomModal
        handleDelete={handleOk}
        handleCancel={handleCancel}
        open={isModalOpen}
        title={detail?.title || ''}
      />
    </Row>
  );
};

export default Index;
