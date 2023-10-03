'use client';

import { DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import {
  Button,
  Col,
  Image,
  Row,
  Typography,
  UploadProps,
  message,
  Upload,
  Modal,
} from 'antd';
import { last } from 'lodash';
import { RcFile } from 'antd/es/upload';
import Table from '@/components/Table';
import { ResSlide } from '@/type/slideImage';
import storeSlideHome from './store';
import { deleteUploadFile } from '@/services/upload.services';
import { useState } from 'react';
import CustomModal from '@/components/CustomModalDelete/CustomModal';
import '@/styles/util.scss';

const Index = () => {
  const { loading, getSlideHomepage, createSlideHomPage, slides, removeImage } =
    storeSlideHome();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [details, setDetails] = useState<ResSlide>();

  const handleOk = () => {
    setIsModalOpen(false);
    onRemove(details as ResSlide);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

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
          createSlideHomPage({
            file: file as File,
            callback: (value) => {
              if (value) {
                getSlideHomepage();
              }
            },
          });
        }
      }
    },
    showUploadList: false,
    fileList: [],
  };

  const onRemove = async (record: ResSlide) => {
    await deleteUploadFile(record.image || '');
    removeImage({
      id: record.id,
      callback: (value) => {
        if (value) {
          getSlideHomepage();
        }
      },
    });
  };

  const columns = [
    {
      title: 'STT',
      width: 50,
      className: 'min-width-50',
      align: 'center',
      key: 'stt',
      render: (_: any, __: any, index: number) => index + 1,
    },
    {
      title: 'Hình ảnh',
      // width: '',
      align: 'center',
      className: 'min-width-300',
      key: 'img',
      render: (record: ResSlide) => (
        <Image
          className='object-cover'
          src={record?.image}
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

  return (
    <Row>
      <Col span={24}>
        <Typography.Title level={2}>
          Hình ảnh slide banner trang chủ
        </Typography.Title>
      </Col>
      <Col span={24}>
        <Table
          columns={columns}
          data={slides}
          footer={() => (
            <Upload {...props} accept='image/*'>
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
