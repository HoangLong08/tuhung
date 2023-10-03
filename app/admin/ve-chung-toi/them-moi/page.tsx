'use client';

import Quill from '@/components/Quill';
import { TypeBusinessIntros } from '@/type/businessIntros';
import { RULES } from '@/utils/rules';
import { Button, Col, Form, Input, Row, Typography } from 'antd';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import storeBusinessIntros from '../store';
import '@/styles/util.scss';

const Index = () => {
  const {
    details,
    detailBusinessIntros,
    updateBusinessIntros,
    createBusinessIntros,
    loading,
  } = storeBusinessIntros();
  const router = useRouter();
  const [form] = Form.useForm();
  const params = useParams();
  const [contentSunEditor, setContentSunEditor] = useState<string>('');

  useEffect(() => {
    if (params.slug) {
      detailBusinessIntros(params.slug as string);
    }
  }, [params.slug]);

  useEffect(() => {
    if (details) {
      form.setFieldsValue(details);
      setContentSunEditor(details.content || '');
      form.setFieldValue('content', details.content);
    } else {
      form.setFieldValue('content', '');
    }
  }, [details]);

  const handleEditorChange = (newContent: string) => {
    // Update the state with the new content
    setContentSunEditor(newContent);
    if (newContent === '<p><br></p>') {
      form.setFieldValue('content', '');
    } else {
      form.setFieldValue('content', newContent);
    }
  };

  const onFinish = (values: TypeBusinessIntros) => {
    if (!values.title) {
      form.setFields([
        {
          name: 'title',
          errors: ['Vui lòng không bỏ trống trường này'],
        },
      ]);
    }
    if (contentSunEditor === '<p><br></p>' || contentSunEditor === '') {
      form.setFields([
        {
          name: 'content',
          errors: ['Vui lòng không bỏ trống trường này'],
        },
      ]);
      return;
    }
    if (params?.slug) {
      updateBusinessIntros(
        {
          payload: {
            title: values.title,
            content: contentSunEditor,
          },
          callback: (value) => {
            if (value) {
              router.back();
            }
          },
        },
        details?.id as string
      );
    } else {
      createBusinessIntros({
        payload: {
          title: values.title,
          content: contentSunEditor,
        },
        callback: (value) => {
          if (value) {
            history.back();
          }
        },
      });
    }
  };

  return (
    <div className='pr-3 pt-5'>
      <Form layout='vertical' onFinish={onFinish} form={form}>
        <Row>
          <Col span={24}>
            <Typography.Title level={2}>
              {params.slug ? 'CHỈNH SỬA' : 'THÊM MỚI'}
            </Typography.Title>
          </Col>
          <Col span={24}>
            <Form.Item name='title' label='Tiêu đề' rules={[RULES.EMPTY_INPUT]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name='content'
              label='Nội dung'
              rules={[RULES.EMPTY_INPUT]}
            >
              <Quill
                contentEditor={contentSunEditor ?? ''}
                onChangeContentEditor={handleEditorChange}
              />
            </Form.Item>
          </Col>
          <Col span={24} className='my-3'>
            <div className='flex flex-row justify-between'>
              <Button className='btn-w-120' onClick={() => router.back()}>Hủy</Button>
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
