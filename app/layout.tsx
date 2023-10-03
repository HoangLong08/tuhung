import './globals.scss';
import type { Metadata } from 'next';
import StyledComponentsRegistry from '../lib/AntdRegistry';
import { Sarabun } from 'next/font/google';
import { PropsWithChildren } from 'react';
import MainLayout from '@/layouts';
import './suneditor.css';
import Head from 'next/head';

const sarabun = Sarabun({ subsets: ['latin'], weight: '500' });

export const metadata: Metadata = {
  title: {
    default: 'Thép Tứ Hưng',
    template: '%s | Thép Tứ Hưng',
  },
  description:
    'Chúng tôi là nhà phân phối thép hàng đầu Việt Nam, đáp ứng dịch vụ Phong Phú - Chất Lượng - Tiến Độ - Rộng Khắp.',
  keywords: 'thép công trình, thép chất lượng, thép tứ hưng',
  authors: [
    {
      url: '',
      name: 'Thép Tứ Hưng',
    },
  ],
  openGraph: {},
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang='vi'>
      <Head>
        <meta
          property='og:image'
          content='https://theptuhung.com.vn/favicon.ico'
        />
        <meta property='og:title' content='Your Title' />
        <meta
          property='og:description'
          content='Chúng tôi là nhà phân phối thép hàng đầu Việt Nam, đáp ứng dịch vụ Phong Phú - Chất Lượng - Tiến Độ - Rộng Khắp..'
        />
      </Head>
      <body className={sarabun.className}>
        <StyledComponentsRegistry>
          <MainLayout>{children}</MainLayout>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
