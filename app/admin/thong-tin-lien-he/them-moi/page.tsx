'use client';

import { TypeBusinessInfoAddress } from '@/type/businessInfoAddress';
import { RULES } from '@/utils/rules';
import { Button, Col, Form, Input, Row, Typography } from 'antd';
import { isEmpty } from 'lodash';
import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import storeBusinessInfoAddress from '../store';
import '@/styles/util.scss';

const Index = () => {
  const {
    loading,
    createBusinessInfoAddress,
    updateBusinessInfoAddress,
    detailsBusinessInfoAddress,
    details,
  } = storeBusinessInfoAddress();
  const [formRef] = Form.useForm();
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    if (params.id && isEmpty(details)) {
      detailsBusinessInfoAddress(params.id as string);
    }
  }, [params.id]);

  useEffect(() => {
    if (!isEmpty(details)) {
      formRef.setFieldsValue({
        ...details,
      });
    }
  }, [details]);

  const onFinish = async (values: TypeBusinessInfoAddress) => {
    if (!params.id) {
      createBusinessInfoAddress({
        payload: values,
        callback: (value) => {
          if (value) {
            router.back();
          }
        },
      });
    } else {
      updateBusinessInfoAddress(
        {
          payload: values,
          callback: (value) => {
            if (value) {
              router.back();
            }
          },
        },
        params.id as string
      );
    }
  };

  return (
    <Form layout='vertical' onFinish={onFinish} form={formRef}>
      <Row gutter={10}>
        <Col span={24} className='mb-3'>
          <Typography.Title level={2}>
            Tạo thông tin văn phòng chính/chi nhánh
          </Typography.Title>
        </Col>
        <Col span={12}>
          <Form.Item
            name='name'
            label='Tên văn phòng chính/ chi nhánh'
            rules={[RULES.EMPTY]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name='address' label='Địa chỉ' rules={[RULES.EMPTY]}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name='phone' label='Số điện thoại' rules={[RULES.EMPTY]}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name='email' label='Email' rules={[RULES.EMPTY]}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name='fax' label='Fax'>
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name='description' label='Mô tả'>
            <Input.TextArea rows={4} />
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item name='googleMap' label='Google map' rules={[RULES.EMPTY]}>
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Col span={24}>
        <div className='my-3 flex flex-row justify-between'>
          <Button className='btn-w-120' onClick={() => router.back()}>Hủy</Button>
          <Button
            type='primary'
            loading={loading}
            htmlType='submit'
            className='btn-type-primary-w-120'
          >
            Lưu
          </Button>
        </div>
      </Col>
    </Form>
  );
};

export default Index;
