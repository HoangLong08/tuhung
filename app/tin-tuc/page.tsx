'use client';
import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { Divider, Typography, Card, Image } from 'antd';
import { ArticleType } from '@/type/articles';
import { useRouter } from 'next/navigation';
import { ArticleService } from '@/services/article.service';
import moment from 'moment';

const { Title } = Typography;
const { Meta } = Card;

const NewsPage = () => {
  const [articles, setArticle] = useState<ArticleType[]>([]);
  const router = useRouter();
  const loadDataAsync = async () => {
    setArticle(await ArticleService.getAllArticles());
  };

  useEffect(() => {
    loadDataAsync();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.image}>
        <img
          src='/img/bannerthep.png'
          alt=''
        />
      </div>
      <div className={styles.content}>
        <Title level={2} className={styles.title}>
          Tin tức
        </Title>
        <div className={styles.row}>
          {articles.map((article) => (
            <div key={article.id} className={styles['row-wrap']}>
              <Card
                onClick={() =>
                  router.push(`/tin-tuc/chi-tiet/${article.slug} `)
                }
                bordered={false}
                hoverable
                className={styles.card}
                cover={
                  <>
                    <img src={article.image} className={styles.image} />
                    <div className={styles['box-date']}>
                      <div className={styles.day}>
                        {moment(new Date(article.createdAt)).format('DD')}
                      </div>
                      <div className={styles['month-and-year']}>
                        {moment(new Date(article.createdAt)).format('MM/yyyy')}
                      </div>
                    </div>
                  </>
                }
              >
                <Meta title={article.title} description={article.description} />
              </Card>
            </div>
          ))}
        </div>
      </div>

      <Divider />
      <div style={{ margin: '30px 0' }}></div>
    </div>
  );
};

export default NewsPage;
