'use client';
import React, { FC, useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { getBusinessInfo } from '@/services/businessInfo.services';
import { TypeValuesBusinessInfo } from '@/type/businessInfo';
import { BusinessIntro } from '@/redux/intro/type';

interface Props {
  introducer: BusinessIntro;
}
const index: FC<Props> = ({ introducer }) => {
  const [businessInfo, setBusinessInfo] = useState<TypeValuesBusinessInfo>();

  useEffect(() => {
    const loadDataAsync = async () => {
      try {
        const businessInfoData = await getBusinessInfo();
        setBusinessInfo(businessInfoData);
      } catch (error) {}
    };

    if (!businessInfo) {
      loadDataAsync();
    }
  }, []);

  const regex = /v=([A-Za-z0-9_-]+)/;
  const match =
    businessInfo?.youtubeUrl && businessInfo?.youtubeUrl.match(regex);
  let videoId = '';
  if (match) {
    videoId = match[1];
  }

  return (
    <div className={styles.intro}>
      <div className={styles['intro-top']}>
        <div className={styles['intro-img']}>
          {videoId && (
            <iframe
              allow={'autoplay; encrypted-media'}
              title='video'
              src={`https://www.youtube.com/embed/${videoId} `}
            />
          )}
        </div>
      </div>
      <div className={styles['intro-bottom']}>
        <div
          className='sun-editor-editable sun-editor-editable-override'
          dangerouslySetInnerHTML={{ __html: introducer?.content ?? '' }}
        ></div>
      </div>
    </div>
  );
};

export default index;
