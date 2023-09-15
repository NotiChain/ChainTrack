import storage, { Data, DataItem } from '../storage';

/**
 * Handle incoming JSON-RPC requests, sent through `wallet_invokeSnap`.
 *
 * @param network - The network to be tracked.
 * @param wallet - The wallet address to be tracked.
 * @param intervalHours - The interval in hours to check for transactions.
 */
export async function create(
  network: string,
  wallet: string,
  intervalHours: string,
): Promise<void> {
  const intervalMs = Number(intervalHours) * 60 * 60 * 1000;

  const snapData: Data = await storage.get();
  if (!snapData.track) {
    snapData.track = [];
  }

  const snapDataItem: DataItem = {
    network,
    from: wallet,
    intervalMs,
    intervalHours,
  };
  // TODO: check for duplicates before adding
  snapData.track.push(snapDataItem);
  console.log('!!!!! snapDataItem', snapDataItem);

  await storage.set(snapData);
}
