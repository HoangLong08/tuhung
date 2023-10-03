import React, { ReactNode } from 'react';
import styles from './styles.module.scss';
type AuthLayoutProps = { children: ReactNode };

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className={styles.auth}>
      <div className={styles.headerSpace}></div>
      <div className={styles.banner}>
        <span className={styles.title}></span>
      </div>
      <div className={styles.main}>{children}</div>
    </div>
  );
};

export default AuthLayout;
