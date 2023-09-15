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
    !snapData.track ||
    !Array.isArray(snapData.track) ||
    snapData.track.length < index
  ) {
    return;
  }

  snapData.track[index] = item;

  await storage.set(snapData);
}
