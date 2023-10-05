import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Alerts } from '../../../shared/types';
import { column } from './MonitorsTable';

const columns: GridColDef[] = [
  column.network,
  column.category,
  column.name,
  column.date,
  column.from,
  column.to,
  column.intervalHours,
  column.contractAddress,
  column.amount,
  column.confirmed,
  column.url,
];

type MonitorsTableProps = {
  alerts?: Alerts;
};

export const AlertsTable = ({ alerts }: MonitorsTableProps) => {
  const data = alerts?.map((alert) => {
    return { ...alert.monitor, ...alert };
  });
  return (
    <div style={{ width: '100%' }}>
      <DataGrid
        rows={data || []}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[10]}
        rowSelection={false}
        autoHeight
      />
    </div>
  );
};
