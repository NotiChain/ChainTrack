import * as React from 'react';
import { Button } from '@mui/material';
import { ActionCard } from './ActionCard';

type DebugActionCardProps = {
  handleResetClick: () => void;
  handleReloadClick: () => void;
  handleConnectClick: () => void;
};

export function DebugActionCard({
  handleResetClick,
  handleReloadClick,
  handleConnectClick,
}: DebugActionCardProps) {
  const buttons = [
    <Button
      key="reset"
      onClick={handleResetClick}
      size="large"
      variant="outlined"
    >
      Reset
    </Button>,
    <Button
      key="reload"
      onClick={handleReloadClick}
      size="large"
      variant="outlined"
    >
      Reload
    </Button>,
    <Button
      key="reconnect"
      onClick={handleConnectClick}
      size="large"
      variant="outlined"
    >
      Reconnect
    </Button>,
  ];

  const content = {
    title: 'Debug',
    description: `This is a debug card. It's only visible in development mode.`,
    buttons,
  };

  return <ActionCard content={content} />;
}
