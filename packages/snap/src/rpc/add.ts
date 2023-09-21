import { panel, heading, text, copyable } from '@metamask/snaps-ui';
import { ChainIdToNameEnum } from '../storage';
import { create } from './create';

/**
 * Handle incoming JSON-RPC requests, sent through `wallet_invokeSnap`.
 *
 * @returns Nothing.
 */
export async function add(): Promise<void> {
  const network = await window.ethereum.request<keyof typeof ChainIdToNameEnum>(
    {
      method: 'eth_chainId',
    },
  );

  if (!network) {
    throw new Error('Network is not provided');
  }

  // Get the network, from which we expect to have transactions
  const networkConfirmed = await snap.request({
    method: 'snap_dialog',
    params: {
      type: 'confirmation',
      content: panel([
        heading('Network'),
        text('We using the network you have selected in MetaMask'),
        text('Current network is:'),
        heading(
          ChainIdToNameEnum[network] ? ChainIdToNameEnum[network] : network,
        ),
      ]),
    },
  });

  if (!networkConfirmed) {
    throw new Error('Network is not confirmed');
  }

  // Get the wallet address, from which we expect to have transactions
  // TODO: add validation for wallet address
  const wallets = await window.ethereum.request<string[]>({
    method: 'eth_requestAccounts',
  });

  if (!wallets || wallets.length === 0) {
    throw new Error('Wallets are not provided');
  }

  let name = await snap.request({
    method: 'snap_dialog',
    params: {
      type: 'prompt',
      content: panel([
        heading('Name'),
        text('Please enter the name of this recurring transactions'),
      ]),
    },
  });

  if (typeof name !== 'string') {
    name = 'Untitled';
  }

  const from = await snap.request({
    method: 'snap_dialog',
    params: {
      type: 'prompt',
      content: panel([
        heading('From Wallet'),
        text(
          'Please enter the wallet address, from which you expect to have transactions',
        ),
      ]),
    },
  });
  if (typeof from !== 'string') {
    throw new Error('From is not a string');
  }

  const intervalHours = await snap.request({
    method: 'snap_dialog',
    params: {
      type: 'prompt',
      content: panel([
        heading('Interval'),
        text(
          'Please enter the interval in hours, how often you expect to have transactions',
        ),
        copyable('24'),
      ]),
    },
  });

  if (typeof intervalHours !== 'string') {
    throw new Error('Interval is not a string');
  }

  if (isNaN(parseInt(intervalHours, 10))) {
    throw new Error('Interval is not a number');
  }

  if (parseInt(intervalHours, 10) < 1) {
    throw new Error('Interval can not be less than 1 hour');
  }

  let contractAddress = await snap.request({
    method: 'snap_dialog',
    params: {
      type: 'prompt',
      content: panel([
        heading('Contract Address'),
        text('By default we monitor ETH transactions.'),
        text(
          'If you want to monitor other ERC-20 tokens transactions, please enter the contract address',
        ),
      ]),
    },
  });

  if (typeof contractAddress !== 'string') {
    throw new Error('ContractAddress is not a string');
  }

  if (contractAddress.length === 0) {
    // ETH contract address
    contractAddress = '0x2170Ed0880ac9A755fd29B2688956BD959F933F8';
  }

  let amount = await snap.request({
    method: 'snap_dialog',
    params: {
      type: 'prompt',
      content: panel([
        heading('Amount'),
        text(
          'Please enter the amount of tokens to be transferred in each transaction',
        ),
        text('You can leave it empty to expect any amount to be transferred'),
        copyable('0.1'),
      ]),
    },
  });

  if (typeof amount !== 'string') {
    throw new Error('Amount is not a string');
  }

  if (amount.length === 0) {
    amount = '0';
  } else {
    if (isNaN(parseInt(amount, 10))) {
      throw new Error('Interval is not a number');
    }

    if (parseInt(amount, 10) < 0) {
      throw new Error('Amount can not be less than 0');
    }
  }

  for (const wallet of wallets) {
    await create({
      name,
      network,
      from,
      to: wallet,
      intervalHours,
      contractAddress,
      amount: parseInt(amount, 10),
    });
  }
}
