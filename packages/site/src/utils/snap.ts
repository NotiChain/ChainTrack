import { MetaMaskInpageProvider } from '@metamask/providers';
import { v4 as uuidv4 } from 'uuid';
import { defaultSnapOrigin } from '../config';
import { GetSnapsResponse, Snap } from '../types';
import { Alerts, Monitor, Monitors, UserStats } from '../../../shared/types';

/**
 * Get the installed snaps in MetaMask.
 *
 * @param provider - The MetaMask inpage provider.
 * @returns The snaps installed in MetaMask.
 */
export const getSnaps = async (
  provider?: MetaMaskInpageProvider,
): Promise<GetSnapsResponse> =>
  (await (provider ?? window.ethereum).request({
    method: 'wallet_getSnaps',
  })) as unknown as GetSnapsResponse;
/**
 * Connect a snap to MetaMask.
 *
 * @param snapId - The ID of the snap.
 * @param params - The params to pass with the snap to connect.
 */
export const connectSnap = async (
  snapId: string = defaultSnapOrigin,
  params: Record<'version' | string, unknown> = {},
) => {
  await window.ethereum.request({
    method: 'wallet_requestSnaps',
    params: {
      [snapId]: params,
    },
  });
};

/**
 * Get the snap from MetaMask.
 *
 * @param version - The version of the snap to install (optional).
 * @returns The snap object returned by the extension.
 */
export const getSnap = async (version?: string): Promise<Snap | undefined> => {
  try {
    const snaps = await getSnaps();

    return Object.values(snaps).find(
      (snap) =>
        snap.id === defaultSnapOrigin && (!version || snap.version === version),
    );
  } catch (e) {
    console.log('Failed to obtain installed snap', e);
    return undefined;
  }
};

// Initiates add monitor process on snap
export const sendAdd = async (): Promise<void> => {
  await window.ethereum.request({
    method: 'wallet_invokeSnap',
    params: { snapId: defaultSnapOrigin, request: { method: 'add' } },
  });
};

// Adds monitor to snap
export const addMonitor = async (monitor: Monitor): Promise<void> => {
  await window.ethereum.request({
    method: 'wallet_invokeSnap',
    params: {
      snapId: defaultSnapOrigin,
      request: { method: 'create', params: { ...monitor, id: uuidv4() } },
    },
  });
};

// responds with monitors on snap
export const getMonitors = async (): Promise<Monitors> => {
  const monitors = await window.ethereum.request<Monitors>({
    method: 'wallet_invokeSnap',
    params: { snapId: defaultSnapOrigin, request: { method: 'get_monitors' } },
  });

  if (!monitors) {
    return [];
  }

  return monitors as Monitors;
};

// responds with alerts on snap
export const getAlerts = async (): Promise<Alerts> => {
  const alerts = await window.ethereum.request<Alerts>({
    method: 'wallet_invokeSnap',
    params: { snapId: defaultSnapOrigin, request: { method: 'get_alerts' } },
  });

  if (!alerts) {
    return [];
  }

  return alerts as Alerts;
};

// responds with userStats on snap
export const getUserStats = async (): Promise<UserStats> => {
  const userStats = await window.ethereum.request<UserStats>({
    method: 'wallet_invokeSnap',
    params: {
      snapId: defaultSnapOrigin,
      request: { method: 'get_user_stats' },
    },
  });

  if (!userStats) {
    return {};
  }

  return userStats as UserStats;
};

// Initiates reset process on snap - removes all the data in snap's storage
export const resetData = async (): Promise<void> => {
  await window.ethereum.request({
    method: 'wallet_invokeSnap',
    params: { snapId: defaultSnapOrigin, request: { method: 'reset' } },
  });
};

export type UpdateParams = {
  index: number;
  item: Monitor;
};

// Initiates update process on snap
export const updateMonitor = async ({
  index,
  item,
}: UpdateParams): Promise<void> => {
  console.log(index, item);
  await window.ethereum.request({
    method: 'wallet_invokeSnap',
    params: {
      snapId: defaultSnapOrigin,
      request: { method: 'update', params: { index, item } },
    },
  });
};

// Initiates delete process on snap
export const deleteMonitor = async ({
  index,
}: {
  index: number;
}): Promise<void> => {
  await window.ethereum.request({
    method: 'wallet_invokeSnap',
    params: {
      snapId: defaultSnapOrigin,
      request: { method: 'delete', params: { index } },
    },
  });
};

export const isLocalSnap = (snapId: string) => snapId.startsWith('local:');

const snap = {
  getSnaps,
  connectSnap,
  getSnap,
  sendAdd,
  addMonitor,
  getMonitors,
  getAlerts,
  resetData,
  updateMonitor,
  deleteMonitor,
  isLocalSnap,
};

export default snap;
