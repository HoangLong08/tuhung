// 'use client';

import { useAppDispatch } from '@/redux/hooks';
import { BusinessIntro } from '@/redux/intro/type';
import { Category, Product, ResponseProduct } from '@/redux/product/type';
import { ArticleService } from '@/services/article.service';
import { BusinessIntroService } from '@/services/businessIntro.service';
import ConstructionService from '@/services/construction.service';
import ProductService from '@/services/product.service';
import { DirectoryType } from '@/type/articles';
import { ResConstructionType } from '@/type/construction';
import { getCurrentPathName } from '@/utils/stringHelper';
import type { MenuProps } from 'antd';
import { Button, Drawer, Menu, Space } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import styles from './styles.module.scss';

const MenuContainer = () => {
  const [open, setOpen] = useState(false);
  const [categories, setCategory] = useState<Category[]>([]);
  const [articles, setArticles] = useState<DirectoryType[]>([]);
  const [businessIntro, setBusinessIntro] = useState<BusinessIntro[]>([]);
  const [constructionType, setConstructionType] = useState<
    ResConstructionType[]
  >([]);
  const currentPathName = usePathname();
  const [currentKeyMenu, setCurrentKeyMenu] = useState(
    getCurrentPathName(currentPathName)
  );
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [products, setProducts] = useState<ResponseProduct>();
  const [subMenuProducts, setSubMenuProducts] = useState<Product[]>([]);

  const menuItems: MenuProps['items'] = [
    {
      label: (
        <Link
          onClick={() => {
            setCurrentKeyMenu(currentPathName.slice(1));
            onClose();
          }}
          className={styles['title-menu']}
          href='/'
        >
          Trang chủ
        </Link>
      ),
      key: 'trang-chu',
      onClick: () => {
        router.push('/');
      },
    },
    {
      label: (
        <Link
          href={`/ve-chung-toi/gioi-thieu-chung`}
          className={styles['title-menu']}
        >
          <span className={styles['title-menu']} onClick={() => onClose()}>
            Về chúng tôi
          </span>
        </Link>
      ),
      key: 've-chung-toi',
      children: businessIntro
        .sort((a, b) => (a.index as number) - (b.index as number))
        .map((item, index) => ({
          label: (
            <div
              className='flex flex-row'
              onClick={() => {
                onClose();
              }}
            >
              <span className={styles.span} />
              <Link href={`/ve-chung-toi/${item.slug + ''}`}>{item.title}</Link>
            </div>
          ),
          key: item.id ?? index,
          className: styles['block-menu'],
        })),
    },
    {
      label: (
        <span onClick={() => onClose()} className={styles['title-menu']}>
          <span className={styles['title-menu']}>Sản phẩm</span>
        </span>
      ),
      key: 'san-pham',
      children: categories?.map((el, index) => ({
        label: (
          <div className='flex flex-row'>
            <span className={styles.span} />
            <Link
              onClick={() => onClose()}
              href={`/san-pham/${el.slug}`}
              className={styles['title-menu-uppercase']}
            >
              <p
                className={
                  styles[
                    `${(el?.title?.length as number) > 18 ? 'active' : ''}`
                  ]
                }
              >
                {el.title}
              </p>
            </Link>
          </div>
        ),
        key: el.id || index,
        className: styles['block-menu'],
        onMouseEnter: (obj) => {
          setSubMenuProducts(
            products?.data.filter((pro) => pro?.category?.id === obj.key) || []
          );
        },
        children: subMenuProducts?.map((el) => ({
          label: (
            <div className='flex flex-row'>
              <span className={styles.span} />
              <Link
                onClick={() => onClose()}
                href={`/san-pham/chi-tiet/${el.slug}`}
                className={styles['title-menu-uppercase']}
              >
                {el.name}
              </Link>
            </div>
          ),
          key: uuidv4(),
          className: styles['block-menu'],
        })),
      })),
    },
    {
      label: (
        <span onClick={() => onClose()}>
          <span className={styles['title-menu']}>Công trình</span>
        </span>
      ),
      key: 'cong-trinh',
      children: constructionType?.map((el, index) => ({
        label: (
          <div className='flex flex-row'>
            <span className={styles.span} />
            <Link
              onClick={() => onClose()}
              className={styles['title-menu-uppercase']}
              href={`/cong-trinh/${el.slug}`}
            >
              <p
                className={
                  styles[
                    `${(el?.title?.length as number) > 18 ? 'active' : ''}`
                  ]
                }
              >
                {el.title}
              </p>
            </Link>
          </div>
        ),
        key: el.id || index,
        className: styles['block-menu'],
      })),
    },
    {
      label: (
        <Link
          onClick={() => onClose()}
          href='/tin-tuc'
          className={styles['title-menu']}
        >
          <span className={styles['title-menu']}>Tin tức hoạt động</span>
        </Link>
      ),
      key: 'tin-tuc',
      children: articles?.map((el, index) => ({
        label: (
          <div className='flex flex-row'>
            <span className={styles.span} />
            <Link
              className={styles['title-menu-uppercase']}
              onClick={() => onClose()}
              href={`/tin-tuc/${el.slug}`}
            >
              <p
                className={
                  styles[
                    `${(el?.title?.length as number) > 18 ? 'active' : ''}`
                  ]
                }
              >
                {el.title}
              </p>
            </Link>
          </div>
        ),
        key: el.id || index,
        className: styles['block-menu'],
      })),
    },
    {
      label: (
        <Link
          onClick={() => onClose()}
          className={styles['title-menu']}
          href='/lien-he'
        >
          Liên hệ
        </Link>
      ),
      key: 'lien-he',
      onClick: () => {
        router.push('/lien-he');
      },
    },
  ];

  const loadData = async () => {
    const [categories, constructions, articles, busIntro, productList] =
      await Promise.all([
        ProductService.getAllCategories(),
        ConstructionService.getAllTypeConstructor(),
        ArticleService.getAllDirectory(),
        BusinessIntroService.getAllBusinessIntro(),
        ProductService.getAllProducts({ take: 50 }),
      ]);
    setCategory(categories);
    setConstructionType(constructions);
    setArticles(articles);
    setBusinessIntro(busIntro);
    setProducts(productList);
  };
  const onClose = () => {
    setOpen(false);
  };

  const onOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    loadData();
  }, []);
  useEffect(() => {
    if (currentPathName === '/') {
      setCurrentKeyMenu('trang-chu');
    } else {
      const route = menuItems.find((item) =>
        getCurrentPathName(currentPathName).includes(
          (item?.key as string) ?? ''
        )
      );
      if (route?.key) {
        setCurrentKeyMenu(route?.key as string);
      }
    }
  }, [currentPathName]);

  return (
    <>
      <div className={styles.menu}>
        <Menu
          selectedKeys={[currentKeyMenu]}
          mode='horizontal'
          items={menuItems}
        />
      </div>
      <Button className={styles.bars} onClick={onOpen}>
        <img src='/icons/bars.svg' alt='' />
      </Button>
      <div className={styles.drawer}>
        <Drawer
          title={<span className='uppercase text-text-th'>Thép tứ hưng</span>}
          placement='left'
          closable={false}
          onClose={onClose}
          open={open}
          key='left'
          extra={
            <Space>
              <Button onClick={onClose}>
                <Image
                  src='/icons/close.svg'
                  width={15}
                  height={15}
                  alt='close'
                />
              </Button>
            </Space>
          }
        >
          <Menu mode='inline' items={menuItems} />
        </Drawer>
      </div>
    </>
  );
};

export default MenuContainer;
