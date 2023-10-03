'use client';

import Logo from './components/Logo';
import Menu from './components/Menu';
import TopBar from './components/TopBar';
import styles from './styles.module.scss';

const Index = () => {
  return (
    <>
      <header className={styles.header}>
        <TopBar />
        <div className={styles.main}>
          <Logo />
          <Menu />
        </div>
      </header>
    </>
  );
};

export default Index;
