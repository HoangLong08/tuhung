import React from 'react';
import './style.scss';
import Link from 'next/link';
import UserIcon from '@/routes/icons/UserIcon';
import BalanceIcon from '@/routes/icons/BalanceIcon';
import ProductIcon from '@/routes/icons/ProductIconBlack';

type Props = {
  type: string;
  dataContent: number;
};

const Widget = ({ type, dataContent }: Props) => {
  let data;
  //temporary

  switch (type) {
    case 'user':
      data = {
        title: 'SẢN PHẨM',
        isMoney: false,
        link: 'Xem tất cả',
        linkUrl: '/admin/san-pham',
        icon: <ProductIcon />,
      };
      break;
    case 'order':
      data = {
        title: 'BÀI VIẾT',
        isMoney: false,
        link: 'Xem tất cả',
        linkUrl: '/admin/tin-tuc',
        icon: <BalanceIcon />,
      };
      break;
    case 'balance':
      data = {
        title: 'ĐỐI TÁC',
        isMoney: true,
        link: 'Xem chi tiết',
        linkUrl: '/admin/doi-tac',
        icon: <UserIcon />,
      };
      break;
    default:
      data = {
        title: 'ĐỐI TÁC',
        isMoney: true,
        link: 'Xem chi tiết',
        linkUrl: '/admin/doi-tac',
        icon: <UserIcon />,
      };
      break;
  }

  return (
    <div className='widget'>
      <div className='left'>
        <span className='title'>{data.title}</span>
        <span className='counter'>
          {dataContent} {data.isMoney}
        </span>
        <span className='link'>
          <Link href={data.linkUrl}>{data.link}</Link>
        </span>
      </div>
      <div className='right'>
        <div>{data.icon}</div>
      </div>
    </div>
  );
};

export default Widget;
