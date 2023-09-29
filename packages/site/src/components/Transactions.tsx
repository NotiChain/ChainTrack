import { TableColumn } from 'react-data-table-component';

import { Table } from './Table';

type DataRow = Record<string, string | number | null | undefined>;

type TableProps = {
  title: string;
  data: DataRow[];
  disabled?: boolean;
};

function shortenEthWallet(wallet: string) {
  return `${wallet.slice(0, 6)}...${wallet.slice(-4)}`;
}

export const TransactionsTable = ({ title, data, disabled }: TableProps) => {
  const columns: TableColumn<Record<string, any>>[] = [
    {
      name: 'Id',
      sortable: true,
      selector: (row) => row.id,
    },
    {
      name: 'Name',
      sortable: true,
      selector: (row) => row.name,
      format: (row) => (row.name ? row.name : '-'),
      grow: 2,
      compact: true,
    },
    {
      name: 'From',
      sortable: true,
      selector: (row) => row.from,
      format: (row) => (row.from ? shortenEthWallet(row.from) : '-'),
      grow: 2,
    },
    {
      name: 'To',
      sortable: true,
      selector: (row) => row.to,
      format: (row) => (row.to ? shortenEthWallet(row.to) : '-'),
      grow: 2,
    },
    {
      name: 'Interval',
      sortable: true,
      selector: (row) => row.interval,
      format: (row) => `${row.intervalHours} hours`,
    },
    {
      name: 'Last Transaction',
      sortable: true,
      selector: (row) => row.lastTransaction,
      format: (row) => `${new Date(row.lastTransaction).toLocaleString()}`,
    },
    {
      name: 'Contract Address',
      sortable: true,
      selector: (row) => row.contractAddress,
      format: (row) => `${row.contractAddress}`,
    },
    {
      name: 'Amount',
      sortable: true,
      selector: (row) => row.amount,
      format: (row) => `${row.amount ? row.amount : 'Any'}`,
    },
    {
      name: 'Url',
      sortable: true,
      selector: (row) => row.url,
      format: (row) => (row.url ? `<a href="${row.url}">${row.url}</a>` : '-'),
    },
  ];

  return (
    <Table columns={columns} data={data} title={title} disabled={disabled} />
  );
};
