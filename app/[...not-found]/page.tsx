import { Button, Result, Row } from 'antd';
import Link from 'next/link';
import '@/styles/util.scss';

export default function NotFound() {
  return (
    <div className='min-h-screen'>
      <Row justify='center' align='middle' className='min-h-100'>
        <Result
          status='404'
          title='404'
          subTitle='Trang này không tồn tại'
          extra={
            <Link href='/'>
              <Button type='primary' className='btn-type-primary'>
                Quay lại trang chủ
              </Button>
            </Link>
          }
        />
      </Row>
    </div>
  );
}
