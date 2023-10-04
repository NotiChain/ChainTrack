import * as React from 'react';
import { ActionCard } from './ActionCard';
import { MyButton } from './Button';

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
    <MyButton key="reset" onClick={handleResetClick}>
      Reset
    </MyButton>,
    <MyButton key="reload" onClick={handleReloadClick}>
      Reload
    </MyButton>,
    <MyButton key="reconnect" onClick={handleConnectClick}>
      Reconnect
    </MyButton>,
  ];

  const content = {
    title: 'Debug',
    description: `This is a debug card. It's only visible in development mode.`,
    buttons,
  };

  return <ActionCard content={content} />;
}
