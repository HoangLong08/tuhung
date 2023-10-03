'use client';
import { ReactNode, useEffect, useState } from 'react';
import MenuLeft from './MenuLeft';
import styles from './styles.module.scss';
import { useAppDispatch } from '@/redux/hooks';
import { resetStoreAction } from '@/redux/store';
import StorageUtils from '@/utils/storage';
import {
  Button,
  Form,
  Space,
  Typography,
  Dropdown,
  Modal,
  Input,
  MenuProps,
  notification,
} from 'antd';
import { useRouter } from 'next/navigation';
import { UserOutlined } from '@ant-design/icons';
import { AuthService } from '@/services/auth.service';
import { UserInfo } from '@/redux/user/types';
import '@/styles/util.scss';

type Props = {
  children: ReactNode;
};

const Admin = ({ children }: Props) => {
  const [changePasswordVisible, setChangePasswordVisible] = useState(false);
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [api, contextHolder] = notification.useNotification();
  const [userCurrent, setUserCurrent] = useState<UserInfo>();
  const [loading, setLoading] = useState(false);

  const loadUserCurrent = async () => {
    const res = await AuthService.getUserCurrent();
    setUserCurrent(res);
  };

  const handleLogout = () => {
    StorageUtils.remove('crf_tk');
    dispatch(resetStoreAction());
    router.push('/admin/login');
  };

  const handleCancelChangePassword = () => {
    setChangePasswordVisible(false);
  };
  const items: MenuProps['items'] = [
    {
      label: (
        <div onClick={() => setChangePasswordVisible(true)}>
          Thay đổi mật khẩu
        </div>
      ),
      key: 'changePassword',
    },
    {
      label: <div onClick={handleLogout}> Đăng xuất</div>,
      key: 'logout',
    },
  ];

  const avatarButton = (
    <Dropdown menu={{ items }} trigger={['click']}>
      <div style={{ cursor: 'pointer' }}>
        <UserOutlined style={{ fontSize: '24px' }} />
      </div>
    </Dropdown>
  );

  const onFinish = async (values: {
    oldPassword: string;
    newPassword: string;
  }) => {
    try {
      setLoading(true);
      await AuthService.changePassword({
        email: userCurrent?.email as string,
        newPassword: values.newPassword,
        oldPassword: values.oldPassword,
      });
      api.success({
        message: 'Thông báo',
        description: 'Thay đổi mật khẩu thành công.',
      });
      setLoading(false);
      form.resetFields();
    } catch (error) {
      setLoading(false);
      api.error({
        message: 'Thông báo',
        description: 'Thay đổi mật khẩu thất bại.',
      });
    }
    setChangePasswordVisible(false);
  };
  useEffect(() => {
    loadUserCurrent();
  }, []);

  return (
    <div className={styles['block-admin']}>
      <MenuLeft />
      <div className={styles['right-content']}>
        <div className={styles['right-head']}>
          {contextHolder}
          <Typography.Text className={styles.username}>
            Hi {userCurrent?.firstName ?? ''},{' '}
            {userCurrent?.lastName ?? 'Admin'}
          </Typography.Text>
          <Space direction='vertical' size={16}>
            <Space wrap size={16}>
              {avatarButton as React.ReactElement}
            </Space>
          </Space>

          <Modal
            title={<p style={{ fontSize: 24 }}>Thay đổi mật khẩu</p>}
            open={changePasswordVisible}
            onCancel={handleCancelChangePassword}
            footer={
              <>
                <Button onClick={handleCancelChangePassword}>Hủy</Button>
                <Button
                  type='primary'
                  className='btn-type-primary'
                  onClick={() => form.submit()}
                  loading={loading}
                >
                  Lưu
                </Button>
              </>
            }
          >
            <Form
              form={form}
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              layout='horizontal'
              onFinish={onFinish}
            >
              <Form.Item label='Nhập mật khẩu hiện tại:' name='oldPassword'>
                <Input.Password />
              </Form.Item>
              <Form.Item
                label='Nhập mật khẩu mới:'
                name='newPassword'
                hasFeedback
              >
                <Input.Password />
              </Form.Item>
              <Form.Item
                label='Nhập lại mật khẩu:'
                name='againPassword'
                dependencies={['newPassword']}
                hasFeedback
                rules={[
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('newPassword') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('Mật khẩu không khớp!'));
                    },
                  }),
                ]}
              >
                <Input.Password />
              </Form.Item>
              <p></p>
            </Form>
          </Modal>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Admin;
