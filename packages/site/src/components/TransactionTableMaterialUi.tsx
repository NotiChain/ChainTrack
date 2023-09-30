import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Monitors } from '../../../shared-types';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'from', headerName: 'From', width: 250 },
  { field: 'to', headerName: 'To', width: 250 },
  {
    field: 'intervalHours',
    headerName: 'Interval',
    type: 'number',
    width: 100,
  },
];

type TransactionTableMaterialUiProps = {
  monitors?: Monitors;
};

const TransactionTableMaterialUi = ({
  monitors,
}: TransactionTableMaterialUiProps) => {
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

export default TransactionTableMaterialUi;
