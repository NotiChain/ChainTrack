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
    !snapData.monitors ||
    !Array.isArray(snapData.monitors) ||
    snapData.monitors.length < index
  ) {
    return;
  }

  snapData.monitors.splice(index, 1);
  snapData.sentNotifications = snapData.sentNotifications?.filter(
    (n) => n !== index,
  );

  await storage.set(snapData);
}
