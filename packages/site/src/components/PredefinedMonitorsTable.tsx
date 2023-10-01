import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { PredefinedMonitors } from '../../../shared/types';
import { column } from './MonitorsTable';

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

type MonitorsTableProps = {
  predefinedMonitors?: PredefinedMonitors;
};

export const PredefinedMonitorsTable = ({
  predefinedMonitors,
}: MonitorsTableProps) => {
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
