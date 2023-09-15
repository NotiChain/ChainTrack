import { panel, heading, text } from '@metamask/snaps-ui';
import storage from '../storage';

/**
 * Handle incoming JSON-RPC requests, sent through `wallet_invokeSnap`.
 */
export async function reset() {
  const confirm = await snap.request({
    method: 'snap_dialog',
    params: {
      type: 'confirmation',
      content: panel([
        heading('Are you sure?'),
        text('This will reset all the data.'),
      ]),
    },
  });
  if (confirm) {
    // reset snap state
    await storage.clear();
  }
}
