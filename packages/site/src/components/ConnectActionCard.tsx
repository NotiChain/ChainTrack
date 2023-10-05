import * as React from 'react';

import { shouldDisplayReconnectButton } from '../utils';
import { Snap } from '../types';
import { ActionCard } from './ActionCard';
import { MyButton } from './Button';
import { MetamaskFoxLogo } from './MetamaskFoxLogo';

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
    <MyButton
      onClick={handleConnectClick}
      disabled={!isMetaMaskReady}
      startIcon={<MetamaskFoxLogo />}
    >
      Reconnect
    </MyButton>
  ) : (
    <MyButton
      onClick={handleConnectClick}
      disabled={!isMetaMaskReady}
      startIcon={<MetamaskFoxLogo />}
    >
      Connect
    </MyButton>
  );

  const content = {
    title: 'Connect',
    description:
      'Get started by connecting to and installing the example snap.',
    button,
  };

  return <ActionCard content={content}></ActionCard>;
}
