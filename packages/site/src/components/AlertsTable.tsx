import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Alerts } from '../../../shared/types';
import { column } from './MonitorsTable';

const columns: GridColDef[] = [
  column.id,
  column.network,
  column.category,
  column.name,
  column.date,
  column.from,
  column.to,
  column.intervalHours,
  column.contractAddress,
  column.amount,
  column.url,
  column.confirmed,
];

type MonitorsTableProps = {
  alerts?: Alerts;
};

export const AlertsTable = ({ alerts }: MonitorsTableProps) => {
  return (
    <div style={{ width: '100%' }}>
      <DataGrid
        autoHeight={true}
        rows={alerts || []}
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
