import { TableColumn } from 'react-data-table-component';

import predefinedMonitors from '../../../shared/predefined-monitors';
import { ChainIdToNameEnum } from '../../../shared/types';
import { Table } from './Table';

type TableProps = {
  disabled?: boolean;
};

function shortenEthWallet(wallet: string) {
  return `${wallet.slice(0, 6)}...${wallet.slice(-4)}`;
}

export const PredefinedMonitorsTable = ({ disabled }: TableProps) => {
  const columns: TableColumn<Record<string, any>>[] = [
    {
      name: 'Network',
      sortable: true,
      selector: (row) => row.network,
      format: (row) =>
        ChainIdToNameEnum[row.network as keyof typeof ChainIdToNameEnum]
          ? ChainIdToNameEnum[row.network as keyof typeof ChainIdToNameEnum]
          : '-',
      compact: true,
    },
    {
      name: 'Category',
      sortable: true,
      selector: (row) => row.category,
      format: (row) => (row.category ? row.category : '-'),
      compact: true,
    },
    {
      name: 'Name',
      sortable: true,
      selector: (row) => row.name,
      format: (row) => (row.name ? row.name : '-'),
      compact: true,
    },
    {
      name: 'Precondition',
      sortable: true,
      selector: (row) => row.precondition,
      format: (row) => (row.precondition ? row.precondition : '-'),
      compact: true,
    },
    {
      name: 'From',
      sortable: true,
      selector: (row) => row.from,
      format: (row) => (row.from ? shortenEthWallet(row.from) : '-'),
      compact: true,
    },
    {
      name: 'To',
      sortable: true,
      selector: (row) => row.to,
      format: (row) => (row.to ? shortenEthWallet(row.to) : '-'),
      compact: true,
    },
    {
      name: 'Interval',
      sortable: true,
      selector: (row) => row.interval,
      format: (row) => `${row.intervalHours} hours`,
      compact: true,
    },
    {
      name: 'Contract Address',
      sortable: true,
      selector: (row) => row.contractAddress,
      format: (row) => row.contractAddress || '-',
      compact: true,
    },
    {
      name: 'Amount',
      sortable: true,
      selector: (row) => row.amount,
      format: (row) => `${row.amount ? row.amount : 'Any'}`,
      compact: true,
    },
    {
      name: 'Url',
      sortable: true,
      selector: (row) => row.url,
      format: (row) => row.url || '-',
      compact: true,
    },
  ];

  return (
    <Table
      columns={columns}
      data={predefinedMonitors}
      title={'Preconfigured Monitors'}
      disabled={disabled}
    />
  );
};
