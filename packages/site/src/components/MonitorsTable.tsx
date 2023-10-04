import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Link, Typography } from '@mui/material';
import { Monitors, ChainIdToNameEnum } from '../../../shared/types';

export function shortenEthWallet(wallet?: string) {
  return wallet ? `${wallet.slice(0, 6)}...${wallet.slice(-4)}` : wallet;
}

export const column: Record<string, GridColDef> = {
  id: { field: 'id', headerName: 'Id', flex: 1 },
  name: { field: 'name', headerName: 'Name', flex: 1 },
  network: {
    field: 'network',
    headerName: 'Network',
    flex: 1,
    valueFormatter: (params) =>
      ChainIdToNameEnum[params.value as keyof typeof ChainIdToNameEnum],
  },
  category: { field: 'category', headerName: 'Category', flex: 1 },
  date: {
    field: 'date',
    headerName: 'Date',
    flex: 1,
    valueFormatter: (params) => new Date(params.value).toLocaleString(),
  },
  from: {
    field: 'from',
    headerName: 'From',
    flex: 1,
    valueFormatter: (params) => shortenEthWallet(params.value),
  },
  to: {
    field: 'to',
    headerName: 'To',
    flex: 1,
    valueFormatter: (params) => shortenEthWallet(params.value),
  },
  intervalHours: {
    field: 'intervalHours',
    headerName: 'Interval',
    flex: 1,
    valueFormatter: (params) => `${params.value} hours`,
  },
  lastTransaction: {
    field: 'lastTransaction',
    headerName: 'Last Transaction',
    flex: 1,
  },
  contractAddress: {
    field: 'contractAddress',
    headerName: 'Contract Address',
    flex: 1,
    valueFormatter: (params) => shortenEthWallet(params.value),
  },
  amount: { field: 'amount', headerName: 'Amount', flex: 1 },
  url: {
    field: 'url',
    headerName: 'URL',
    flex: 1,
    renderCell: (params) => {
      const domainName = params.value
        ? new URL(params.value).hostname
        : params.value;
      return (
        <Link href={params.value} target="_blank">
          <Typography variant="h5">{domainName}</Typography>
        </Link>
      );
    },
  },
  confirmed: {
    field: 'confirmed',
    headerName: 'Confirmed',
    flex: 1,
    valueFormatter: (params) => (params.value ? 'Yes' : 'No'),
  },
  precondition: { field: 'precondition', headerName: 'Precondition', flex: 1 },
};

export const columns: GridColDef[] = [
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
  return (
    <div style={{ width: '100%' }}>
      <DataGrid
        autoHeight
        rows={monitors || []}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[10]}
        rowSelection={false}
        // onCellClick={(cell) => {
        //   if (cell?.field !== column.url.field) {
        //     handleAdd(cell?.row);
        //   }
        // }}
      />
    </div>
  );
};
