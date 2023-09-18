import DataTable, {
  TableColumn,
  createTheme,
} from 'react-data-table-component';
import styled, { useTheme } from 'styled-components';
import { getThemePreference } from '../utils';

type DataRow = Record<string, string | number | null | undefined>;

type TableProps = {
  title: string;
  data: DataRow[];
};

function shortenEthWallet(wallet: string) {
  return `${wallet.slice(0, 6)}...${wallet.slice(-4)}`;
}

const Title = styled.p`
  font-size: ${(props) => props.theme.fontSizes.title};
  font-weight: bold;
  margin: 0;
  margin-left: 1.2rem;
  ${({ theme }) => theme.mediaQueries.small} {
    display: none;
  }
`;

const TableWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.background.alternative};
  border: 1px solid ${({ theme }) => theme.colors.border.default};
  color: ${({ theme }) => theme.colors.text.alternative};
  border-radius: ${({ theme }) => theme.radii.default};
  width: 100%;
  margin-top: 2.4rem;
  margin-bottom: 2.4rem;
  padding: 2.4rem;
`;

export const Table = ({ title, data }: TableProps) => {
  const themePreference = getThemePreference();
  const theme = useTheme();

  createTheme(
    'custom',
    {
      text: {
        primary: theme.colors.text.alternative,
        secondary: theme.colors.text.alternative,
      },
      background: {
        default: theme.colors.background.alternative,
      },
      context: {
        background: '#cb4b16',
        text: '#FFFFFF',
      },
      divider: {
        default: theme.colors.border.default,
      },
      button: {
        default: '#2aa198',
        hover: 'rgba(0,0,0,.08)',
        focus: 'rgba(255,255,255,.12)',
        disabled: 'rgba(255, 255, 255, .34)',
      },
      sortFocus: {
        default: '#2aa198',
      },
      borderRadius: theme.radii.default,
    },
    themePreference ? 'dark' : 'light',
  );

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
      format: (row) => shortenEthWallet(row.from),
      grow: 2,
    },
    {
      name: 'To',
      sortable: true,
      selector: (row) => row.to,
      format: (row) => shortenEthWallet(row.from),
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
    <TableWrapper>
      <Title>{title}</Title>
      <DataTable theme="custom" columns={columns} data={data} selectableRows />
    </TableWrapper>
  );
};
