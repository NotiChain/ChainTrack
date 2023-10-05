import { Snap } from '../types';
import { isLocalSnap } from './snap';

export const shouldDisplayReconnectButton = (installedSnap?: Snap) => {
  // return false;
  return installedSnap && isLocalSnap(installedSnap?.id);
};
