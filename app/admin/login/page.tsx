'use client';

import { LockOutlined, UserOutlined, WarningOutlined } from '@ant-design/icons';
import { Button, Card, Checkbox, Form, Input } from 'antd';
import React from 'react';
import styles from './styles.module.scss';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { loginAsync } from '@/redux/user/dispatcher';
import { useRouter } from 'next/navigation';
import { setPasswordAction } from '@/redux/user/reducer';

const LoginPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { errors } = useAppSelector((state) => state.user);

  const onFinish = (values: any) => {
    dispatch(loginAsync({ email: values.email, password: values.password }))
      .unwrap()
      .then(() => {
        dispatch(setPasswordAction(values.password));
        router.push('/admin/ve-chung-toi');
      });
  };

  return (
    <div className={styles.containerLogin}>
      <Card className={styles.card}>
        <div className={styles.title}>
          <img src='/logo/logo.png' alt='' />
          {/* <Typography.Title level={2}>Company Logo </Typography.Title> */}
        </div>
        {errors && errors?.length > 0 && (
          <div className={styles.errors}>
            <WarningOutlined className={styles['error-icon']} />
            <span className={styles.error}> {errors[0].errorMessage}</span>
          </div>
        )}
        <Form
          name='normal_login'
          className='login-form'
          initialValues={{ remember: true }}
          onFinish={onFinish}
          layout='vertical'
        >
          <Form.Item
            name='email'
            rules={[{ required: true, message: 'Vui lòng nhập email!' }]}
          >
            <Input
              prefix={<UserOutlined className='site-form-item-icon' />}
              placeholder='Email'
            />
          </Form.Item>

          <Form.Item
            name='password'
            rules={[{ required: true, message: 'Vui lòng nhập password!' }]}
          >
            <Input.Password
              prefix={<LockOutlined className='site-form-item-icon' />}
              type='password'
              placeholder='Mật khẩu'
            />
          </Form.Item>
          <a style={{ float: 'right' }} className='login-form-forgot' href=''>
            Quên mật khẩu
          </a>

          <Form.Item name='remember' valuePropName='checked' noStyle>
            <Checkbox>Lưu mật khẩu</Checkbox>
          </Form.Item>

          <Button
            type='primary'
            htmlType='submit'
            className='login-form-button mt-3 bg-blue-600'
            block
            size='large'
          >
            Đăng nhập
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default LoginPage;
