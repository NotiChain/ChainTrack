import storage, { Monitors } from '../storage';

/**
 * Handle incoming JSON-RPC requests, sent through `wallet_invokeSnap`.
 */
export async function getMonitors(): Promise<Monitors> {
  const monitors = await storage.getMonitors();

  return monitors;
}
