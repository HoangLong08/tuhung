'use client';

import { useAppDispatch } from '@/redux/hooks';
import { uploadImage } from '@/redux/upload/dispatcher';
import { UploadOutlined } from '@ant-design/icons';
import {
  Button,
  Col,
  Form,
  Image,
  Input,
  Row,
  Select,
  Typography,
  Upload,
  UploadProps,
  message,
} from 'antd';
import { RcFile } from 'antd/es/upload';
import { isEmpty, last, omit } from 'lodash';
import { useParams, useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import styles from '../../Product.module.scss';
import { TypeProduct } from '@/type/product';
import storeTypeProduct from '../store';
import { RULES } from '@/utils/rules';
import Quill from '@/components/Quill';
import { deleteUploadFile } from '@/services/upload.services';
import '@/styles/util.scss';

const Index = () => {
  const {
    details,
    loading,
    createProduct,
    updateProduct,
    getDetailProduct,
    getCategory,
    categories,
  } = storeTypeProduct();
  const params = useParams();
  const router = useRouter();
  const [formRef] = Form.useForm();
  const [image, setImage] = useState('');
  const dispatch = useAppDispatch();
  const [contentSunEditor, setContentSunEditor] = useState('');

  useEffect(() => {
    if (isEmpty(details) && params.slug) {
      getDetailProduct(params.slug as string);
    }
  }, [params.slug]);

  useEffect(() => {
    if (!isEmpty(details)) {
      formRef.setFieldsValue({
        ...details,
        categoryId: details.category?.id,
      });
      formRef.setFieldValue('unit', '');
      formRef.setFieldValue('price', '');
      setImage(`${details.image}`);
      setContentSunEditor(details.content as string);
      formRef.setFieldValue('content', details.content);
    } else {
      formRef.setFieldValue('content', '');
    }
  }, [details, formRef]);

  useEffect(() => {
    getCategory();
  }, []);

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

  const handleEditorChange = (newContent: string) => {
    // Update the state with the new content
    setContentSunEditor(newContent);
    if (newContent === '<p><br></p>') {
      formRef.setFieldValue('content', '');
    } else {
      formRef.setFieldValue('content', newContent);
    }
  };

  const onFinishCallback = useCallback(
    (values: TypeProduct) => {
      switch (true) {
        case !image:
          formRef.setFields([
            {
              name: 'image',
              errors: ['Vui lòng không để trống trường này'],
            },
          ]);
          break;
        case contentSunEditor === '<p><br></p>':
          formRef.setFields([
            {
              name: 'content',
              errors: ['Vui lòng không để trống trường này'],
            },
          ]);
          break;
        case !!params.slug:
          updateProduct({
            payload: {
              ...omit(
                { ...values, content: contentSunEditor },
                'image',
                'categoryId'
              ),
              image,
              id: details?.id as string,
            },
            callback: (value) => {
              if (value) {
                router.back();
              }
            },
          });
          break;

        default:
          createProduct({
            payload: {
              ...omit({ ...values, content: contentSunEditor }, 'image'),
              image,
            },
            callback: (value) => {
              if (value) {
                router.back();
              }
            },
          });
          break;
      }
    },
    [image, params.slug, router, createProduct, updateProduct]
  );

  const onFinish = (values: TypeProduct) => {
    onFinishCallback(values);
  };

  return (
    <Form layout='vertical' form={formRef} onFinish={onFinish}>
      <Row gutter={10}>
        <Col span={24} className='mb-3'>
          <Typography.Title level={2}>
            {params?.slug ? 'CHỈNH SỬA' : 'THÊM MỚI'}
          </Typography.Title>
        </Col>
        <Col span={12}>
          <Form.Item name='name' label='Tên sản phẩm' rules={[RULES.EMPTY]}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name='categoryId'
            label='Loại sản phẩm'
            rules={[RULES.EMPTY]}
          >
            <Select
              options={categories.map((item) => ({
                value: item.id,
                label: item.title,
              }))}
              disabled={!!params.slug}
              placeholder='Chọn loại sản phẩm'
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name='unit' label='Đơn vị'>
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name='price' label='Giá'>
            <Input />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item name='description' label='Mô tả' rules={[RULES.EMPTY]}>
            <Input.TextArea />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name='image' label='Hình ảnh' rules={[RULES.EMPTY]}>
            {!image ? (
              <Upload {...props}>
                <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
              </Upload>
            ) : (
              <div className={styles['image-upload']}>
                <Image
                  src={image}
                  width={300}
                  height={200}
                  style={{ objectFit: 'cover' }}
                />
                <span className={styles['icon-close']} onClick={removeImage}>
                  X
                </span>
              </div>
            )}
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item name='content' label='Nội dung' rules={[RULES.EMPTY]}>
            <Quill
              contentEditor={contentSunEditor ?? ''}
              onChangeContentEditor={handleEditorChange}
            />
          </Form.Item>
        </Col>
        <Col span={24} className='my-3'>
          <div className='flex flex-row justify-between'>
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
