'use client';
import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { useRouter } from 'next/navigation';
import { ArticleService } from '@/services/article.service';
import { ArticleType } from '@/type/articles';
import moment from 'moment';

const ArticleNews = () => {
  const [articles, setArticles] = useState<ArticleType[]>();
  const router = useRouter();
  const initData = async () => {
    const res = await ArticleService.getAllArticles({ take: 2, order: 'DESC' });
    setArticles(res);
  };

  useEffect(() => {
    initData();
  }, []);

  const onClickDetail = (slug: string) => {
    router.push(`/tin-tuc/chi-tiet/${slug}`);
  };
  const onClickViewAll = () => {
    router.push(`/tin-tuc`);
  };

  return (
    <div className={styles['news-content']}>
      <div className={styles.container}>
        <h1 className={styles.title}>BẢN TIN TỨ HƯNG</h1>
        {articles ? (
          <>
            <div className={styles['news-flex']}>
              {articles?.map((item) => (
                <div
                  className={styles['wrap-content']}
                  key={item.id}
                  onClick={() => onClickDetail(item.slug || '')}
                >
                  <div className={styles['news-flex-img']}>
                    <img src={item.image} alt='' />
                    <div className={styles['box-date']}>
                      <div className={styles.day}>
                        {moment(new Date(item.createdAt)).format('DD')}
                      </div>
                      <div className={styles['month-and-year']}>
                        {moment(new Date(item.createdAt)).format('MM/yyyy')}
                      </div>
                    </div>
                  </div>
                  <p>{item.title}</p>
                </div>
              ))}
            </div>
            <button className={styles['btn-view-all']} onClick={onClickViewAll}>
              Xem tất cả
            </button>
          </>
        ) : (
          <>Hiện tại chưa có bài viết. </>
        )}
      </div>
    </div>
  );
};

export default ArticleNews;
