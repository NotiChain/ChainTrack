import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { PredefinedMonitors, PredefinedMonitor } from '../../../shared/types';
import { column } from './MonitorsTable';

type MonitorsTableProps = {
  predefinedMonitors?: PredefinedMonitors;
  openAddTransactionModal: (predefinedMonitor: PredefinedMonitor) => void;
};

export const PredefinedMonitorsTable = ({
  predefinedMonitors,
  openAddTransactionModal,
}: MonitorsTableProps) => {
  const handleAdd = (predefinedMonitor: PredefinedMonitor) => {
    console.log('!!!!!! handleAdd', predefinedMonitor);
    openAddTransactionModal(predefinedMonitor);
  };

  const AddIconButton = ({
    predefinedMonitor,
  }: {
    predefinedMonitor: PredefinedMonitor;
  }) => (
    <IconButton color="secondary" onClick={() => handleAdd(predefinedMonitor)}>
      <AddIcon />
    </IconButton>
  );

  const columns: GridColDef[] = [
    {
      field: 'add',
      headerName: 'Add',
      width: 100,
      renderCell: (params) => (
        <AddIconButton predefinedMonitor={params.row as PredefinedMonitor} />
      ),
    },
    column.network,
    column.category,
    column.name,
    column.precondition,
    column.from,
    column.to,
    column.intervalHours,
    column.contractAddress,
    column.amount,
    column.url,
  ];

  return (
    <div style={{ width: '100%' }}>
      <DataGrid
        rows={predefinedMonitors || []}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[5, 10]}
      />
    </div>
  );
};
