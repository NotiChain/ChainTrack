import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Link } from '@mui/material';
import { Monitors, ChainIdToNameEnum } from '../../../shared/types';

export function shortenEthWallet(wallet?: string) {
  return wallet ? `${wallet.slice(0, 6)}...${wallet.slice(-4)}` : wallet;
}

export const column: Record<string, GridColDef> = {
  id: { field: 'id', headerName: 'Id' },
  name: { field: 'name', headerName: 'Name' },
  network: {
    field: 'network',
    headerName: 'Network',
    valueFormatter: (params) =>
      ChainIdToNameEnum[params.value as keyof typeof ChainIdToNameEnum],
  },
  category: { field: 'category', headerName: 'Category' },
  date: { field: 'date', headerName: 'Date' },
  from: {
    field: 'from',
    headerName: 'From',
    valueFormatter: (params) => shortenEthWallet(params.value),
  },
  to: {
    field: 'to',
    headerName: 'To',
    valueFormatter: (params) => shortenEthWallet(params.value),
  },
  intervalHours: {
    field: 'intervalHours',
    headerName: 'Interval',
    valueFormatter: (params) => `${params.value} hours`,
  },
  lastTransaction: { field: 'lastTransaction', headerName: 'Last Transaction' },
  contractAddress: {
    field: 'contractAddress',
    headerName: 'Contract Address',
    valueFormatter: (params) => shortenEthWallet(params.value),
  },
  amount: { field: 'amount', headerName: 'Amount' },
  url: {
    field: 'url',
    headerName: 'URL',
    renderCell: (params) => (
      <Link href={params.value} target="_blank">
        {params.value}
      </Link>
    ),
  },
  confirmed: { field: 'confirmed', headerName: 'Confirmed' },
  precondition: { field: 'precondition', headerName: 'Precondition' },
};

export const columns: GridColDef[] = [
  column.id,
  column.name,
  column.network,
  column.from,
  column.to,
  column.intervalHours,
  column.lastTransaction,
  column.contractAddress,
  column.amount,
  column.url,
];

type MonitorsTableProps = {
  monitors?: Monitors;
};

export const MonitorsTable = ({ monitors }: MonitorsTableProps) => {
  console.log(monitors);

  return (
    <div style={{ width: '100%' }}>
      <DataGrid
        autoHeight={true}
        rows={monitors || []}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[10]}
        rowSelection={false}
        getRowHeight={() => 'auto'}
      />
    </div>
  );
};
