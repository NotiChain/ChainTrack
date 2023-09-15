import {
  OnRpcRequestHandler,
  OnCronjobHandler,
  OnTransactionHandler,
} from '@metamask/snaps-types';
import { panel, heading, text, copyable } from '@metamask/snaps-ui';

import storage from './storage';

/**
 * Handle incoming JSON-RPC requests, sent through `wallet_invokeSnap`.
 *
 * @param args - The request handler args as object.
 * @param args.origin - The origin of the request, e.g., the website that
 * invoked the snap.
 * @param args.request - A validated JSON-RPC request object.
 * @returns The result of `snap_dialog`.
 * @throws If the request method is not valid for this snap.
 */
export const onRpcRequest: OnRpcRequestHandler = async ({
  origin,
  request,
}) => {
  console.log('!!!! onRpcRequest args', origin, request);

  // let's get data from snap state first, just to proceed from where we left off
  let snapData = await storage.get();

  switch (request.method) {
    case 'reset':
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
      break;
    case 'hello':
      // We need to get some data from user - what wallet to track, what network, and time interval
      // TODO: add many wallets support

      // just a hello screen
      await snap.request({
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

      if (!snapData?.network) {
        // Get the network, from which we expect to have transactions
        // TODO: add validation for network
        // TODO: load networks from somewhere
        // TODO: add selector
        const network = await snap.request({
          method: 'snap_dialog',
          params: {
            type: 'prompt',
            content: panel([
              heading('What is the network we should track?'),
              text('Please enter the network to be monitored'),
              copyable('sepolia'),
            ]),
            placeholder: 'sepolia',
          },
        });
        console.log('!!!!! network', network);
        snapData = {
          ...snapData,
          network,
        };

        await storage.set(snapData);
      }

      if (!snapData?.from) {
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
        snapData = {
          ...snapData,
          from: walletAddress,
        };

        await storage.set(snapData);
      }

      if (!snapData?.intervalMs) {
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
        snapData = {
          ...snapData,
          intervalHours,
          intervalMs: intervalHours * 60 * 60 * 1000,
        };

        await storage.set(snapData);
      }

      break;
    default:
      throw new Error('Method not found.');
  }
};

export const onCronjob: OnCronjobHandler = async (params) => {
  console.log('!!!!! onCronjob', params);
  const snapData = await storage.get();

  switch (params.request.method) {
    case 'everyMinute':
      if (
        !snapData?.track?.network ||
        !snapData?.track?.from ||
        !snapData?.track?.intervalMs
      ) {
        return;
      }

      if (
        snapData.track.lastTransaction <
        Date.now() - snapData.track.intervalMs
      ) {
        return;
      }

      await snap.request({
        method: 'snap_notify',
        params: {
          type: 'native',
          // can not be longer than 50 characters
          message: `Expected transaction not found!`,
        },
      });
      break;
    default:
      throw new Error('Method not found.');
  }
};

export const onTransaction: OnTransactionHandler = async ({
  transaction,
  chainId,
  transactionOrigin,
}) => {
  console.log('!!!!! onTransaction', transaction, chainId, transactionOrigin);
  const insight = `It's a scammer!`;
  return {
    content: panel([
      heading('My Transaction Insights'),
      text('Here are the insights:'),
      insight,
    ]),
  };
};
