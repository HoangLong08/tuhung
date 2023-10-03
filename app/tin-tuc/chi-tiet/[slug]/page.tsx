'use client';
import { ArticleType } from '@/type/articles';
import { ArticleService } from '@/services/article.service';
import { Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { useParams } from 'next/navigation';
import csx from 'classnames';

const { Title } = Typography;

const ArticleDetail = () => {
  const [articleDetail, setArticleDetail] = useState<ArticleType>();
  const params = useParams();
  const loadDataAsync = async () => {
    setArticleDetail(
      await ArticleService.getArticlesBySlug(params.slug as string)
    );
  };

  useEffect(() => {
    loadDataAsync();
  }, [params.slug]);
  return (
    <div className={styles.container}>
      <div className={styles.imageBanner}>
        <img src={articleDetail?.image} alt='' />
      </div>
      <div className={styles.wrapContent}>
        <Title level={2} className={styles.title}>
          {articleDetail?.title}
        </Title>
        <Title level={5} className={styles.description}>
          {articleDetail?.description}
        </Title>
        <div
          className={csx(
            styles.content,
            'sun-editor-editable sun-editor-editable-override'
          )}
          dangerouslySetInnerHTML={{ __html: articleDetail?.content ?? '' }}
        ></div>
      </div>
    </div>
  );
};

export default ArticleDetail;
