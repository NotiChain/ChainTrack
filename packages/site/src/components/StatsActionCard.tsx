import * as React from 'react';

import { Typography } from '@mui/material';
import { Alerts, Monitors } from '../../../shared/types';
import { ActionCard } from './ActionCard';

type StatsActionCardProps = {
  monitors: Monitors;
  alerts: Alerts;
};

export function StatsActionCard({ monitors, alerts }: StatsActionCardProps) {
  const description = [
    <Typography
      variant="h4"
      color="text.secondary"
      key="monitors"
    >{`Transactions to monitor: ${monitors.length}`}</Typography>,
    <Typography
      variant="h4"
      color="text.secondary"
      key="alerts"
    >{`Alerts sent: ${alerts.length}`}</Typography>,
    <Typography
      variant="h4"
      color="text.secondary"
      key="time"
    >{`Time with us: 0 days, 1 hour and 3 seconds`}</Typography>,
    <Typography
      variant="h4"
      color="text.secondary"
      key="time"
    >{`Background checks: 123456 times`}</Typography>,
  ];
  const content = {
    title: 'Stats',
    description,
  };

  return <ActionCard content={content}></ActionCard>;
}
