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
  ];

  return (
    <Table columns={columns} data={data} title={title} disabled={disabled} />
  );
};
