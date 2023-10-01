import * as React from 'react';

import { Snap } from '../types';
import { ActionCard } from './ActionCard';
import { SendAddButton } from './Buttons';

type ConnectActionCardProps = {
  installedSnap: Snap;
  handleSendAddClick: () => void;
};

export function AddMonitorActionCard({
  installedSnap,
  handleSendAddClick,
}: ConnectActionCardProps) {
  const button = (
    <SendAddButton onClick={handleSendAddClick} disabled={!installedSnap} />
  );

  const content = {
    title: 'Add Transaction',
    description: 'Add transaction to monitor',
    button,
  };

  return <ActionCard content={content}></ActionCard>;
}
