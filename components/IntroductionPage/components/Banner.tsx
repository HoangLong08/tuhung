import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { ImageSlideBusinessInfo } from '@/type/businessInfo';
import { getThumbnailSlideBusinessInfo } from '@/services/businessInfo.services';

const index = () => {
  const defaultBannerImg = '/img/ve-chung-toi.jpeg';
  const [thumbnailSlides, setThumbnailSlides] = useState<
    ImageSlideBusinessInfo[]
  >([]);
  const initData = async () => {
    try {
      const bannerImg = await getThumbnailSlideBusinessInfo();
      setThumbnailSlides(bannerImg);
    } catch (error) {}
  };

  useEffect(() => {
    initData();
  }, []);

  return (
    <div className={styles.banner}>
      <img
        src={
          thumbnailSlides[thumbnailSlides.length - 1]?.image ?? defaultBannerImg
        }
        alt=''
      />
    </div>
  );
};

export default index;
