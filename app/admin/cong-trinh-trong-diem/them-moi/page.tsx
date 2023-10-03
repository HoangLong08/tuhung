'use client';

import Quill from '@/components/Quill';
import { useAppDispatch } from '@/redux/hooks';
import { uploadImage } from '@/redux/upload/dispatcher';
import { ConstructionType } from '@/type/construction';
import { RULES } from '@/utils/rules';
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
import { isEmpty, last } from 'lodash';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import storeConstruction from '../store';
import styles from '../styles.module.scss';
import { deleteUploadFile } from '@/services/upload.services';
import '@/styles/util.scss';

const Index = () => {
  const {
    detail,
    typeConstructor,
    loading,
    createConstruction,
    updateConstruction,
    getDetailConstruction,
    getTypeConstructor,
  } = storeConstruction();
  const [image, setImage] = useState<string>('');
  const params = useParams();
  const [formRef] = Form.useForm();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [contentSunEditor, setContentSunEditor] = useState('');

  useEffect(() => {
    if (params.slug && isEmpty(detail)) {
      getDetailConstruction(params?.slug as string);
    }
  }, [params.slug]);

  useEffect(() => {
    if (!isEmpty(detail)) {
      formRef.setFieldsValue({
        ...detail,
        typeId: detail.type?.id,
      });
      setContentSunEditor(detail.content || '');
      setImage(detail.image || '');
      formRef.setFieldValue('content', detail.content);
    } else {
      formRef.setFieldValue('content', '');
    }
  }, [detail]);

  useEffect(() => {
    getTypeConstructor();
  }, []);

  const handleEditorChange = (newContent: string) => {
    // Update the state with the new content
    setContentSunEditor(newContent);
    if (newContent === '<p><br></p>') {
      formRef.setFieldValue('content', '');
    } else {
      formRef.setFieldValue('content', newContent);
    }
  };

  const onFinish = (values: ConstructionType) => {
    if (!image) {
      formRef.setFields([
        {
          name: 'image',
          errors: ['Vui lòng không được để trống trường này'],
        },
      ]);
    }
    if (contentSunEditor === '<p><br></p>') {
      formRef.setFields([
        {
          name: 'content',
          errors: ['Vui lòng không được để trống trường này'],
        },
      ]);
      return;
    }

    if (params.slug) {
      updateConstruction(
        {
          payload: {
            title: values.title,
            image,
            description: values.description,
            content: contentSunEditor,
          },
          callback: (value) => {
            if (value) {
              router.back();
            }
          },
        },
        detail?.id as string
      );
    } else {
      createConstruction({
        payload: {
          title: values.title,
          image,
          description: values.description,
          content: contentSunEditor,
          typeId: values.typeId,
        },
        callback: (value) => {
          if (value) {
            router.back();
          }
        },
      });
    }
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

  return (
    <div className='pr-3 pt-5'>
      <Form layout='vertical' form={formRef} onFinish={onFinish}>
        <Row>
          <Col span={24}>
            <Typography.Title level={2}>
              {params.slug ? 'CHỈNH SỬA' : 'THÊM MỚI'}
            </Typography.Title>
          </Col>
          <Col span={24}>
            <Form.Item
              name='typeId'
              label='Loại công trình'
              rules={[RULES.EMPTY]}
            >
              <Select
                options={typeConstructor.map((item) => ({
                  value: item.id,
                  label: item.title,
                }))}
                disabled={!!params.slug}
                placeholder='Chọn loại công trình'
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item name='title' label='Tiêu đề' rules={[RULES.EMPTY]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item name='description' label='Mô tả' rules={[RULES.EMPTY]}>
              <Input.TextArea />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label='Hình ảnh' name='image' rules={[RULES.EMPTY]}>
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
            <Form.Item name='content' label='Nội dung' rules={[RULES.EMPTY]}>
              <Quill
                contentEditor={contentSunEditor ?? ''}
                onChangeContentEditor={handleEditorChange}
              />
            </Form.Item>
          </Col>
          <Col span={24} className='mt-3'>
            <div className='flex flex-row justify-between'>
              <Button onClick={() => router.back()} className='btn-w-120'>
                Hủy
              </Button>
              <Button
                type='primary'
                htmlType='submit'
                loading={loading}
                className='btn-type-primary-w-120'
              >
                Lưu
              </Button>
            </div>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default Index;
