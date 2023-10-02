import * as React from 'react';
import { Button } from '@mui/material';
import { ActionCard } from './ActionCard';

type DebugActionCardProps = {
  handleResetClick: () => void;
  handleReloadClick: () => void;
};

export function DebugActionCard({
  handleResetClick,
  handleReloadClick,
}: DebugActionCardProps) {
  const buttons = [
    <Button key="reset" onClick={handleResetClick} size="large">
      Reset
    </Button>,
    <Button key="reload" onClick={handleReloadClick} size="large">
      Reload
    </Button>,
  ];

  const content = {
    title: 'Debug',
    description: `This is a debug card. It's only visible in development mode.`,
    buttons,
  };

  return <ActionCard content={content} />;
}
