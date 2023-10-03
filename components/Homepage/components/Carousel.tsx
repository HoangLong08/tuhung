'use client';
import { Carousel } from 'antd';
import styles from './styles.module.scss';
import Skeleton from 'react-loading-skeleton';

type Props = {
  dataCarousel: {
    image: string;
    id: string;
  }[];
  className: string;
};

const index: React.FC<Props> = ({ className, dataCarousel }: Props) => {
  return (
    <Carousel className={className} autoplay autoplaySpeed={5500}>
      {dataCarousel.length > 0 ? (
        dataCarousel?.map((imageSlide) => (
          <img
            src={imageSlide.image}
            alt=''
            className={styles.carousel}
            key={imageSlide.id}
          />
        ))
      ) : (
        <Skeleton className={styles.carousel} />
      )}
    </Carousel>
  );
};

export default index;
