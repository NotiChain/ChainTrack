import { panel, heading, text, copyable } from '@metamask/snaps-ui';
import { ChainEnum } from '../storage';
import { create } from './create';

/**
 * Handle incoming JSON-RPC requests, sent through `wallet_invokeSnap`.
 *
 * @param origin - The origin of the request.
 * @returns Nothing.
 */
export async function add(origin: string): Promise<void> {
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

  const network = await window.ethereum.request<ChainEnum>({
    method: 'eth_chainId',
  });

  console.log('!!!!! network', network);

  if (!network) {
    throw new Error('Network is not provided');
  }

  // Get the wallet address, from which we expect to have transactions
  // TODO: add validation for wallet address
  const wallets = await window.ethereum.request<string[]>({
    method: 'eth_requestAccounts',
  });

  console.log('!!!!! wallets', wallets);

  if (!wallets) {
    throw new Error('Wallets are not provided');
  }

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

  for (const wallet of wallets) {
    await create({ network, to: wallet, from: '', intervalHours });
  }
}
