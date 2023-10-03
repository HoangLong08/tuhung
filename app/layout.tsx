import './globals.scss';
import type { Metadata } from 'next';
import StyledComponentsRegistry from '../lib/AntdRegistry';
import { Sarabun } from 'next/font/google';
import { PropsWithChildren } from 'react';
import MainLayout from '@/layouts';
import './suneditor.css';

const sarabun = Sarabun({ subsets: ['latin'], weight: '500' });

export const metadata: Metadata = {
  title: {
    default: 'Thép Tứ Hưng',
    template: '%s | Thép Tứ Hưng',
  },
  description:
    'Chúng tôi là nhà phân phối thép hàng đầu Việt Nam, đáp ứng dịch vụ Phong Phú - Chất Lượng - Tiến Độ - Rộng Khắp.',
  keywords: 'thép công trình, thép chất lượng, thép Tứ Hưng',
  authors: [
    {
      url: '',
      name: 'Thép Tứ Hưng',
    },
  ],
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang='vi'>
      <body className={sarabun.className}>
        <StyledComponentsRegistry>
          <MainLayout>{children}</MainLayout>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
