'use client';

import { UploadOutlined } from '@ant-design/icons';
import {
  Button,
  Col,
  Form,
  Image,
  Input,
  Row,
  Typography,
  Upload,
  UploadProps,
  message,
} from 'antd';
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from '../../styles.module.scss';
import { useAppDispatch } from '@/redux/hooks';
import { RcFile } from 'antd/es/upload';
import { isEmpty, last, omit } from 'lodash';
import { uploadImage } from '@/redux/upload/dispatcher';
import { TypePartner } from '@/type/partner';
import storePartner from '../store';
import { RULES } from '@/utils/rules';
import { deleteUploadFile } from '@/services/upload.services';
import '@/styles/util.scss';

const Index = () => {
  const { details, createPartner, updatePartner, loading, getDetailsPartner } =
    storePartner();
  const [formRef] = Form.useForm();
  const params = useParams();
  const router = useRouter();
  const [image, setImage] = useState('');
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (params.id && isEmpty(details)) {
      getDetailsPartner(params.id as string);
    }
  }, [params.id]);

  useEffect(() => {
    if (!isEmpty(details)) {
      setImage(details.image as string);
      formRef.setFieldsValue(details);
    }
  }, [details]);

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
          dispatch(
            uploadImage({
              value: file as File,
              callback: (res) => {
                setImage(res?.result || '');
              },
            })
          );
        }
      }
    },
    showUploadList: false,
    fileList: [],
  };

  const removeImage = async () => {
    await deleteUploadFile(image);
    setImage('');
  };

  const onFinish = (values: TypePartner) => {
    if (params.id) {
      updatePartner(
        {
          payload: { ...omit(values, 'image'), image },
          callback: (value) => {
            if (value) {
              history.back();
            }
          },
        },
        params.id as string
      );
    } else {
      createPartner({
        payload: { ...omit(values, 'image'), image },
        callback: (value) => {
          if (value) {
            history.back();
          }
        },
      });
    }
  };

  return (
    <Form layout='vertical' onFinish={onFinish} form={formRef}>
      <Row gutter={10}>
        <Col span={24}>
          <Typography.Title level={2}>
            {params.id ? 'CHỈNH SỬA' : 'THÊM MỚI'}
          </Typography.Title>
        </Col>
        <Col span={12}>
          <Form.Item rules={[RULES.EMPTY]} name='name' label='Tên đối tác'>
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item rules={[RULES.EMPTY]} name='link' label='Link đối tác'>
            <Input />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item rules={[RULES.EMPTY]} name='description' label='Mô tả'>
            <Input.TextArea rows={5} />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item name='image' label='Hình ảnh' rules={[RULES.EMPTY]}>
            {!image ? (
              <Upload {...props}>
                <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
              </Upload>
            ) : (
              <div className={styles['image-upload']}>
                <Image src={image} width={300} height={200} />
                <span className={styles['icon-close']} onClick={removeImage}>
                  X
                </span>
              </div>
            )}
          </Form.Item>
        </Col>
        <Col span={24}>
          <div className='my-3 flex flex-row justify-between'>
            <Button className='btn-w-120' onClick={() => router.back()}>
              Hủy
            </Button>
            <Button
              type='primary'
              className='btn-type-primary-w-120'
              htmlType='submit'
              loading={loading}
            >
              Lưu
            </Button>
          </div>
        </Col>
      </Row>
    </Form>
  );
};

export default Index;
