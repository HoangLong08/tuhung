'use client';

import CustomModal from '@/components/CustomModalDelete/CustomModal';
import Table from '@/components/Table';
import { TypeProduct } from '@/type/product';
import { TypeSearch } from '@/type/search';
import { paginationFunction } from '@/utils/Helper';
import { PAGINATION } from '@/utils/variables';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import {
  Button,
  Checkbox,
  Col,
  Form,
  Input,
  Row,
  Select,
  Space,
  Typography,
} from 'antd';
import { debounce, isNil, omitBy } from 'lodash';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';
import storeTypeProduct from '../store';
import '@/styles/util.scss';
import ProductService from '@/services/product.service';

const Index = () => {
  const {
    data,
    removePorduct,
    getProduct,
    categories,
    getCategory,
    pagination,
    details,
    setDetails,
  } = storeTypeProduct();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState<TypeSearch>({
    page: searchParams.get('page') || PAGINATION.PAGE,
    take: searchParams.get('take') || PAGINATION.PAGE_SIZE,
    searchKey: searchParams.get('searchKey') || null,
    categoryId: searchParams.get('categoryId') || null,
  });
  const mounted = useRef(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOk = () => {
    setIsModalOpen(false);
    onRemove(details as TypeProduct);
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

  const onRemove = (product: TypeProduct) => {
    removePorduct({
      payload: { id: product.id, name: product.name },
      callback: (value) => {
        if (value) {
          getProduct(search);
        }
      },
    });
  };

  const handleChangeOutstandingProduct = async (
    id: string,
    isSpotlight: boolean
  ) => {
    await ProductService.checkOutstandingProduct(id as string, isSpotlight);
    await getProduct({});
  };

  const columns = [
    {
      title: 'STT',
      width: 50,
      className: 'min-width-50',
      key: 'STT',
      render: (value: any, record: any, index: number) => index + 1,
    },
    {
      title: 'Tên sản phẩm',
      width: 250,
      className: 'min-width-250',
      key: 'name',
      render: (record: TypeProduct) => record?.name,
    },
    {
      title: 'Loại sản phẩm',
      width: 200,
      className: 'min-width-200',
      key: 'type',
      render: (record: TypeProduct) => record?.category?.title,
    },
    {
      title: 'Mô tả',
      width: 200,
      className: 'min-width-200',
      key: 'description',
      render: (record: TypeProduct) => record?.description,
    },
    {
      title: 'Sp nổi bật',
      width: 50,
      align: 'center',
      key: 'isSpotlight',
      render: (record: TypeProduct) => {
        return (
          <Checkbox
            checked={record.isSpotlight}
            onChange={() => {
              handleChangeOutstandingProduct(
                record.id as string,
                record.isSpotlight as boolean
              );
            }}
          ></Checkbox>
        );
      },
    },
    {
      title: '',
      width: 80,
      className: 'max-w-80',
      key: 'action',
      align: 'right',
      render: (record: TypeProduct) => (
        <Space>
          <Button
            onClick={() =>
              router.push(`${pathname}/chi-tiet/${record.slug || ''}`)
            }
            icon={<EditOutlined />}
          />
          <Button
            onClick={() => {
              setDetails(record);
              setIsModalOpen(true);
            }}
            danger
            icon={<DeleteOutlined />}
          />
        </Space>
      ),
    },
  ];

  useEffect(() => {
    getCategory();
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  useEffect(() => {
    getProduct(search);
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
    <Form
      layout='vertical'
      initialValues={{
        categoryId: null,
      }}
    >
      <Row gutter={10}>
        <Col span={24}>
          <div className='flex flex-row justify-between'>
            <Typography.Title level={2}>Danh sách sản phẩm</Typography.Title>
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
              placeholder='Tìm kiếm sản phẩm'
              onChange={(e) => {
                const {
                  target: { value },
                } = e;
                if (!value) {
                  onSearch('searchKey', null);
                } else {
                  onSearch('searchKey', value);
                }
              }}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name='categoryId'>
            <Select
              options={[
                { value: '1', label: 'Chọn tất cả' },
                ...categories.map((item) => ({
                  value: item.id,
                  label: item.title,
                })),
              ]}
              className='w-full'
              placeholder='Chọn loại sản phẩm'
              onChange={(value) => {
                onSearch('categoryId', value);
              }}
            />
          </Form.Item>
        </Col>
        <Col span={24} className='mt-3'>
          <Table
            data={data}
            columns={columns}
            rowKey={'id'}
            pagination={paginationTable}
          />
        </Col>
      </Row>
      <CustomModal
        handleDelete={handleOk}
        handleCancel={handleCancel}
        open={isModalOpen}
        title={details?.name || ''}
      />
    </Form>
  );
};

export default Index;
