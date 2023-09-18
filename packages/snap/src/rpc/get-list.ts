import storage from '../storage';

/**
 * Handle incoming JSON-RPC requests, sent through `wallet_invokeSnap`.
 */
export async function getList() {
  const snapData = await storage.get();
  console.log('!!!!! list', snapData);
  if (!snapData.track) {
    snapData.track = [];
  }

  return snapData.track;
}
