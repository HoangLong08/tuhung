'use client';

import CustomModal from '@/components/CustomModalDelete/CustomModal';
import Table from '@/components/Table';
import { deleteUploadFile } from '@/services/upload.services';
import { ResSlide } from '@/type/slideImage';
import { DeleteOutlined } from '@ant-design/icons';
import {
  Button,
  Col,
  Image,
  Row,
  Typography,
  Upload,
  UploadProps,
  message,
} from 'antd';
import { RcFile } from 'antd/es/upload';
import { last } from 'lodash';
import { useState } from 'react';
import storeSlideThumbnail from './store';
import '@/styles/util.scss';

const Index = () => {
  const {
    loading,
    createSlideThumbnail,
    getSlideThumbnail,
    slides,
    removeSlideThumbnail,
  } = storeSlideThumbnail();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [details, setDetails] = useState<ResSlide>();

  const handleOk = () => {
    setIsModalOpen(false);
    onRemove(details as ResSlide);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onRemove = async (record: ResSlide) => {
    await deleteUploadFile(record.image || '');
    removeSlideThumbnail({
      id: record.id,
      callback: (value) => {
        if (value) {
          getSlideThumbnail();
        }
      },
    });
  };

  const colums = [
    {
      title: 'STT',
      width: 100,
      className: 'min-width-100',
      key: 'stt',
      align: 'center',
      render: (_: object, __: object, index: number) => index + 1,
    },
    {
      title: 'Hình ảnh',
      className: 'min-width-300',
      key: 'img',
      align: 'center',
      render: (record: ResSlide) => (
        <Image
          className='object-cover'
          src={record.image}
          width={400}
          height={180}
        />
      ),
    },
    {
      title: '',
      width: '',
      className: '',
      key: '',
      align: 'right',
      render: (record: ResSlide) => (
        <Button
          onClick={() => {
            setIsModalOpen(true);
            setDetails(record);
          }}
          icon={<DeleteOutlined />}
          danger
        />
      ),
    },
  ];

  const props: UploadProps = {
    customRequest({ file }) {
      const { name, size } = file as RcFile;
      const allowTypes = ['jpeg', 'jpg', 'png', 'svg'];

      if (name) {
        if (
          !allowTypes.includes(
            last(name.split('.') as string[])?.toLowerCase() as string
          )
        ) {
          message.error('Định dạng hỗ trợ:  .jpeg, .jpg, .png., .svg.');
        } else {
          createSlideThumbnail({
            file: file as File,
            callback: (value) => {
              if (value) {
                getSlideThumbnail();
              }
            },
          });
        }
      }
    },
    showUploadList: false,
    fileList: [],
  };

  return (
    <Row>
      <Col span={24}>
        <Typography.Title level={2}>Hình ảnh slide thumbnail</Typography.Title>
      </Col>
      <Col span={24}>
        <Table
          columns={colums}
          data={slides}
          footer={() => (
            <Upload {...props}>
              <Button type='primary' className='btn-type-primary'>
                {loading ? 'loading...' : ' Thêm hình ảnh'}
              </Button>
            </Upload>
          )}
        />
      </Col>
      <CustomModal
        handleDelete={handleOk}
        handleCancel={handleCancel}
        open={isModalOpen}
        title={'hình ảnh này'}
      />
    </Row>
  );
};

export default Index;
