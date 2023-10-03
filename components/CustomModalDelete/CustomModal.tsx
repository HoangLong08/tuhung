import { Button, Modal } from 'antd';
import React, { FC } from 'react';
import { v4 as uuidv4 } from 'uuid';
interface Props {
  title: string;
  open: boolean;
  handleDelete: () => void;
  handleCancel: () => void;
}

const CustomModal: FC<Props> = ({
  title,
  open,
  handleDelete,
  handleCancel,
}) => {
  return (
    <Modal
      open={open}
      title={
        <p style={{ textAlign: 'center', fontSize: 24, marginBottom: 20 }}>
          Thông báo
        </p>
      }
      onCancel={handleCancel}
      footer={[
        <Button key={uuidv4()} onClick={handleCancel}>
          Hủy
        </Button>,
        <Button key={uuidv4()} onClick={handleDelete} danger>
          OK
        </Button>,
      ]}
    >
      <p>Bạn có chắc chắn muốn xóa {title} không?</p>
    </Modal>
  );
};

export default CustomModal;
