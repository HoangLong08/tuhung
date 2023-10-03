'use client';

import { useAppDispatch } from '@/redux/hooks';
import { upload, uploadImage } from '@/redux/upload/dispatcher';
import { getBusinessInfoContact } from '@/services';
import { ContactService } from '@/services/contact.service';
import { TypeValuesBusinessInfo } from '@/type/businessInfo';
import { ContactType } from '@/type/contacts';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Row,
  Typography,
  Upload,
  notification,
} from 'antd';
import { RcFile, UploadProps } from 'antd/es/upload';
import csx from 'classnames';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import styles from './styles.module.scss';
import { deleteUploadFile } from '@/services/upload.services';
import '@/styles/util.scss';
import { useSearchParams } from 'next/navigation';

const { Title } = Typography;
const Contact = () => {
  const [form] = Form.useForm();
  const [businessInfoContact, setBusinessInfoContact] =
    useState<TypeValuesBusinessInfo[]>();
  const defaultAddress =
    businessInfoContact &&
    businessInfoContact[0]?.address?.replaceAll(' ', '+');
  const [location, setLocation] = useState(defaultAddress);
  const [image, setImage] = useState<string>();
  const [file, setFile] = useState({
    name: '',
    url: '',
  });
  const dispatch = useAppDispatch();
  const params = useSearchParams();
  const scrollToRef = useRef<HTMLDivElement | null>(null);
  const loadDataAsync = async () => {
    try {
      const res = await getBusinessInfoContact();
      setBusinessInfoContact(res);
      setLocation(res[0].address || '');
    } catch (e) {
      notification.error({
        message: 'Thông báo',
        description: 'Đã có lỗi xảy ra, vui lòng kiểm tra lại',
      });
    }
  };
  const paramAddressId = params?.get('id');

  const linkToMap = () => {
    const filterAddressById = businessInfoContact?.find((item) => {
      return item.id === paramAddressId;
    });
    setLocation(
      filterAddressById
        ? filterAddressById?.address?.replaceAll(' ', '+')
        : defaultAddress
    );
  };

  useEffect(() => {
    if (businessInfoContact?.length) {
      linkToMap();
      if (paramAddressId) {
        scrollToRef?.current?.scrollIntoView({
          block: 'start',
          behavior: 'smooth',
        });
      }
    }
  }, [businessInfoContact?.length, paramAddressId]);

  useEffect(() => {
    loadDataAsync();
  }, []);

  const onFinish = async (values: ContactType) => {
    if (image && file.name) {
      notification.error({
        message: `Thông báo!`,
        description: `Chỉ được chọn 1 file hoặc ảnh.`,
      });
      return;
    }
    try {
      await ContactService.sendContact({
        fullname: values.fullname,
        content: values.content,
        email: values.email,
        phoneNumber: values.phoneNumber,
        file: file.url || image,
      });
      notification.success({
        message: `Thông báo!`,
        description: `Gửi thành công.`,
      });
      form.resetFields();
      removeImage();
    } catch (err) {
      notification.error({
        message: `Thông báo!`,
        description: `Gửi thất bại.`,
      });
    }
  };

  //smooth behaviour scroll
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    const hrefScroll = e.currentTarget.href;
    const targetIdScroll = hrefScroll.replace(/.*\#/, '');
    const elemScroll = document.getElementById(targetIdScroll);
    elemScroll?.scrollIntoView({
      behavior: 'smooth',
    });
  };
  const removeImage = async () => {
    if (image) {
      await deleteUploadFile(image || '');
    }
    if (file.url) {
      await deleteUploadFile(file.url);
    }
    setImage('');
    setFile({ name: '', url: '' });
  };
  const props: UploadProps = {
    customRequest({ file }) {
      const { type, size } = file as RcFile;
      if (type === 'image/png') {
        dispatch(
          uploadImage({
            value: file as File,
            callback: (res) => {
              setImage(res?.result || '');
            },
          })
        );
      } else {
        dispatch(
          upload({
            value: file as File,
            callback: (res) => {
              setFile({
                name: res?.originalname || '',
                url: res?.result || '',
              });
            },
          })
        );
      }
    },
    showUploadList: false,
    fileList: [],
  };

  return (
    <div className={styles.container}>
      <div className={styles.image}>
        <img src={'/img/hoasen.png'} alt='' />
      </div>
      <div className={styles['wrap-contact']}>
        <div className='grid gap-4 xs:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 '>
          <div className=''>
            <div className={csx(styles['form-contact'], 'col-span-1')}>
              <div className={styles.title}>
                <Title level={3}>Liên hệ</Title>
                <p>
                  Để lại thông tin để chúng tôi tư vấn bạn một cách tốt nhất
                </p>
              </div>
              <Form
                form={form}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 24 }}
                layout='vertical'
                onFinish={onFinish}
              >
                <Form.Item label='Họ tên' name='fullname' labelAlign='left'>
                  <Input />
                </Form.Item>
                <Form.Item label='Email' name='email' labelAlign='left'>
                  <Input type='email' />
                </Form.Item>
                <Form.Item
                  label='Số điện thoại'
                  name='phoneNumber'
                  labelAlign='left'
                  labelCol={{ span: 12, offset: 12 }}
                >
                  <Input />
                </Form.Item>
                <Form.Item label='Nội dung' name='content' labelAlign='left'>
                  <Input.TextArea rows={4} />
                </Form.Item>
                <Row className={styles['row']}>
                  <Col className={styles['left']}>
                    <Form.Item
                      label='File tài liệu (nếu có)'
                      name='file'
                      // getValueFromEvent={normFile}
                      labelAlign='left'
                      labelCol={{ sm: 100, xs: 200 }}
                    >
                      <div className={styles['upload-container']}>
                        <Upload
                          {...props}
                          listType='picture-card'
                          className='over-upload'
                        >
                          <div>
                            <PlusOutlined />
                            <div className={styles['upload-text']}>
                              Kéo hoặc thả tập tin vào đây.
                            </div>
                          </div>
                        </Upload>
                      </div>
                    </Form.Item>
                  </Col>
                  <Col className={styles['right']}>
                    <div className={styles.submit}>
                      <Button
                        htmlType='submit'
                        type='primary'
                        className={csx(
                          styles['btn-contact'],
                          'btn-type-primary'
                        )}
                      >
                        Gửi
                      </Button>
                    </div>
                  </Col>
                </Row>

                {image && <div className={styles['image-upload']}></div>}
                {(file.name || image) && (
                  <p>
                    {file.name}{' '}
                    <span
                      className={styles['icon-close']}
                      onClick={removeImage}
                    >
                      <DeleteOutlined />
                    </span>
                  </p>
                )}
              </Form>
            </div>
          </div>
          <div className={['col-span-1', styles['info-contact']].join(' ')}>
            <div className={styles.title}>Thông tin liên hệ</div>
            <div className={styles['contact-content']}>
              {businessInfoContact?.length &&
                businessInfoContact.map((business) => (
                  <Link
                    key={business.id}
                    onClick={handleScroll}
                    href='#map-section'
                  >
                    <Card
                      className={styles.card}
                      bodyStyle={{ padding: '10px 20px' }}
                      hoverable
                      onClick={() => {
                        setLocation(
                          business.address?.replaceAll(' ', '+') ?? ''
                        );
                      }}
                    >
                      <p className={styles['location-primary']}>
                        {business.name}
                      </p>
                      <p>
                        <img
                          src='/icons/location.svg'
                          alt=''
                          className={styles.icon}
                        />
                        Add: {business.address}
                      </p>
                      {business.phone && (
                        <p>
                          <img
                            src='/icons/phone.svg'
                            alt=''
                            className={styles.icon}
                          />
                          Tel: {business.phone}
                        </p>
                      )}

                      {business.fax && (
                        <p>
                          <img
                            src='/icons/fax.svg'
                            alt=''
                            className={styles.icon}
                          />
                          Fax: {business.fax}
                        </p>
                      )}

                      {business.email && (
                        <p>
                          <img
                            src='/icons/email.svg'
                            alt=''
                            className={styles.icon}
                          />
                          Email: {business.email}
                        </p>
                      )}
                    </Card>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </div>
      <div ref={scrollToRef} id='map-section' className={styles['wrap-map']}>
        <iframe
          width='100%'
          height='400'
          allowFullScreen
          referrerPolicy={'no-referrer-when-downgrade'}
          src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyDaOulQACiJzBfqumbsqg_-vKha8fCnL-s&q=${location}`}
        ></iframe>
      </div>
    </div>
  );
};

export default Contact;
