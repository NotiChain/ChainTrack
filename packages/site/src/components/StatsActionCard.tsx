import * as React from 'react';
import { Typography } from '@mui/material';
// eslint-disable-next-line import/no-extraneous-dependencies
import moment from 'moment';

import { Alerts, Monitors, UserStats } from '../../../shared/types';
import { ActionCard } from './ActionCard';

type StatsActionCardProps = {
  monitors: Monitors;
  alerts: Alerts;
  userStats: UserStats;
};

export function StatsActionCard({
  monitors,
  alerts,
  userStats,
}: StatsActionCardProps) {
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
    >{`You've joined us: ${moment(
      userStats.snapAddedDate || Date.now(),
    ).fromNow()}`}</Typography>,
    <Typography
      variant="h4"
      color="text.secondary"
      key="runs"
    >{`Background runs: ${
      userStats.totalBackgroundRuns || 0
    } times`}</Typography>,
    <Typography
      variant="h4"
      color="text.secondary"
      key="checks"
    >{`Background checks: ${
      userStats.totalBackgroundChecks || 0
    } times`}</Typography>,
  ];
  const content = {
    title: 'Stats',
    description,
  };

  return <ActionCard content={content}></ActionCard>;
}
