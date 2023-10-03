'use client';

import React, { memo } from 'react';
import { Table } from 'antd';

export interface TypeColumn {
  key: string;
  title: any;
  dataIndex?: string | string[];
  className?: string;
  align?: string | any;
  fixed?: string | any;
  width?: number | string;
  ellipsis?: boolean;
  onCell?: any;
  render?: any;
}

interface TypePagination {
  current?: number;
  pageSize?: number;
  total?: number;
  position?: any[];
  responsive?: boolean;
  size?: any;
  onChange?: any;
}

export interface Props {
  readonly components?: any;
  readonly emptyContent?: any;
  readonly columns?: TypeColumn[];
  readonly data?: any[];
  readonly size?: any;
  readonly bordered?: boolean;
  readonly isLoading?: boolean;
  readonly pagination?: TypePagination;
  readonly rowSelection?: object;
  readonly color?: string;
  readonly className?: string;
  readonly showSorterTooltip?: boolean;
  readonly onRow?: (
    record: any,
    index?: number
  ) => {
    onClick?: React.MouseEventHandler;
  };
  readonly rowClassName?: string;
  readonly rowKey?: string;
  readonly scroll?: {
    readonly x?: string | number | true;
    readonly y?: string | number;
  };
  // custom
  readonly error?: boolean;
  readonly expandable?: any;
  readonly defaultExpandAllRows?: boolean;
  readonly onChange?: any;
  readonly footer?: (data: readonly TypeColumn[]) => React.ReactNode;
}
const Index: React.FC<Props> = ({
  columns = [],
  data,
  isLoading = false,
  size = 'small',
  bordered = true,
  pagination,
  color = 'primary',
  className,
  showSorterTooltip = false,
  emptyContent,
  footer,
  ...props
}) => {
  return (
    <Table
      className={className}
      columns={columns}
      dataSource={data}
      size={size}
      bordered={bordered}
      loading={isLoading}
      rowKey={(row: any) => {
        return row?.id;
      }}
      pagination={
        pagination
          ? {
              pageSize: 10,
              size: 'default',
              position: ['bottomRight'],
              ...pagination,
            }
          : false
      }
      scroll={{ x: 'max-content' }}
      showSorterTooltip={showSorterTooltip}
      footer={footer}
      {...props}
    />
  );
};

export default Index;
