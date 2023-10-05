import * as React from 'react';
import { ActionCard } from './ActionCard';
import { MyButton } from './Button';

type DebugActionCardProps = {
  handleResetClick: () => void;
  handleReloadClick: () => void;
  handleConnectClick: () => void;
  handleAddClick: () => void;
};

export function DebugActionCard({
  handleResetClick,
  handleReloadClick,
  handleConnectClick,
  handleAddClick,
}: DebugActionCardProps) {
  const buttons = [
    <MyButton mykey="reset" key="reset" onClick={handleResetClick}>
      Reset
    </MyButton>,
    <MyButton mykey="reload" key="reload" onClick={handleReloadClick}>
      Reload
    </MyButton>,
    <MyButton mykey="reconnect" key="reconnect" onClick={handleConnectClick}>
      Reconnect
    </MyButton>,
    <MyButton mykey="reconnect" key="send_add" onClick={handleAddClick}>
      SendAdd
    </MyButton>,
  ];

  const content = {
    title: 'Debug',
    description: `This is a debug card. It's only visible in development mode.`,
    buttons,
  };

  return <ActionCard content={content} />;
}
