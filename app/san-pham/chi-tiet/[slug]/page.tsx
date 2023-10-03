'use client';
import ProductService from '@/services/product.service';
import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { Divider, Image, Typography } from 'antd';
import ProductsHot from '@/components/Homepage/components/Products';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { useParams } from 'next/navigation';
import { TypeProduct } from '@/type/product';

const { Title } = Typography;

const ProductDetails = () => {
  const [productDetail, setProductDetail] = useState<TypeProduct>();
  const params = useParams();
  const loadDataAsync = async () => {
    setProductDetail(
      await ProductService.getProductBySlug(params.slug as string)
    );
  };

  useEffect(() => {
    loadDataAsync();
  }, [params.slug]);

  return (
    <>
      <div className={styles.image}>
        <img src={'/img/bannerthep.png'} alt='' />
      </div>
      <div className={styles.container}>
        <Divider />
        <div className={styles['product-detail']}>
          <div className={styles.left}>
            <div className={styles['wrap-image']}>
              <Image src={productDetail?.image} alt='' />
            </div>
          </div>

          <div className={styles.right}>
            <div className={styles.content}>
              <div className={styles['wrap-text']}>
                <Title className={styles.title}>{productDetail?.name}</Title>
              </div>
            </div>
            <div
              className='sun-editor-editable sun-editor-editable-override'
              dangerouslySetInnerHTML={{ __html: productDetail?.content ?? '' }}
            ></div>
            <div className={styles['contact-content']}>
              Liên hệ
            </div>
            <div className={styles['buy-now']}>
              <a href={'/lien-he'}>
                <ShoppingCartOutlined className={styles['icon-cart']} />
                Mua ngay
              </a>
            </div>
          </div>
        </div>

        <Divider />
        <ProductsHot />
      </div>
    </>
  );
};

export default ProductDetails;
