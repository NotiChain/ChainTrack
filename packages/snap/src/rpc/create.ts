import storage, { ChainId, Data, DataItem } from '../storage';

/**
 * Handle incoming JSON-RPC requests, sent through `wallet_invokeSnap`.
 *
 * @param name - The name of the monitor.
 * @param network - The network to be tracked.
 * @param from - The wallet address to be tracked.
 * @param wallet - The wallet address to be tracked.
 * @param intervalHours - The interval in hours to check for transactions.
 */
export async function create(
  name: string,
  network: ChainId,
  from: string,
  wallet: string,
  intervalHours: string,
): Promise<void> {
  const intervalMs = Number(intervalHours) * 60 * 60 * 1000;

  const snapData: Data = await storage.get();
  if (!snapData.monitors) {
    snapData.monitors = [];
  }

  const snapDataItem: DataItem = {
    name,
    network,
    from,
    to: wallet,
    intervalMs,
    intervalHours,
  };
  // TODO: check for duplicates before adding
  snapData.monitors.push(snapDataItem);
  console.log('!!!!! snapDataItem', snapDataItem);

  await storage.set(snapData);
}
