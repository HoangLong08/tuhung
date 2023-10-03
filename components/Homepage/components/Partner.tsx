'use client';
import { Carousel } from 'antd';
import styles from './styles.module.scss';
import { useState, useEffect } from 'react';
import { getAllPartnerBusinessInfo } from '@/services/businessInfo.services';
import { PartnerType } from '@/type/businessInfo';

const index = () => {
  const [partners, setPartners] = useState<PartnerType[]>([]);
  const initData = async () => {
    setPartners(await getAllPartnerBusinessInfo());
  };

  useEffect(() => {
    initData();
  }, []);

  return (
    <>
      <div className={styles['partner-title-styled']}>
        <h1>ĐỐI TÁC</h1>
      </div>
      {partners.length < 5 ? (
        <div className={styles['partner-content']}>
          {partners.map((partner) => (
            <img src={partner.image} alt='' key={partner.id} />
          ))}
        </div>
      ) : (
        <Carousel
          autoplay={partners.length > 4}
          slidesToShow={4}
          slidesToScroll={1}
          autoplaySpeed={2000}
        >
          {partners.map((partner) => (
            <div key={partner.id} className={styles['partner-content']}>
              <img src={partner.image} alt='' />
            </div>
          ))}
        </Carousel>
      )}
    </>
  );
};

export default index;
