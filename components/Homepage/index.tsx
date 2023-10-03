'use client';

import Carousel from './components/Carousel';
import Introduction from './components/Introduction';
import Products from './components/Products';
import Building from './components/Construction';
import News from './components/News';
import Partner from './components/Partner';

import { ImageSlideBusinessInfo } from '@/type/businessInfo';
import { useEffect, useState } from 'react';
import { notification } from 'antd';
import { getImageSlideBusinessInfo } from '@/services/businessInfo.services';
import styles from './styles.module.scss';

const index = () => {
  const [imageSlides, setImageSlides] = useState<ImageSlideBusinessInfo[]>([]);

  const loadImageSlider = async () => {
    try {
      setImageSlides(await getImageSlideBusinessInfo());
    } catch (error) {
      notification.error({
        message: 'Thông báo',
        description: 'Lỗi',
      });
    }
  };

  useEffect(() => {
    loadImageSlider();
  }, []);

  return (
    <>
      <div className={styles['wrapper-carousel-home']}>
        <Carousel
          className={styles['banner-home']}
          dataCarousel={imageSlides}
        />
        <div className={styles['carousel-title-caption']}></div>
        <p className={styles['carousel-title-banner']}>
          Thép cùng những <br />
          công trình chất lượng
        </p>
      </div>
      <div className={styles.container}>
        <div className={styles['block--start']}></div>
        <Introduction />
        <Products />
        <Building />
        <News />
      </div>
      <Partner />
    </>
  );
};

export default index;
