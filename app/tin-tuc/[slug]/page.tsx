'use client';
import { ArticleService } from '@/services/article.service';
import { DirectoryType } from '@/type/articles';
import { Card, Divider } from 'antd';
import moment from 'moment';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from './styles.module.scss';

const { Meta } = Card;

const ArticleDetailPage = () => {
  const [article, setArticle] = useState<DirectoryType>();
  const params = useParams();
  const router = useRouter();

  const loadDataAsync = async () => {
    const res = await ArticleService.getArticlesByDirectorySlug(
      params.slug as string
    );

    setArticle(res);
  };

  useEffect(() => {
    loadDataAsync();
  }, [params.slug]);

  return (
    <div className={styles.container}>
      <div className={styles.image}>
        <img src={'/img/bannerthep.png'} alt='' />
      </div>
      <Divider />
      <h1 className={styles.topic}>{article?.title || ''}</h1>
      <div className={styles.content}>
        {article ? (
          <div className={styles['wrap-flex']}>
            {article?.articles?.map((art) => (
              <div key={art.id} className={styles['wrap-card']}>
                <Card
                  bordered={false}
                  hoverable
                  className={styles.card}
                  onClick={() => router.push(`/tin-tuc/chi-tiet/${art.slug}`)}
                  cover={
                    <>
                      <img className={styles.img} src={art.image} alt='' />
                      <div className={styles['box-date']}>
                        <div className={styles.day}>
                          {moment(new Date(art.createdAt)).format('DD')}
                        </div>
                        <div className={styles['month-and-year']}>
                          {moment(new Date(art.createdAt)).format('MM/yyyy')}
                        </div>
                      </div>
                    </>
                  }
                >
                  <Meta
                    className={styles.article}
                    title={art.title}
                    description={
                      art.description.length > 120
                        ? art.description.substring(0, 120) + '...'
                        : art.description
                    }
                  />
                </Card>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center' }}>
            <i>Hiện tại chưa có bài viết.</i>
          </div>
        )}
      </div>
      <Divider />
    </div>
  );
};

export default ArticleDetailPage;
