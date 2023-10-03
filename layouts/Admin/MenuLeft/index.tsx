'use client';

import React, { useEffect, useState } from 'react';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { usePathname } from 'next/navigation';
import routes from '@/routes';
import Link from 'next/link';
import styles from './styles.module.scss';
import { getBusinessInfo } from '@/services';
import { TypeValuesBusinessInfo } from '@/type/businessInfo';

type MenuItem = Required<MenuProps>['items'][number];
type IconType = React.FC<{}>;

function getItem(
  label: React.ReactNode | React.JSX.Element,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group'
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const Index = () => {
  const pathname = usePathname();
  const [keySelected, setKeySelected] = useState<string>('');
  const [businessInfo, setBusinessInfo] = useState<TypeValuesBusinessInfo>();

  const loadDataAsync = async () => {
    setBusinessInfo(await getBusinessInfo());
  };
  useEffect(() => {
    const route = routes.find((item) => pathname.includes(item.url));
    if (route?.key) {
      setKeySelected(route?.key);
    }
  }, [pathname]);

  useEffect(() => {
    loadDataAsync();
  }, []);

  const items = routes.map((item) => {
    const Icon: IconType = item.icon;
    return getItem(
      <Link href={item.url}>{item.label}</Link>,
      item.key,
      <div className={styles['wrapper-icon-left']}>
        <Icon />
      </div>
    );
  });

  return (
    <div className={styles['menu-left']}>
      <div className={styles['menu-left-fit']}>
        <div className={styles['top-menu']}>
          <Link href='/admin'>
            <img
              src={businessInfo?.logo ?? '/logo/logo.png'}
              width={60}
              height={60}
              alt='logo'
            />
          </Link>
          <p className={styles.name}>Thép Tứ Hưng</p>
        </div>
        <Menu selectedKeys={[keySelected]} mode='inline' items={items} />
      </div>
    </div>
  );
};

export default Index;
