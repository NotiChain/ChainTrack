import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import {
  Button,
  ButtonGroup,
  Dialog,
  DialogActions,
  DialogTitle,
  IconButton,
  Link,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import {
  ChainIdToNameEnum,
  Monitor,
  Monitors,
  PredefinedMonitor,
} from '../../../shared/types';
import { deleteMonitor } from '../utils';

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

type MonitorsTableProps = {
  monitors: Monitors;
  loadSnapData: () => void;
  openAddTransactionModal: (
    predefinedMonitor: PredefinedMonitor,
    isEditTransaction?: boolean,
  ) => void;
};

export const MonitorsTable = ({
  loadSnapData,
  monitors,
  openAddTransactionModal,
}: MonitorsTableProps) => {
  const theme = useTheme();
  const [monitorToDelete, setMonitorToDelete] = useState<Monitor | null>();

  const columns: GridColDef[] = [
    {
      renderCell: (params) => (
        <ButtonGroup variant="outlined" aria-label="outlined button group">
          <IconButton onClick={() => openAddTransactionModal(params.row, true)}>
            <EditIcon color="primary" />
          </IconButton>
          <IconButton onClick={() => setMonitorToDelete(params.row)}>
            <DeleteIcon color="error" />
          </IconButton>
        </ButtonGroup>
      ),
      field: 'actions',
      renderHeader: () => null,
    },
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
      />
      <Dialog
        open={Boolean(monitorToDelete)}
        onClose={() => setMonitorToDelete(null)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Are you sure you want to delete <b>{monitorToDelete?.name}</b>{' '}
          monitor?
        </DialogTitle>
        <DialogActions>
          <Button onClick={() => setMonitorToDelete(null)}>Cancel</Button>
          <Button
            onClick={() => {
              if (!monitorToDelete || !monitorToDelete?.id) {
                return;
              }

              deleteMonitor({ id: monitorToDelete?.id }).then(() => {
                setMonitorToDelete(null);
                loadSnapData();
              });
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
