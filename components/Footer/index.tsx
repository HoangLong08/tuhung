import Image from 'next/image';
import Link from 'next/link';
import styles from './styles.module.scss';
import csx from 'classnames';
import { TypeValuesBusinessInfo } from '@/type/businessInfo';
import { TypeBusinessInfoAddress } from '@/type/businessInfoAddress';
import { useEffect, useState } from 'react';
import * as services from '@/services';
import { useRouter } from 'next/navigation';
import { BusinessIntro } from '@/redux/intro/type';
import { BusinessIntroService } from '@/services/businessIntro.service';
const Index = () => {
  const [bussinessInfo, setBussinessInfo] = useState<TypeValuesBusinessInfo>();
  const [bussinessIntro, setBussinessIntro] = useState<BusinessIntro[]>([]);
  const [businessAddress, setBusinessAddress] = useState<
    TypeBusinessInfoAddress[]
  >([]);
  const router = useRouter();

  const initData = async () => {
    try {
      const [businessInfo, businessIntroList, businessAddress] =
        await Promise.all([
          services.getBusinessInfo(),
          BusinessIntroService.getAllBusinessIntro(),
          services.getBusinessInfoAddress(),
        ]);
      setBussinessInfo(businessInfo);
      setBussinessIntro(businessIntroList);
      setBusinessAddress(businessAddress);
    } catch (e) {}
  };

  useEffect(() => {
    initData();
  }, []);

  //load Address UI
  const loadAddress = () => {
    return (
      businessAddress &&
      businessAddress?.map((item: TypeBusinessInfoAddress) => {
        return (
          <div
            onClick={() => {
              router.push(`/lien-he?id=${item.id}`);
            }}
            key={item.id}
          >
            <h2 className={csx(styles['text-about-child'])}>{item.address}</h2>
          </div>
        );
      })
    );
  };

  //load Intro UI
  const loadBusinessIntros = () => {
    return (
      bussinessIntro &&
      bussinessIntro
        ?.sort((a, b) => (a.index as number) - (b.index as number))
        .map((item, index) => {
          return (
            <div
              key={item.id}
              onClick={() => {
                router.push(`/ve-chung-toi/${item.slug}`);
              }}
            >
              <h2 key={item.id} className={csx(styles['text-about-child'])}>
                {item.title}
              </h2>
            </div>
          );
        })
    );
  };
  return (
    <div className={styles.footer}>
      <div className={styles['footer-big']}>
        <div
          className={csx(
            'flex flex-col items-center justify-start',
            styles['block-info']
          )}
        >
          <img
            src={bussinessInfo?.logo ?? '/logo/logo.png'}
            alt='logo'
            width={99}
            height={99}
            className='mb-3'
          />
          <h3
            title='CÔNG TY TNHH THƯƠNG MẠI DỊCH VỤ TỨ HƯNG'
            className={csx(styles['footer-name'], 'mb-8')}
          >
            {bussinessInfo?.businessName ?? ''}
          </h3>
          <div className='flex flex-col'>
            <div className='mb-5 flex flex-row items-start justify-start md:justify-center'>
              <Image
                className={styles['icon-address']}
                src='/company.png'
                height={45}
                width={55}
                alt='company'
              />
              <h4 className={csx(styles['footer-title'], 'ml-1')}>
                {businessAddress[0]?.address ?? ''}
              </h4>
            </div>
            <div className='flex flex-row items-center justify-start'>
              <Image
                src='/icons/phone.svg'
                height={30}
                width={30}
                alt='phone'
              />
              <h4 className={csx(styles['footer-title'], 'ml-2')}>
                <a href={`tel:${bussinessInfo?.phone}`}>
                  {' '}
                  {bussinessInfo?.phone ?? ''}
                </a>
              </h4>
            </div>
          </div>
        </div>
        <div className={styles['footer-info']}>
          <div className='flex flex-col'>
            <h1 className={csx(styles['text-about'], 'mb-8')}>VỀ CHÚNG TÔI</h1>
            {loadBusinessIntros()}
          </div>
        </div>
        <div className={styles['footer-info']}>
          <div className='flex flex-col'>
            <h1 className={csx(styles['text-about'], 'mb-8')}>
              CHI NHÁNH CÔNG TY
            </h1>
            {loadAddress()}
          </div>
        </div>
        <div className={styles['footer-info']}>
          <div className='flex flex-col'>
            <h1 className={csx(styles['text-about'], 'mb-8')}>LIÊN KẾT</h1>
            <Link href='/'>
              <h2 className={styles['text-about-child']}>Trang chủ</h2>
            </Link>
            <Link href={`/ve-chung-toi/${bussinessIntro[0]?.slug ?? ''}`}>
              <h2 className={styles['text-about-child']}>Về chúng tôi</h2>
            </Link>
            <Link href={'/tin-tuc'}>
              <h2 className={styles['text-about-child']}>Tin tức hoạt động</h2>
            </Link>
            <Link href={'/lien-he'}>
              <h2 className={styles['text-about-child']}>Liên hệ</h2>
            </Link>
          </div>
        </div>
      </div>
      <div className={styles['footer-small']}>
        <h3>Copyright © 2023 Tứ Hưng. Designed and developer by PNL ltd.</h3>
      </div>
    </div>
  );
};

export default Index;
