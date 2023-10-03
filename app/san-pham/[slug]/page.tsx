'use client';
import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { Image, Typography, notification } from 'antd';
import ProductService from '@/services/product.service';
import { CategoryProduct } from '@/redux/product/type';
import { Divider } from 'antd';
import { useParams, useRouter } from 'next/navigation';
import csx from 'classnames';

const { Title } = Typography;

const ProductDetailByCategory = () => {
  const [productDetail, setProductDetail] = useState<CategoryProduct>();
  const params = useParams();
  const router = useRouter();
  const loadDataAsync = async () => {
    try {
      setProductDetail(
        await ProductService.getProductByCategorySlug(params.slug as string)
      );
    } catch (e) {
      notification.error({
        message: 'Thông báo',
        description: 'Hiện chưa có sản phẩm nào cho loại này.',
      });
    }
  };

  useEffect(() => {
    loadDataAsync();
  }, [params.slug]);
  return (
    <div className={styles.container}>
      <div className={styles.image}>
        <img src={'/img/bannerthep.png'} alt='' />
      </div>
      <div className={styles['content-container']}>
        <div className={styles.content}>
          <div className={styles['wrap-text']}>
            <Title className={styles.title}>{productDetail?.title}</Title>
            <Title level={5} className={styles.description}>
              {productDetail?.description}
            </Title>
          </div>
        </div>
        <Divider className={styles['divider-disabled']} />
        {productDetail?.products.map((product) => (
          <div
            className='grid xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-2'
            key={product.id}
          >
            <div className='col-span-1'>
              <div className={styles['wrap-image']}>
                <Image src={product.image} alt='' />
              </div>
            </div>
            <div
              onClick={() => router.push(`/san-pham/chi-tiet/${product.slug}`)}
              className={csx(styles['product-content'], 'col-span-1')}
            >
              <Title className={styles['product-name']} level={2}>
                {product?.name}
              </Title>
              <div
                className={csx(
                  styles['product-text'],
                  'sun-editor-editable sun-editor-editable-override'
                )}
                dangerouslySetInnerHTML={{ __html: product.content ?? '' }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductDetailByCategory;
