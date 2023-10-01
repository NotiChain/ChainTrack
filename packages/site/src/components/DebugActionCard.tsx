import * as React from 'react';
import { ActionCard } from './ActionCard';
import { ReloadButton, ResetButton } from './Buttons';

type DebugActionCardProps = {
  handleResetClick: () => void;
  handleReloadClick: () => void;
};

export function DebugActionCard({
  handleResetClick,
  handleReloadClick,
}: DebugActionCardProps) {
  const buttons = [
    <ResetButton key="reset" onClick={handleResetClick} />,
    <ReloadButton key="reload" onClick={handleReloadClick} />,
  ];

  const content = {
    title: 'Debug',
    description: `This is a debug card. It's only visible in development mode.`,
    buttons,
  };

  return <ActionCard content={content} />;
}
