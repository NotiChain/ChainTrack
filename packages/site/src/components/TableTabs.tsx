import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import { Alerts, Monitors, PredefinedMonitors } from '../../../shared/types';

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
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
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
};

export function TableTabs({
  monitors,
  alerts,
  predefinedMonitors,
}: TableTabsProps) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
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
        />
      </CustomTabPanel>
    </Box>
  );
}
