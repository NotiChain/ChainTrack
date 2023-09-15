import { panel, heading, text, copyable } from '@metamask/snaps-ui';
import storage, { Data, DataItem } from '../storage';
/**
 * Handle incoming JSON-RPC requests, sent through `wallet_invokeSnap`.
 *
 * @param origin - The origin of the request.
 * @returns Nothing.
 */
export async function onboard(origin: string): Promise<void> {
  // just a hello screen
  const confirm = await snap.request({
    method: 'snap_dialog',
    params: {
      type: 'confirmation',
      content: panel([
        text(`Hello, **${origin}**!`),
        text('Welcome to our transaction tracker snap!'),
        text('We want to ask you for some information to get started.'),
      ]),
    },
  });

  if (!confirm) {
    return;
  }

  const snapDataItem: DataItem = {};

  // Get the network, from which we expect to have transactions
  // TODO: add validation for network
  // TODO: load networks from somewhere
  // TODO: add selector
  // const network = await snap.request({
  //   method: 'snap_dialog',
  //   params: {
  //     type: 'prompt',
  //     content: panel([
  //       heading('What is the network we should track?'),
  //       text('Please enter the network to be monitored'),
  //       copyable('sepolia'),
  //     ]),
  //     placeholder: 'sepolia',
  //   },
  // });

  const network = 'sepolia';
  console.log('!!!!! network', network);
  if (typeof network === 'string') {
    snapDataItem.network = network;
  }

  // Get the wallet address, from which we expect to have transactions
  // TODO: add validation for wallet address
  const walletAddress = await snap.request({
    method: 'snap_dialog',
    params: {
      type: 'prompt',
      content: panel([
        heading('What is the wallet address we should track?'),
        text('Please enter the wallet address to be monitored'),
      ]),
      placeholder: '0x123...',
    },
  });
  console.log('!!!!! walletAddress', walletAddress);
  if (typeof walletAddress !== 'string') {
    throw new Error('Wallet address is not a string');
  }

  snapDataItem.from = walletAddress;

  // TODO: add validation for interval
  // TODO: add selector
  const intervalHours = await snap.request({
    method: 'snap_dialog',
    params: {
      type: 'prompt',
      content: panel([
        heading('What is the interval in hours?'),
        text('Please enter the interval in hours'),
        copyable('24'),
      ]),
      placeholder: '24',
    },
  });
  console.log('!!!!! intervalHours', intervalHours);
  if (typeof intervalHours !== 'string') {
    throw new Error('Interval is not a string');
  }

  snapDataItem.intervalHours = intervalHours;
  snapDataItem.intervalMs = Number(intervalHours) * 60 * 60 * 1000;

  const snapData: Data = await storage.get();
  if (!snapData.track) {
    snapData.track = [];
  }
  snapData.track.push(snapDataItem);

  await storage.set(snapData);
}
