import storage from '../storage';
import { UserStats } from '../../../shared/types';

/**
 * Handle incoming JSON-RPC requests, sent through `wallet_invokeSnap`.
 */
export async function getUserStats(): Promise<UserStats> {
  const userStats = await storage.getUserStats();

  return userStats;
}
