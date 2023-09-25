import React, { FC } from 'react';
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

export interface TestTransactionTableProps {
  data: any;
}

interface TransactionTableColumns {
  id: number;
  from: string | null | undefined;
  to: string | null | undefined;
  intervalHours: string;
}

const columnHelper = createColumnHelper<TransactionTableColumns>();

const columns = [columnHelper.accessor('id' {
  header: 'id',
  c
})];

export const TestTransactionTable: FC<TestTransactionTableProps> = (props) => {
  const { data } = props;

  const {} = useReactTable({ data, getCoreRowModel: getCoreRowModel() });

  return <div></div>;
};
