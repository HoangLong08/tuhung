'use client';
import { Carousel } from 'antd';
import styles from './styles.module.scss';
import { useEffect, useState } from 'react';
import { getThumbnailSlideBusinessInfo } from '@/services/businessInfo.services';
import { notification } from 'antd';
import { ImageSlideBusinessInfo } from '@/type/businessInfo';
import { imageDefaults } from '@/utils/contants';

const loadSliders = () => {
  const [thumbnailSlides, setThumbnailSlides] =
    useState<ImageSlideBusinessInfo[]>();

  const loadImageSlider = async () => {
    try {
      setThumbnailSlides(await getThumbnailSlideBusinessInfo());
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

  return thumbnailSlides?.map((item) => (
    <div className={styles['sliders-img']} key={item.id}>
      {item.image ? (
        <img src={item.image} alt='' />
      ) : (
        <img src={imageDefaults} alt='' />
      )}
    </div>
  ));
};

const index: React.FC = () => {
  return <Carousel autoplay>{loadSliders()}</Carousel>;
};

export default index;
