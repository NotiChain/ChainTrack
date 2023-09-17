import { panel, text } from '@metamask/snaps-ui';
import { create } from './create';

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
        text('Would you like to monitor sepolia-faucet.pk910.de?'),
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

  const network = await window.ethereum.request({ method: 'eth_chainId' });
  if (network !== '0xaa36a7') {
    throw new Error('Network is not sepolia');
  }
  // Get the wallet address, from which we expect to have transactions
  // TODO: add validation for wallet address
  const FAUCET_WALLET = '0x6Cc9397c3B38739daCbfaA68EaD5F5D77Ba5F455';
  const wallets = await window.ethereum.request({
    method: 'eth_requestAccounts',
  });

  console.log('!!!!! wallets', wallets);

  // TODO: add validation for interval
  // TODO: add selector
  /*
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
  if (typeof intervalHours !== 'string') {
    throw new Error('Interval is not a string');
  }
  */
  const intervalHours = '24';
  console.log('!!!!! intervalHours', intervalHours);

  for (const wallet of wallets) {
    await create('pk910', network, FAUCET_WALLET, wallet, intervalHours);
  }
}
