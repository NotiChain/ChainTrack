import storage, { Alerts } from '../storage';

/**
 * Handle incoming JSON-RPC requests, sent through `wallet_invokeSnap`.
 */
export async function getAlerts(): Promise<Alerts> {
  const alerts = await storage.getAlerts();
  return alerts;
}
