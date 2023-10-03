import React from 'react';
import styles from './Loading.module.scss';

const Loading = () => {
  return (
    <div className={styles.container}>
      <div className={styles.backdrop}>
        <img src={'/icons/Spinner.svg'} alt='' className={styles.icon} />
      </div>
    </div>
  );
};

export default Loading;
