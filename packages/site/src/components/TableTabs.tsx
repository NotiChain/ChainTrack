import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import purple from '@mui/material/colors/purple';
import { Paper } from '@mui/material';
import {
  Alerts,
  Monitors,
  PredefinedMonitors,
  PredefinedMonitor,
} from '../../../shared/types';

import { MonitorsTable } from './MonitorsTable';
import { AlertsTable } from './AlertsTable';
import { PredefinedMonitorsTable } from './PredefinedMonitorsTable';

type TabPanelProps = {
  children?: React.ReactNode;
  index: number;
  value: number;
};

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

type TableTabsProps = {
  monitors: Monitors;
  alerts: Alerts;
  predefinedMonitors: PredefinedMonitors;
  openAddTransactionModal: (predefinedMonitor: PredefinedMonitor) => void;
};

export function TableTabs({
  monitors,
  alerts,
  predefinedMonitors,
  openAddTransactionModal,
}: TableTabsProps) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Paper
      elevation={3}
      sx={{
        width: '100%',
        border: 1,
        borderRadius: '16px',
        borderColor: purple[500],
        backgroundColor: 'background.paper',
      }}
    >
      <Box sx={{ borderBottom: 1, borderColor: purple[500] }}>
        <Tabs
          centered
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          textColor="secondary"
          indicatorColor="secondary"
          sx={{
            '& .MuiTabs-indicator': {
              backgroundColor: purple[500],
            },
          }}
        >
          <Tab label="Transactions" {...a11yProps(0)} />
          <Tab label="Alerts" {...a11yProps(1)} />
          <Tab label="Catalog" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <MonitorsTable
          monitors={monitors.map((item, index) => {
            return {
              id: index + 1,
              ...item,
            };
          })}
        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <AlertsTable
          alerts={alerts.map((item, index) => {
            return {
              id: index + 1,
              ...item,
            };
          })}
        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <PredefinedMonitorsTable
          predefinedMonitors={predefinedMonitors.map((item, index) => {
            return {
              id: index + 1,
              ...item,
            };
          })}
          openAddTransactionModal={(predefinedMonitor: PredefinedMonitor) => {
            openAddTransactionModal(predefinedMonitor);
          }}
        />
      </CustomTabPanel>
    </Paper>
  );
}
