import * as React from 'react';

import { Alerts, Monitors } from '../../../shared/types';
import { ActionCard } from './ActionCard';

type StatsActionCardProps = {
  monitors: Monitors;
  alerts: Alerts;
};

export function StatsActionCard({ monitors, alerts }: StatsActionCardProps) {
  const description = `You have ${monitors.length} monitors and ${alerts.length} alerts.`;
  const content = {
    title: 'Stats',
    description,
  };

  return <ActionCard content={content}></ActionCard>;
}
