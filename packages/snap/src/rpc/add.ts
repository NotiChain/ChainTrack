import { panel, heading, text, copyable, divider } from '@metamask/snaps-ui';
import { ChainIdToNameEnum } from '../../../shared/types';
import { create } from './create';

function sanitizeString(str: string): string {
  return str
    .replace(/[\r\n]/gmu, '')
    .replace(/\s+/gu, ' ')
    .trim();
}

function validateAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/u.test(address);
}

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
        heading('Network Selection'),
        text("ChainTrack syncs with the network you've chosen in MetaMask."),
        text('Currently Connected Network:'),
        heading(
          ChainIdToNameEnum[network] ? ChainIdToNameEnum[network] : network,
        ),
        text('Stay aligned with ChainTrack for seamless transaction tracking!'),
      ]),
    },
  });

  if (!networkConfirmed) {
    throw new Error('Network is not confirmed');
  }

  const wallets = await window.ethereum.request<string[]>({
    method: 'eth_requestAccounts',
  });

  if (!wallets || wallets.length === 0) {
    throw new Error('Wallets are not provided');
  }

  const sanitizedWallets = wallets.map((wallet) => {
    if (typeof wallet !== 'string') {
      throw new Error('Wallet is not a string');
    }
    return sanitizeString(wallet);
  });

  for (const wallet of sanitizedWallets) {
    if (!validateAddress(wallet)) {
      throw new Error('Wallet address is invalid');
    }
  }

  let name = await snap.request({
    method: 'snap_dialog',
    params: {
      type: 'prompt',
      content: panel([
        heading('Monitor Name'),
        text(
          'Enter a name for this recurring transaction monitor to easily identify it later.',
        ),
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
        heading('Source Wallet Address'),
        text(
          'Enter the wallet address from which you anticipate transactions.',
        ),
        text(
          'You can leave it empty if you want to track transactions from any address.',
        ),
      ]),
    },
  });

  if (typeof from !== 'string') {
    throw new Error('From is not a string');
  }

  if (from.length !== 0 && !validateAddress(from)) {
    throw new Error('From address is invalid');
  }

  const intervalHours = await snap.request({
    method: 'snap_dialog',
    params: {
      type: 'prompt',
      content: panel([
        heading('Check Interval'),
        text(
          'Please enter the check interval in hours, how often you expect to have transactions',
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

  let contractAddress: string | boolean | null | undefined = await snap.request(
    {
      method: 'snap_dialog',
      params: {
        type: 'prompt',
        content: panel([
          heading('Contract Address'),
          text('By default we monitor ETH transactions.'),
          text(
            'By default, ChainTrack monitors ETH transactions. To track transactions of another ERC-20 token, please enter its contract address.',
          ),
        ]),
      },
    },
  );

  if (typeof contractAddress !== 'string') {
    throw new Error('ContractAddress is not a string');
  }

  contractAddress = sanitizeString(contractAddress);

  if (contractAddress.length !== 0 && !validateAddress(contractAddress)) {
    throw new Error('ContractAddress is invalid');
  }

  if (contractAddress.length === 0) {
    contractAddress = undefined;
  }

  let amount = await snap.request({
    method: 'snap_dialog',
    params: {
      type: 'prompt',
      content: panel([
        heading('Token Amount'),
        text('Specify the number of tokens expected in each transaction.'),
        text(
          "If you're open to tracking any transfer amount, simply leave this field blank.",
        ),
        copyable('0.1'),
      ]),
    },
  });

  if (typeof amount !== 'string') {
    throw new Error('Amount is not a string');
  }

  amount = sanitizeString(amount);

  if (amount.length === 0) {
    amount = '0';
  } else {
    if (isNaN(parseInt(amount, 10))) {
      throw new Error('Amount is not a number');
    }

    if (parseFloat(amount) < 0) {
      throw new Error('Amount can not be less than 0');
    }
  }

  for (const wallet of sanitizedWallets) {
    await create({
      name,
      network,
      from,
      to: wallet,
      intervalHours,
      contractAddress,
      amount: parseFloat(amount),
    });
  }

  await snap.request({
    method: 'snap_dialog',
    params: {
      type: 'alert',
      content: panel([
        heading('Success!'),
        heading('Monitor Name'),
        text(name),
        heading('Network'),
        text(ChainIdToNameEnum[network]),
        heading('Source Address'),
        text(from),
        heading(`Destination ${wallets.length > 1 ? 'Addresses' : 'Address'}`),
        text(wallets.join(', ')),
        heading('Check Interval'),
        text(`Every ${intervalHours} hours`),
        heading('Token Amount'),
        text(amount === '0' ? 'Any' : amount),
        divider(),
        text(
          `Your monitor is now set up and will keep track of transactions based on the criteria above. Stay informed with ChainTrack!`,
        ),
      ]),
    },
  });
}
