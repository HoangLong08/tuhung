import React, { FC } from 'react';
import Banner from './components/Banner';
import Menu from './components/Menu';
import styles from './styles.module.scss';
interface Props {
  slug: string;
}
const index: FC<Props> = ({slug}) => {
  return (
    <div className={styles.container}>
      <Banner />
      <Menu slug={slug}/>
    </div>
  );
};

export default index;
