'use client';

import styles from './styles.module.scss';
import csx from 'classnames';
import { getBusinessInfo } from '@/services';
import { TypeValuesBusinessInfo } from '@/type/businessInfo';
import { useState, useEffect } from 'react';

const Logo = () => {
  const [businessInfo, setBusinessInfo] = useState<TypeValuesBusinessInfo>();
  const loadDataAsync = async () => {
    setBusinessInfo(await getBusinessInfo());
  };
  useEffect(() => {
    loadDataAsync();
  }, []);
  return (
    <a href='/'>
      <div className={csx('flex flex-row items-center', styles['block-logo'])}>
        <img
          src={businessInfo?.logo ?? '/logo/logo.png'}
          width={60}
          height={60}
          alt='CÔNG TY TNHH THƯƠNG MẠI DỊCH VỤ TỨ HƯNG'
        />
        <p className={csx('ml-3 text-text-th', styles.name)}>THÉP TỨ HƯNG</p>
      </div>
    </a>
  );
};

export default Logo;
