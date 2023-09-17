import { panel, text } from '@metamask/snaps-ui';
import storage from '../storage';

/**
 * Handle incoming JSON-RPC requests, sent through `wallet_invokeSnap`.
 */
export async function list() {
  const snapData = await storage.get();
  console.log('!!!!! list', snapData);
  if (!snapData.monitors) {
    snapData.monitors = [];
  }

  await snap.request({
    method: 'snap_dialog',
    params: {
      type: 'alert',
      content: panel(
        snapData.monitors.map((item) => {
          let { from } = item;
          if (!from) {
            from = 'empty from';
          }
          return text(from);
        }),
      ),
    },
  });
}
