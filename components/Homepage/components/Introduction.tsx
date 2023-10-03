'use client';
import { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import {
  getBusinessInfo,
  getThumbnailSlideBusinessInfo,
} from '@/services/businessInfo.services';
import {
  ImageSlideBusinessInfo,
  TypeValuesBusinessInfo,
} from '@/type/businessInfo';
import CountUp from 'react-countup';
import { Col, Row } from 'antd';
import Carousel from './Carousel';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const Introduction = () => {
  const [businessInfos, setBusinessInfo] = useState<TypeValuesBusinessInfo>();
  const [thumbnailSlides, setThumbnailSlides] = useState<
    ImageSlideBusinessInfo[]
  >([]);
  const loadDataAsync = async () => {
    const [businessInfoData, thumbnailSlideData] = await Promise.all([
      getBusinessInfo(),
      getThumbnailSlideBusinessInfo(),
    ]);
    setBusinessInfo(businessInfoData);
    setThumbnailSlides(thumbnailSlideData);
  };

  useEffect(() => {
    loadDataAsync();
  }, []);

  return (
    <>
      <Row gutter={[32, 10]}>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <div className={styles['wrapper-carousel-thumbnail']}>
            <Carousel className='' dataCarousel={thumbnailSlides} />
          </div>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <div className={styles['intro-exp']}>
            <div className={styles['intro-top']}>
              <h2 className={styles['intro-num-exp']}>
                {businessInfos?.yearExperience ? (
                  <CountUp
                    end={Number(businessInfos?.yearExperience)}
                    delay={0}
                    duration={3}
                    redraw={true}
                  >
                    {({ countUpRef, start }) => {
                      return (
                        <>
                          <span ref={countUpRef} />
                          <span>+</span>
                        </>
                      );
                    }}
                  </CountUp>
                ) : (
                  <Skeleton height={64} width={54} />
                )}
              </h2>
              <p className={styles['intro-content']}>NĂM KINH NGHIỆM</p>
            </div>
            <div className={styles['intro-bottom']}>
              {businessInfos?.intro ? (
                <h1>{businessInfos?.intro}</h1>
              ) : (
                <Skeleton height={12} style={{ marginTop: '24px' }} count={5} />
              )}
              <p className={styles['reduce-text']}>{businessInfos?.service}</p>
            </div>

            <a
              className={styles['btn-view']}
              href='/ve-chung-toi/gioi-thieu-chung'
            >
              xem thêm
            </a>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default Introduction;
