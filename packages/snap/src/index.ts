import {
  OnRpcRequestHandler,
  OnCronjobHandler,
  OnTransactionHandler,
} from '@metamask/snaps-types';
import { panel, heading, text } from '@metamask/snaps-ui';

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
export const onRpcRequest: OnRpcRequestHandler = async (args) => {
  console.log('!!!! onRpcRequest args', args);
  const { origin, request } = args;

  switch (request.method) {
    case 'hello':
      // return snap.request({
      //   method: 'snap_dialog',
      //   params: {
      //     type: 'confirmation',
      //     content: panel([
      //       text(`Hello, **${origin}**!`),
      //       text('This custom confirmation is just for display purposes.'),
      //       text(
      //         'But you can edit the snap source code to make it do something, if you want to!',
      //       ),
      //     ]),
      //   },
      // });
      const walletAddress = await snap.request({
        method: 'snap_dialog',
        params: {
          type: 'prompt',
          content: panel([
            heading('What is the wallet address?'),
            text('Please enter the wallet address to be monitored'),
          ]),
          placeholder: '0x123...',
        },
      });
      console.log('!!!!! walletAddress', walletAddress);
      // Persist some data.
      await snap.request({
        method: 'snap_manageState',
        params: { operation: 'update', newState: { hello: 'world' } },
      });

      // At a later time, get the data stored.
      const persistedData = await snap.request({
        method: 'snap_manageState',
        params: { operation: 'get' },
      });

      console.log(persistedData);
      // { hello: 'world' }

      // If there's no need to store data anymore, clear it out.
      await snap.request({
        method: 'snap_manageState',
        params: { operation: 'clear' },
      });
      break;
    default:
      throw new Error('Method not found.');
  }
};

export const onCronjob: OnCronjobHandler = async (params) => {
  console.log('!!!!! onCronjob', params);

  switch (params.request.method) {
    case 'everyMinute':
      return await snap.request({
        method: 'snap_notify',
        params: {
          type: 'inApp',
          message: 'Hello, world!',
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
