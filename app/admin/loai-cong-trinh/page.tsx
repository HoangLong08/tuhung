'use client';

import Table, { TypeColumn } from '@/components/Table';
import { DeleteOutlined, SaveOutlined } from '@ant-design/icons';
import { Button, Col, Input, Row, Space, Typography, notification } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
import CustomModal from '@/components/CustomModalDelete/CustomModal';
import storeTypeConstruction from './store';
import { ResConstructionType } from '@/type/construction';
import '@/styles/util.scss';

const Index = () => {
  const {
    data,
    createTypeConstructor,
    getTypeConstructor,
    updateTypeConstructor,
    removeTypeConstructor,
    setData,
    details,
    setDetails,
  } = storeTypeConstruction();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOk = () => {
    setIsModalOpen(false);
    onRemove(details as ResConstructionType);
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
    record: ResConstructionType,
    value: string,
    key: string
  ) => {
    setData((prev) =>
      prev.map((item: ResConstructionType) => {
        const itemId = item?.id || item?.ids;
        const recordId = record?.id || record?.ids;
        if (itemId === recordId) {
          return { ...item, [key]: value };
        }
        return item;
      })
    );
  };

  const onSave = (record: ResConstructionType) => {
    const { title, description } = record;
    if (!title || !description) {
      notification.error({
        message: 'Thông báo',
        description: 'Vui lòng nhập đầy đủ thông tin cho loại tin tức',
      });
      return;
    }
    if (record.ids) {
      createTypeConstructor({
        payload: {
          title: record.title,
          description: record.description,
        },
        callback: (value) => {
          if (value) {
            getTypeConstructor();
          }
        },
      });
    }
    if (record.id) {
      updateTypeConstructor(
        {
          payload: {
            title: record.title,
            description: record.description,
          },
          callback: (value) => {
            if (value) {
              getTypeConstructor();
            }
          },
        },
        record.id
      );
    }
  };

  const onRemove = (record: ResConstructionType) => {
    if (record.ids) {
      setData((prev) => prev.filter((item) => item.ids !== record.ids));
    }
    if (record.id) {
      removeTypeConstructor({
        payload: { id: record.id, title: record.title },
        callback: (value) => {
          if (value) {
            getTypeConstructor();
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
      render: (_: object, __: object, index: number) => index + 1,
    },
    {
      title: 'Loại công trình',
      key: 'tt',
      width: 200,
      className: 'min-width-200',
      render: (record: ResConstructionType) => (
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
      render: (record: ResConstructionType) => (
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
      key: 'action',
      className: 'min-width-100',
      align: 'right',
      render: (record: ResConstructionType) => (
        <Space>
          <Button
            onClick={() => onSave(record)}
            icon={<SaveOutlined />}
          ></Button>
          <Button
            onClick={() => {
              setIsModalOpen(true);
              setDetails(record);
            }}
            icon={<DeleteOutlined />}
            danger
          ></Button>
        </Space>
      ),
    },
  ];

  return (
    <Row>
      <Col span={24}>
        <Typography.Title level={2}>Danh sách loại công trình</Typography.Title>
      </Col>
      <Col span={24}>
        <Table
          columns={columns}
          data={data}
          footer={() => [
            <Button
              type='primary'
              className='btn-type-primary'
              onClick={onAdd}
              key={uuidv4()}
            >
              Thêm loại tin tức
            </Button>,
          ]}
        />
      </Col>
      <CustomModal
        handleDelete={handleOk}
        handleCancel={handleCancel}
        open={isModalOpen}
        title={details?.title || ''}
      />
    </Row>
  );
};

export default Index;
