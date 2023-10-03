'use client';

import {
  Button,
  Col,
  Form,
  Image,
  Input,
  Row,
  Typography,
  Upload,
  message,
} from 'antd';
import { useEffect, useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { isEmpty, last } from 'lodash';
import type { RcFile, UploadProps } from 'antd/es/upload';
import { useAppDispatch } from '@/redux/hooks';
import { uploadImage } from '@/redux/upload/dispatcher';
import { TypeValuesBusinessInfo } from '@/type/businessInfo';
import { RULES } from '@/utils/rules';
import Quill from '@/components/Quill';
import styles from './styles.module.scss';
import storeBusinessInfo from './store';
import { deleteUploadFile } from '@/services/upload.services';
import '@/styles/util.scss';

const Index = () => {
  const {
    getBusinessInfo,
    createBusinessInfo,
    updateBusinessInfo,
    loading,
    data,
  } = storeBusinessInfo();
  const [logo, setLogo] = useState<string>('');
  const [formRef] = Form.useForm();
  const dispatch = useAppDispatch();
  const [contentSunEditor, setContentSunEditor] = useState('');
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
                setLogo(res?.result || '');
              },
            })
          );
        }
      }
    },
    showUploadList: false,
    fileList: [],
  };

  useEffect(() => {
    handleEditorChange(data?.content ?? '');
  }, [data]);

  const onFinish = async (values: TypeValuesBusinessInfo) => {
    if (isEmpty(data)) {
      await createBusinessInfo({
        payload: { ...values, logo: logo, content: contentSunEditor },
        callback: async (value) => {
          if (value) {
            await getBusinessInfo();
          }
        },
      });
    } else {
      await updateBusinessInfo(
        { ...values, logo: logo, content: contentSunEditor },
        data?.id || ''
      );
    }
  };

  useEffect(() => {
    if (data) {
      formRef.setFieldsValue(data);
      setLogo(data?.logo || '');
    }
  }, [data]);

  const removeImage = async () => {
    await deleteUploadFile(logo || '');
    setLogo('');
  };

  const handleEditorChange = (newContent: string) => {
    // Update the state with the new content
    setContentSunEditor(newContent);
  };

  return (
    <Form layout='vertical' onFinish={onFinish} form={formRef}>
      <Row className='mt-5' gutter={20}>
        <Col span={24}>
          <Typography.Title level={2}> Thông tin công ty</Typography.Title>
        </Col>
        <Col span={12}>
          <Form.Item
            label='Tên công ty'
            name='businessName'
            rules={[RULES.EMPTY]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item rules={[RULES.EMPTY]} label='Số điện thoại' name='phone'>
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item rules={[RULES.EMPTY]} label='Email' name='email'>
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            rules={[RULES.EMPTY]}
            label='Giờ làm việc'
            name='timeWorking'
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            rules={[RULES.EMPTY]}
            label='Năm kinh nghiệm'
            name='yearExperience'
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item rules={[RULES.EMPTY]} label='Tiêu đề' name='intro'>
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item rules={[RULES.EMPTY]} name='service' label='Mô tả'>
            <Input.TextArea rows={5} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            rules={[RULES.EMPTY]}
            name='youtubeUrl'
            label='Link youtube'
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label='Logo' name='logo'>
            {!logo ? (
              <Upload {...props}>
                <Button icon={<UploadOutlined />}>Chọn logo</Button>
              </Upload>
            ) : (
              <div className={styles['image-upload']}>
                <Image src={logo} width={100} height={100} />
                <span className={styles['icon-close']} onClick={removeImage}>
                  X
                </span>
              </div>
            )}
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item rules={[RULES.EMPTY]} label='Bài viết' name='content'>
            <Quill
              contentEditor={contentSunEditor ?? ''}
              onChangeContentEditor={handleEditorChange}
            />
          </Form.Item>
        </Col>
        <Col span={24}>
          <div className='my-3 flex justify-between'>
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
  );
};

export default Index;
