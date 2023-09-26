import { panel, heading, text, copyable } from '@metamask/snaps-ui';
import { ChainEnum } from '../../../shared-types';
import { create } from './create';

/**
 * Handle incoming JSON-RPC requests, sent through `wallet_invokeSnap`.
 *
 * @returns Nothing.
 */
export async function add(): Promise<void> {
  // just a hello screen
  /*
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
  */

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
  if (typeof intervalHours !== 'string') {
    throw new Error('Interval is not a string');
  }

  let from = await snap.request({
    method: 'snap_dialog',
    params: {
      type: 'prompt',
      content: panel([
        heading('Please enter from of the monitor'),
        heading('!!!WITHOUT 0x PREFIX!!!'),
      ]),
    },
  });
  if (typeof from !== 'string') {
    throw new Error('From is not a string');
  }
  from = `0x${from}`;

  const name = await snap.request({
    method: 'snap_dialog',
    params: {
      type: 'prompt',
      content: panel([heading('Please enter the name of the monitor')]),
    },
  });
  if (typeof name !== 'string') {
    throw new Error('Name is not a string');
  }

  let contractAddress = await snap.request({
    method: 'snap_dialog',
    params: {
      type: 'prompt',
      content: panel([
        heading('Contract Address'),
        text('Please enter the token to monitor, or leave empty for eth'),
        text('in case of Eth leave it empty'),
      ]),
    },
  });
  if (typeof contractAddress !== 'string') {
    throw new Error('ContractAddress is not a string');
  }

  if (contractAddress.length > 0) {
    contractAddress = `0x${contractAddress}`;
  } else {
    contractAddress = null;
  }

  for (const wallet of wallets) {
    await create({
      name,
      network,
      to: wallet,
      from,
      intervalHours,
      contractAddress,
    });
  }
}
