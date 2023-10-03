'use client';

import { ReactNode } from 'react';
import { usePathname, redirect } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AuthLayout from '@/layouts/AuthLayout';
import AdminLayout from '@/layouts/Admin';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import { usePromiseTracker } from 'react-promise-tracker';
import Loading from '@/components/Loading/Loading';
import StorageUtils from '@/utils/storage';
import BubbleIcon from '@/components/BubbleIcon/BubbleIcon';

type Props = {
  children: ReactNode;
};

const MainLayout = ({ children }: Props) => {
  const pathname = usePathname();
  const { promiseInProgress } = usePromiseTracker();
  const getLayout = () => {
    if (/^\/admin\/login(?=\/|$)/i.test(pathname)) {
      return 'loginAdmin';
    }
    if (/^\/admin(?=\/|$)/i.test(pathname)) {
      return 'admin';
    }
    return 'public';
  };
  const isAdmin = getLayout() === 'admin';
  if (isAdmin && !StorageUtils.get('crf_tk') && typeof window !== 'undefined') {
    return redirect('/admin/login');
  }
  let main = (
    <div className='main'>
      <Header />
      <BubbleIcon />
      {children}
      <Footer />
    </div>
  );
  if (pathname === '/admin/login') {
    main = <AuthLayout>{children}</AuthLayout>;
  }
  if (pathname.includes('/admin') && pathname !== '/admin/login') {
    main = <AdminLayout>{children}</AdminLayout>;
  }

  return (
    <Provider store={store}>
      {promiseInProgress && <Loading />}
      {main}
    </Provider>
  );
};

export default MainLayout;
