'use client';
import React from 'react';
import styles from './styles.module.scss';
import { Typography } from 'antd';
import Products from '../../components/Homepage/components/Products';

const { Title } = Typography;

const ProductForUser = () => {
  return (
    <div className={styles.container}>
      <div className={styles.image}>
        <img src={'/img/bannerthep.png'} alt='' />
      </div>
      <div className={styles['content-container']}>
        <div className={styles.content}>
          <div className={styles['wrap-text']}>
            <Title className={styles.title}>
            </Title>
            <Title level={5} className={styles.description}>
            </Title>
          </div>
        </div>
        <Products />
      </div>
      <div style={{ margin: '30px 0' }}></div>
    </div>
  );
};

export default ProductForUser;
