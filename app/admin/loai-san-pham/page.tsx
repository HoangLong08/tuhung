'use client';
import { Category } from '@/redux/product/type';
import ProductService from '@/services/product.service';
import {
  DeleteOutlined,
  EditOutlined,
  PlusCircleFilled,
  SearchOutlined,
} from '@ant-design/icons';
import {
  Button,
  Form,
  Input,
  Modal,
  Space,
  Table,
  Typography,
  notification,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import styles from './CategoryProduct.module.scss';
import csx from 'classnames';
import '@/styles/util.scss';

const initialForm: Category = {
  id: '',
  title: '',
  description: '',
};

const CategoryProduct = () => {
  const pagination = { defaultPageSize: 5 };
  const [data, setData] = useState<Category[]>([]);
  const [dataFilter, setDataFilter] = useState<Category[]>([]);
  const [rowCurrent, setRowCurrent] = useState(initialForm);
  const [form] = Form.useForm();
  const [form1] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();
  const [openModal, setOpenModal] = useState({
    create: false,
    edit: false,
    delete: false,
  });

  const initData = async () => {
    const res = await ProductService.getAllCategories();
    setData(res);
    setDataFilter(res);
  };
  useEffect(() => {
    initData();
  }, [data?.length, rowCurrent]);

  const columns: ColumnsType<Category> = [
    {
      title: 'Tên loại',
      dataIndex: 'title',
      width: '30%',
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      width: '40%',
    },
    {
      title: '',
      dataIndex: 'action',
      width: '20%',
      align: 'right',
      render: (_: any, record: Category) => (
        <Space>
          <Button
            onClick={() => showModalEdit(record)}
            icon={<EditOutlined />}
          />
          <Button
            onClick={() => showModalDelete(record)}
            danger
            icon={<DeleteOutlined />}
          />
        </Space>
      ),
    },
  ];

  const showModalEdit = (record: Category) => {
    setOpenModal({
      create: false,
      edit: true,
      delete: false,
    });
    form1.setFieldsValue(record);
    setRowCurrent(record);
  };

  const showModalDelete = (record: Category) => {
    setOpenModal({
      create: false,
      edit: false,
      delete: true,
    });
    setRowCurrent(record);
  };

  const handleOkDelete = async () => {
    try {
      await ProductService.deleteCategoryById(rowCurrent.id ?? '');
      api.success({
        message: `Thông báo!`,
        description: `Xóa sản phẩm ${rowCurrent.title} thành công.`,
      });
    } catch (error) {
      api.success({
        message: `Thông báo!`,
        description: 'Xóa sản phẩm không thành công.',
      });
    }
    initData();
    handleCancel();
  };

  const showModal = () => {
    setOpenModal({
      create: true,
      edit: false,
      delete: false,
    });
  };

  const handleCancel = () => {
    setOpenModal({
      create: false,
      edit: false,
      delete: false,
    });
  };

  // search by name
  const onFinish = (values: { valueSearch: string }) => {
    const res = data.filter((el) =>
      el
        .title!.toLowerCase()
        .trim()
        .includes(values.valueSearch.toLowerCase().trim())
    );

    setDataFilter(res);
  };
  const onFinishAdd = async (values: Category) => {
    try {
      await ProductService.addCategory(values);

      handleCancel();
      api.success({
        message: `Thông báo!`,
        description: 'Thêm mới loại sản phẩm thành công.',
      });
      initData();
      form.resetFields();
    } catch (err) {
      api.error({
        message: 'Thông báo',
        description: 'Tên loại đã được sử dụng. Vui lòng thử lại với tên khác.',
      });
    }
  };

  const onFinishEdit = async (values: Category) => {
    try {
      await ProductService.updateCategory(rowCurrent.id ?? '', {
        title: values.title ?? '',
        description: values.description ?? '',
      });
      initData();
      handleCancel();
      api.success({
        message: `Thông báo!`,
        description: 'Cập nhật loại sản phẩm thành công.',
      });
    } catch (err) {
      api.error({
        message: 'Thông báo',
        description: 'Tên loại đã được sử dụng. Vui lòng thử lại với tên khác.',
      });
    }
  };
  return (
    <div className={styles.container}>
      {contextHolder}
      <Typography.Title level={2} className={styles.head}>
        Danh sách loại sản phẩm
      </Typography.Title>
      <div className={styles.action}>
        <div>
          <Form
            name='basic'
            onFinish={onFinish}
            autoComplete='off'
            style={{ display: 'flex' }}
          >
            <Form.Item name='valueSearch' style={{ width: '100%' }}>
              <Input />
            </Form.Item>

            <Form.Item>
              <Button
                shape='circle'
                icon={<SearchOutlined />}
                htmlType='submit'
              />
            </Form.Item>
          </Form>
        </div>

        <div className='' onClick={showModal}>
          <Button
            type='primary'
            className={csx(styles.btnAdd, 'btn-type-primary')}
          >
            Thêm mới
          </Button>
        </div>
      </div>
      <Table
        columns={columns}
        dataSource={dataFilter.map((item) => ({
          ...item,
          key: item.id,
        }))}
        pagination={pagination}
      />
      <Modal
        title={
          <p
            style={{
              fontSize: '1.5rem',
              textAlign: 'center',
              marginBottom: 20,
            }}
          >
            Tạo mới loại sản phẩm
          </p>
        }
        open={openModal.create}
        onCancel={handleCancel}
        footer={[
          <Button className='btn-w-120' key={uuidv4()} onClick={handleCancel}>
            Hủy bỏ
          </Button>,
          <Button
            key={uuidv4()}
            type='primary'
            htmlType='submit'
            className='btn-type-primary-w-120'
            onClick={() => form.submit()}
          >
            OK
          </Button>,
        ]}
      >
        <Form
          form={form}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 14 }}
          layout='horizontal'
          onFinish={onFinishAdd}
        >
          <Form.Item label='Tên loại sản phẩm' name='title'>
            <Input />
          </Form.Item>
          <Form.Item label='Mô tả loại sản phẩm' name='description'>
            <Input.TextArea rows={5} />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title={
          <p
            style={{
              fontSize: '1.5rem',
              textAlign: 'center',
              marginBottom: 20,
            }}
          >
            Chỉnh sửa loại sản phẩm
          </p>
        }
        open={openModal.edit}
        onCancel={handleCancel}
        footer={[
          <Button key={uuidv4()} onClick={handleCancel}>
            Hủy bỏ
          </Button>,
          <Button
            key={uuidv4()}
            type='primary'
            htmlType='submit'
            className='btn-type-primary'
            onClick={() => form1.submit()}
          >
            Cập nhật
          </Button>,
        ]}
      >
        <Form
          form={form1}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 14 }}
          layout='horizontal'
          onFinish={onFinishEdit}
          initialValues={rowCurrent}
        >
          <Form.Item label='id' name='id' hidden>
            <Input />
          </Form.Item>
          <Form.Item label='Tên loại sản phẩm' name='title'>
            <Input />
          </Form.Item>
          <Form.Item label='Mô tả loại sản phẩm' name='description'>
            <Input.TextArea rows={5} />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title={
          <p
            style={{
              fontSize: '1.5rem',
              textAlign: 'center',
              marginBottom: 20,
            }}
          >
            Thông báo
          </p>
        }
        open={openModal.delete}
        onCancel={handleCancel}
        footer={[
          <Button key={uuidv4()} onClick={handleCancel}>
            Hủy
          </Button>,
          <Button key={uuidv4()} onClick={handleOkDelete} danger>
            OK
          </Button>,
        ]}
      >
        <p>Bạn có chắc xóa loại sản phẩm {rowCurrent.title} không?</p>
      </Modal>
    </div>
  );
};

export default CategoryProduct;
