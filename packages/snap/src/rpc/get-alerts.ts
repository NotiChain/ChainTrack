import storage from '../storage';
import { Alerts } from '../../../shared/types';

/**
 * Handle incoming JSON-RPC requests, sent through `wallet_invokeSnap`.
 */
export async function getAlerts(): Promise<Alerts> {
  const alerts = await storage.getAlerts();
  return alerts;
}
