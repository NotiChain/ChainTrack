import {
  OnRpcRequestHandler,
  OnCronjobHandler,
  OnTransactionHandler,
} from '@metamask/snaps-types';
import { panel, heading, text } from '@metamask/snaps-ui';

import storage from './storage';
import { list, reset, onboard, update, del } from './rpc';

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

  switch (request.method) {
    case 'onboard':
      await onboard(origin);
      break;

    case 'list':
      await list();
      break;

    case 'reset':
      await reset();
      break;

    case 'update': {
      if (!request.params) {
        throw new Error('Params not found.');
      }

      if (!request.params.index) {
        throw new Error('Index not found.');
      }

      if (!request.params.item) {
        throw new Error('Item not found.');
      }
      const { index } = request.params;
      const { item } = request.params;
      await update(index, item);
      break;
    }

    case 'delete': {
      if (!request.params) {
        throw new Error('Params not found.');
      }

      if (!request.params.index) {
        throw new Error('Index not found.');
      }
      const { index } = request.params;
      await del(index);
      break;
    }

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
