'use client';
import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { Divider, Typography } from 'antd';
import Constructions from '@/services/construction.service';
import ConstructionHot from '@/components/Homepage/components/Construction';
import {
  ConstructionType,
  ResConstructionBySlugType,
} from '@/type/construction';
import { useParams } from 'next/navigation';

const { Title } = Typography;

const ConstructionDetailPage = () => {
  const [construction, setConstruction] = useState<ResConstructionBySlugType>();
  const [constructionType, setConstructionType] =
    useState<ResConstructionBySlugType>();
  const params = useParams();

  const loadDataAsync = async () => {
    const res = await Constructions.getConstructorBySlugType(
      params.slug as string
    );
    setConstruction(res);
    setConstructionType(
      await Constructions.getConstructorTypeById(res?.id || '')
    );
  };

  useEffect(() => {
    loadDataAsync();
  }, [params.slug]);

  return (
    <div className={styles.container}>
      <div className={styles.image}>
        {construction?.constructions && (
          <img
            src={construction.constructions[0].image ?? '/img/bannerthep.png'}
            alt=''
          />
        )}
      </div>
      <div className={styles.content}>
        <div className={styles.wrapText}>
          <Title level={2} className={styles.title}>{construction?.title}</Title>
          <Title level={5} className={styles.description}>
            {construction?.description}
          </Title>
        </div>
      </div>
      <Divider />

      <ConstructionHot
        data={constructionType?.constructions}
        title='Dự án nổi bật'
      />
      <div style={{ margin: '30px 0' }}></div>
    </div>
  );
};

export default ConstructionDetailPage;
