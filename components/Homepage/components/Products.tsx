'use client';
import ProductService from '@/services/product.service';
import styles from './styles.module.scss';
import { useEffect, useState } from 'react';
import { ResponseProduct } from '@/redux/product/type';
import { useRouter } from 'next/navigation';
import { Col, Row } from 'antd';

const ProductsHot = () => {
  const [products, setProduct] = useState<ResponseProduct>();
  const router = useRouter();

  const loadProductsAsync = async () => {
    setProduct(await ProductService.getAllProducts({ take: 4, order: 'DESC' }));
  };

  useEffect(() => {
    loadProductsAsync();
  }, []);

  return (
    <>
      <h1 className={styles.title}>
        <span>🔥</span> Sản phẩm nổi bật <span>🔥</span>
      </h1>
      <div className={styles['thumb-container']}>
        <Row gutter={[24, 24]}>
          {products?.data.map((item) => (
            <Col
              xs={24}
              sm={12}
              md={12}
              lg={12} 
              xl={12}
              key={item.id}
              onClick={() => router.push(`/san-pham/chi-tiet/${item.slug}`)}
            >
              <div className={styles['thumb-img']}>
                <div className={styles['image-container']}>
                  <img src={item.image} alt={item.description} />
                </div>
                <p>{item.name}</p>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
};

export default ProductsHot;
