import * as React from 'react';

import { Snap } from '../types';
import { ActionCard } from './ActionCard';
import { MyButton } from './Button';

type ConnectActionCardProps = {
  installedSnap?: Snap;
  handleSendAddClick: () => void;
};

const phrases = [
  'Start Monitoring Now! Add Your Transaction and Rest Easy with ChainTrack.',
  'Never Miss Out! Add Your Transaction to ChainTrack for Seamless Monitoring.',
  'Stay Informed! Add Your Transaction and Let ChainTrack Keep the Watch.',
  'Be Alerted on Time, Every Time! Add Your Transaction to ChainTrack Now!',
  'Keep Your Transactions in Check! Add Them to ChainTrack for Real-Time Alerts.',
  'Add Your Transaction Now! Let ChainTrack Be Your Eyes on Every Transfer.',
  'Ensure Every Transaction Counts! Add It to ChainTrack for Unmatched Monitoring.',
  'Get Instant Alerts for Missed Transactions! Add Yours to ChainTrack Now!',
  "Add Your Transaction and Experience Peace of Mind with ChainTrack's Monitoring.",
  'Don’t Let a Transaction Slip Away! Add It to ChainTrack for Constant Monitoring.',
];

const description = phrases[Math.floor(Math.random() * phrases.length)];

export function AddMonitorActionCard({
  installedSnap,
  handleSendAddClick,
}: ConnectActionCardProps) {
  const buttons = [
    <MyButton onClick={handleSendAddClick} disabled={!installedSnap}>
      Add Transaction
    </MyButton>,
  ];

  const content = {
    title: 'Add Transaction',
    description,
    buttons,
  };

  return <ActionCard content={content}></ActionCard>;
}
