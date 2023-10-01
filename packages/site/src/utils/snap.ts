import { MetaMaskInpageProvider } from '@metamask/providers';
import { defaultSnapOrigin } from '../config';
import { GetSnapsResponse, Snap } from '../types';
import { Alerts, Monitor, Monitors } from '../../../shared/types';

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
      request: { method: 'create', params: monitor },
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

// Initiates reset process on snap - removes all the data in snap's storage
export const sendReset = async (): Promise<void> => {
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
export const sendUpdate = async ({
  index,
  item,
}: UpdateParams): Promise<void> => {
  await window.ethereum.request({
    method: 'wallet_invokeSnap',
    params: {
      snapId: defaultSnapOrigin,
      request: { method: 'update', params: { index, item } },
    },
  });
};

// Initiates delete process on snap
export const sendDelete = async ({
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
