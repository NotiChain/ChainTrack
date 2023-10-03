import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box } from '@mui/material';
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
    openAddTransactionModal(predefinedMonitor);
  };

  const columns: GridColDef[] = [
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
    <Box style={{ width: '100%' }}>
      <DataGrid
        rows={predefinedMonitors || []}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[10]}
        rowSelection={false}
        autoHeight
        onCellClick={(cell) => {
          if (cell?.field !== column.url.field) {
            handleAdd(cell?.row);
          }
        }}
      />
    </Box>
  );
};
