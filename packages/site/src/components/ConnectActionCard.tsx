import * as React from 'react';

import { shouldDisplayReconnectButton } from '../utils';
import { Snap } from '../types';
import { ActionCard } from './ActionCard';
import { ConnectButton, ReconnectButton } from './Buttons';

type ConnectActionCardProps = {
  isMetaMaskReady: boolean;
  installedSnap?: Snap;
  handleConnectClick: () => void;
};

export function ConnectActionCard({
  isMetaMaskReady,
  installedSnap,
  handleConnectClick,
}: ConnectActionCardProps) {
  const showReconnect = Boolean(shouldDisplayReconnectButton(installedSnap));

  const button = showReconnect ? (
    <ReconnectButton
      onClick={handleConnectClick}
      disabled={!isMetaMaskReady}
      variant="contained"
      color="primary"
    >
      Reconnect
    </ReconnectButton>
  ) : (
    <ConnectButton
      onClick={handleConnectClick}
      disabled={!isMetaMaskReady}
      variant="contained"
      color="primary"
    >
      Connect
    </ConnectButton>
  );

  const content = {
    title: 'Connect',
    description:
      'Get started by connecting to and installing the example snap.',
    button,
  };

  return <ActionCard content={content}></ActionCard>;
}
