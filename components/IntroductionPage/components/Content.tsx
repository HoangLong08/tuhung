'use client';
import { BusinessIntro } from '@/redux/intro/type';
import React, { FC, useMemo } from 'react';
import Introduction from './Introduction';
import styles from './styles.module.scss';
import csx from 'classnames';
interface Props {
  currentSlug: string;
  content: BusinessIntro[];
}
const Content: FC<Props> = ({ content, currentSlug }) => {
  const contentMap = content.find((item) => item.slug === currentSlug);

  return (
    <div className={styles.container}>
      {currentSlug.toLowerCase().includes('gioi-thieu') ? (
        <Introduction introducer={contentMap!} />
      ) : (
        <div className={styles['wrap-content']}>
          <div
            className='sun-editor-editable sun-editor-editable-override'
            dangerouslySetInnerHTML={{
              __html: contentMap?.content ?? '',
            }}
          ></div>
        </div>
      )}
    </div>
  );
};

export default React.memo(Content);
