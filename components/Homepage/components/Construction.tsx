'use client';
import { Carousel } from 'antd';
import styles from './styles.module.scss';
import { FC, useEffect, useState } from 'react';
import ConstructionService from '@/services/construction.service';
import { ConstructionType } from '@/type/construction';

interface ConstructionHotProps {
  data?: ConstructionType[];
  title?: string;
}

const ConstructionHot: FC<ConstructionHotProps> = ({ data, title }) => {
  const [constructions, setConstructions] = useState<ConstructionType[]>([]);
  const initData = async () => {
    setConstructions(
      await ConstructionService.getAllConstructions({ take: 6 })
    );
  };

  const carouselSettings = {
    dots: false,
    infinite: constructions.length > 3,
    autoplay: constructions.length > 3,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  useEffect(() => {
    !data?.length ? initData() : setConstructions(data);
  }, [data]);

  return (
    <div className={styles.container} id='cong-trinh'>
      <div className={styles.construction}>
        <h1 className={styles.title}>{title ?? 'Công trình trọng điểm'}</h1>
        <Carousel {...carouselSettings}>
          {constructions.map((item) => (
            <div className={styles['construction-content']} key={item.id}>
              <img
                src={item.image}
                className={styles['construction-img']}
                alt=''
              />
              <div className={styles['wrap-content']}>
                <p>{item.title}</p>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default ConstructionHot;
