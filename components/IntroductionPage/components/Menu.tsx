'use client';
import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import styles from './styles.module.scss';
import { BusinessIntro } from '@/redux/intro/type';
import { BusinessIntroService } from '@/services/businessIntro.service';
import Content from './Content';
import { useRouter } from 'next/navigation';

interface Props {
  slug: string;
}

const index: FC<Props> = ({ slug }) => {
  const [businessIntro, setBusinessIntro] = useState<BusinessIntro[]>();
  const router = useRouter();
  const loadDataAsync = async () => {
    const businessRes = await BusinessIntroService.getAllBusinessIntro();
    setBusinessIntro(businessRes);
  };

  const itemTabs: TabsProps['items'] | undefined = useMemo(() => {
    return businessIntro
      ?.sort((a, b) => (a.index as number) - (b.index as number))
      ?.map((item, index) => ({
        label: item?.title || '',
        key: item?.slug + '' || index.toString(),
        activeKey: item?.slug,
        children: <Content content={businessIntro} currentSlug={slug} />,
      }));
  }, [businessIntro, slug]);

  const handleTabClick = async (clickedKey: string) => {
    router.push('/ve-chung-toi/' + clickedKey);
  };

  useEffect(() => {
    loadDataAsync();
  }, []);
  return (
    <div className={styles['menu-block']}>
      <Tabs
        activeKey={slug}
        items={itemTabs}
        onChange={(keyActive) => handleTabClick(keyActive)}
      />
    </div>
  );
};

export default React.memo(index);
