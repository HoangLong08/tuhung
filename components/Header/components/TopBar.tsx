import Image from 'next/image';
import styles from './styles.module.scss';

const TopBar = () => {
  return (
    <div className={styles['top-bar']}>
      <div className='flex flex-row flex-wrap'>
        <div className='mr-4 flex flex-row'>
          <Image
            src='/icons/phone.svg'
            alt='phone'
            width={19}
            height={19}
            className='mr-2'
          />
          <p className={styles['text-top-bar']}>
            <a href='tel:02363721345'>0236 3721 345</a>
          </p>
        </div>
        <span />
        <div className='flex flex-row'>
          <Image
            src='/icons/clock.svg'
            alt='clock'
            width={20}
            height={20}
            className='mr-2'
          />
          <p className={styles['text-top-bar']}>
            Thứ Hai - Thứ Bảy: 07h30 - 17h
          </p>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
