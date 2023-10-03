import React, { useEffect, useState } from 'react';
import styles from './BubbleIcon.module.scss';
import { CaretUpOutlined } from '@ant-design/icons';
import { Button, Modal, Typography } from 'antd';

const BubbleIcon = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const phoneNumber = '0905074855';
  const fanpageUrl = 'https://www.facebook.com/theptuhung';

  const openZaloApp = (numberPhone: string) => {
    const zaloChatURL = `https://zalo.me/${numberPhone}`;
    window.open(zaloChatURL, '_blank');
  };

  const navigateToFanpage = () => {
    window.open(fanpageUrl, '_blank');
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  const handleScrollTopClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const phoneDataMock = [
    {
      id: 1,
      typeConstruction: 'Kho Quảng Ngãi',
      phoneNumber: '0987 868 913',
      owner: 'Mr.Tín',
    },
    {
      id: 2,
      typeConstruction: 'Kho Hòa Châu',
      phoneNumber: '0932 585 261',
      owner: 'Mr.Sơn',
    },
    {
      id: 3,
      typeConstruction: 'Kho Hàm Nghi',
      phoneNumber: '0905 393 257',
      owner: 'Mrs.Phi',
    },
    {
      id: 4,
      typeConstruction: 'Kho Trường Chinh',
      phoneNumber: '0347 528 925',
      owner: 'Mrs.Dung',
    },
    {
      id: 5,
      typeConstruction: 'Công trình lớn',
      phoneNumber: '0905 074 855',
      owner: 'Mrs.Diễm',
    },
    {
      id: 6,
      typeConstruction: 'Công trình lớn',
      phoneNumber: '0905 010 424',
      owner: 'Mrs.Hưng',
    },
    {
      id: 7,
      typeConstruction: 'Công trình lớn',
      phoneNumber: '0903 502 448',
      owner: 'Mr.Tứ',
    },
  ];

  const [openModalPhone, setOpenModalPhone] = useState(false);

  const loadPhoneList = () => {
    return phoneDataMock.map((item) => (
      <div
        key={item.id}
        className={styles['icon-call']}
        onClick={() => openZaloApp(item.phoneNumber.replaceAll(' ', ''))}
      >
        <div className={styles['icon-call-top']}>
          <p>{item.typeConstruction}</p>
        </div>
        <div className={styles['icon-call-bottom']}>
          <p>{item.owner}</p>
          <p>{item.phoneNumber}</p>
        </div>
      </div>
    ));
  };
  return (
    <div className={styles.container}>
      <div className={styles['box-icon']}>
        <div className={styles['icon-phone-list']}>{loadPhoneList()}</div>
        <div className={styles['icon-message']} onClick={navigateToFanpage}>
          <img src={'/img/iconMessenger.png'} className={styles.icon} />
        </div>
        <div
          className={styles['icon-zalo']}
          onClick={() => openZaloApp(phoneNumber)}
        >
          <img src={'/img/iconZalo.png'} className={styles.icon} />
        </div>
        <div
          className={styles['icon-phone']}
          onClick={() => setOpenModalPhone(true)}
        >
          <img src={'/img/iconPhone.png'} className={styles.icon} />
        </div>
        {showScrollTop && (
          <div className={styles['pull-up']}>
            <CaretUpOutlined
              className={styles.icon}
              onClick={handleScrollTopClick}
            />
          </div>
        )}
        <Modal
          open={openModalPhone}
          title={
            <Typography.Title level={3}>
              Danh sách hotline công ty
            </Typography.Title>
          }
          footer={
            <Button
              onClick={() => {
                setOpenModalPhone(false);
              }}
            >
              Đóng
            </Button>
          }
          onCancel={() => setOpenModalPhone(false)}
        >
          <div className={styles['icon-phone-list-modal']}>
            {loadPhoneList()}
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default BubbleIcon;
