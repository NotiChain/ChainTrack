import storage, { DataItem } from '../storage';

/**
 * Handle incoming JSON-RPC requests, sent through `wallet_invokeSnap`.
 *
 * @param index - The index of the item to be updated.
 * @param item - New item.
 */
export async function update(index: number, item: DataItem) {
  const snapData = await storage.get();
  console.log('!!!!! update', snapData, 'index', index, 'item', item);
  if (
    !snapData.monitors ||
    !Array.isArray(snapData.monitors) ||
    snapData.monitors.length < index
  ) {
    return;
  }

  const prevItem = snapData.monitors[index];
  snapData.monitors[index] = item;

  // resend notifications only if the network or the wallet addresses changed
  if (
    prevItem.from !== item.from ||
    prevItem.to !== item.to ||
    prevItem.network !== item.network
  ) {
    snapData.sentAlerts = snapData.sentAlerts?.filter(
      (n) => n !== index,
    );
  }

  await storage.set(snapData);
}
