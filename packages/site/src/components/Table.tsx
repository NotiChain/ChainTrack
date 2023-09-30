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
  columns: TableColumn<Record<string, any>>[];
  disabled?: boolean;
};

const Title = styled.p`
  //font-size: ${(props) => props.theme.fontSizes.title};
  font-weight: bold;
  margin: 0;
  margin-left: 1.2rem;
`;

const TableWrapper = styled.div<{ disabled?: boolean }>`
  display: flex;
  flex-direction: column;
  width: 100%;
  //background-color: ${({ theme }) => theme.colors.card.default};
  margin-top: 2.4rem;
  margin-bottom: 2.4rem;
  padding: 2.4rem;
  //border: 1px solid ${({ theme }) => theme.colors.border.default};
  //border-radius: ${({ theme }) => theme.radii.default};
  //box-shadow: ${({ theme }) => theme.shadows.default};
  filter: opacity(${({ disabled }) => (disabled ? 0.4 : 1)});
  align-self: stretch;
`;

export const Table = ({ title, data, columns, disabled }: TableProps) => {
  const themePreference = getThemePreference();
  const theme = useTheme();

  createTheme(
    'custom',
    {
      text: {
        // primary: theme.colors.text.alternative,
        // secondary: theme.colors.text.alternative,
      },
      background: {
        // default: theme.colors.background.alternative,
      },
      context: {
        background: '#cb4b16',
        text: '#FFFFFF',
      },
      divider: {
        // default: theme.colors.border.default,
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
    },
    themePreference ? 'dark' : 'light',
  );

  return (
    <TableWrapper disabled={disabled}>
      <Title>{title}</Title>
      <DataTable
        disabled={disabled}
        theme="custom"
        columns={columns}
        data={data}
        selectableRows
      />
    </TableWrapper>
  );
};
