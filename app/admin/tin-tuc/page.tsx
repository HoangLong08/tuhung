'use client';

import CustomModal from '@/components/CustomModalDelete/CustomModal';
import Table from '@/components/Table';
import { TypeSearch } from '@/type/search';
import { ResNews } from '@/type/typeNews';
import { paginationFunction } from '@/utils/Helper';
import { PAGINATION } from '@/utils/variables';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Row, Select, Space, Typography } from 'antd';
import { debounce, isNil, omitBy } from 'lodash';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';
import storeNews from './store';
import '@/styles/util.scss';

const Index = () => {
  const {
    getNews,
    news,
    removeNews,
    getTypeNews,
    typeNews,
    pagination,
    detail,
    setDetail,
  } = storeNews();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState<TypeSearch>({
    page: searchParams.get('page') || PAGINATION.PAGE,
    take: searchParams.get('take') || PAGINATION.PAGE_SIZE,
    searchKey: searchParams.get('searchKey') || null,
    directoryId: searchParams.get('directoryId') || null,
  });
  const mounted = useRef(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOk = () => {
    setIsModalOpen(false);
    onRemove(detail as ResNews);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const mountedSet = (
    action: (value: TypeSearch) => void,
    value: TypeSearch
  ) => {
    if (mounted.current) {
      action(value);
    }
  };

  const debounceSearch = debounce((key: string, value: string | null) => {
    mountedSet(setSearch, {
      page: '1',
      [key]: value,
    });
  }, 400);

  const onSearch = (key: string, value: string | null) => {
    if (value === '1') {
      debounceSearch(key, null);
    } else {
      debounceSearch(key, value);
    }
  };

  const onRemove = (record: ResNews) => {
    removeNews({
      payload: {
        id: record.id,
        title: record.title,
      },
      callback: (value) => {
        if (value) {
          getNews(search);
        }
      },
    });
  };

  const colums = [
    {
      title: 'STT',
      key: 'stt',
      width: 100,
      className: 'min-width-100',
      render: (_: object, __: object, index: number) => index + 1,
    },
    {
      title: 'Tiêu đề tin tức',
      key: 'td',
      width: 200,
      className: 'min-width-200',
      render: (record: ResNews) => record?.title,
    },
    {
      title: 'Loại tin tức',
      key: 'type',
      width: 200,
      className: 'min-width-200',
      render: (record: ResNews) => record?.directoty?.title,
    },
    {
      title: 'Mô tả',
      key: 'mt',
      width: 200,
      className: 'min-width-200',
      render: (record: ResNews) => record?.description,
    },
    {
      title: '',
      key: '',
      width: 100,
      className: 'min-width-100',
      align: 'right',
      render: (record: ResNews) => (
        <Space>
          <Button
            onClick={() =>
              router.push(`${pathname}/chi-tiet/${record.slug || ''}`)
            }
            icon={<EditOutlined />}
          />
          <Button
            onClick={() => {
              setDetail(record);
              setIsModalOpen(true);
            }}
            icon={<DeleteOutlined />}
            danger
          />
        </Space>
      ),
    },
  ];

  useEffect(() => {
    getTypeNews();
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  useEffect(() => {
    getNews(search);
    const queryString = new URLSearchParams(omitBy(search, isNil)).toString();
    router.push(`${pathname}?${queryString}`);
  }, [search]);

  const changePagination = (response: any) => {
    setSearch((prev: any) => ({
      ...prev,
      page: response.page,
      take: response.size,
    }));
  };

  const paginationTable = useMemo(
    () =>
      paginationFunction({
        pagination,
        query: search,
        callback: (response: any) => {
          changePagination(response);
        },
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pagination, search]
  );

  return (
    <Form initialValues={search} layout='vertical'>
      <div>
        <Row gutter={10}>
          <Col span={24}>
            <div className='flex flex-row justify-between'>
              <Typography.Title level={2}>Tin tức</Typography.Title>
              <Button
                type='primary'
                className='btn-type-primary'
                onClick={() => router.push(`${pathname}/them-moi`)}
              >
                Thêm mới
              </Button>
            </div>
          </Col>
          <Col span={12}>
            <Form.Item name='searchKey'>
              <Input
                placeholder='Tìm kiếm tin tức'
                onChange={(e) => {
                  const {
                    target: { value },
                  } = e;
                  if (!value) {
                    onSearch('searchKey', null);
                  } else {
                    onSearch('searchKey', value?.trim());
                  }
                }}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name='directoryId'>
              <Select
                options={[
                  { value: '1', label: 'Tất cả loại tin tức' },
                  ...typeNews.map((item) => ({
                    value: item.id,
                    label: item.title,
                  })),
                ]}
                className='w-full'
                placeholder='Chọn loại tin tức'
                onChange={(value) => onSearch('directoryId', value)}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Table columns={colums} data={news} pagination={paginationTable} />
          </Col>
        </Row>
        <CustomModal
          handleDelete={handleOk}
          handleCancel={handleCancel}
          open={isModalOpen}
          title={detail?.title || ''}
        />
      </div>
    </Form>
  );
};

export default Index;
