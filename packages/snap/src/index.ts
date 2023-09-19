import {
  OnRpcRequestHandler,
  OnCronjobHandler,
  OnTransactionHandler,
} from '@metamask/snaps-types';
import { panel, heading, text } from '@metamask/snaps-ui';

import cronJob from './cron-job';
import {
  add,
  create,
  update,
  del,
  reset,
  getAlerts,
  getMonitors,
  CreateParams,
  UpdateParams,
  DeleteParams,
} from './rpc';

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
    case 'add':
      await add(origin);
      break;

    case 'create':
      await create(request.params as CreateParams);
      break;

    case 'get_monitors':
      return await getMonitors();

    case 'get_alerts':
      return await getAlerts();

    case 'reset':
      await reset();
      break;

    case 'update': {
      await update(request.params as UpdateParams);
      break;
    }

    case 'delete': {
      await del(request.params as DeleteParams);
      break;
    }

    default:
      throw new Error('Method not found.');
  }

  return null;
};

/**
 * Handle incoming cronjob requests, sent through `wallet_invokeSnap`.
 *
 * @param ctx - The cronjob handler args as object.
 */
export const onCronjob: OnCronjobHandler = async (ctx) => {
  console.log('onCronjob', ctx);
  await cronJob.process(ctx);
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
      text(insight),
    ]),
  };
};
