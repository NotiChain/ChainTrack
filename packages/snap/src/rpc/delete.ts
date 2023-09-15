import storage from '../storage';

/**
 * Handle incoming JSON-RPC requests, sent through `wallet_invokeSnap`.
 *
 * @param index - The index of the item to be deleted.
 */
export async function del(index: number) {
  const snapData = await storage.get();
  console.log('!!!!! delete', snapData, 'index', index);
  if (
    !snapData.track ||
    !Array.isArray(snapData.track) ||
    snapData.track.length < index
  ) {
    return;
  }

  snapData.track.splice(index, 1);

  await storage.set(snapData);
}
