import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Monitors } from '../../../shared-types';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID' },
  { field: 'name', headerName: 'Name' },
  { field: 'network', headerName: 'Network' },
  { field: 'from', headerName: 'From' },
  { field: 'to', headerName: 'To' },
  { field: 'intervalHours', headerName: 'Interval' },
  { field: 'lastTransaction', headerName: 'Last Transaction' },
  { field: 'contractAddress', headerName: 'ContractAddress' },
  { field: 'amount', headerName: 'Amount' },
  { field: 'url', headerName: 'URL' },
];

type MonitorsTableProps = {
  monitors?: Monitors;
};

export const MonitorsTable = ({ monitors }: MonitorsTableProps) => {
  console.log(monitors);

  return (
    <div style={{ width: '100%' }}>
      <DataGrid
        rows={monitors || []}
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
