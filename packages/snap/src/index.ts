import { OnRpcRequestHandler, OnCronjobHandler } from '@metamask/snaps-types';

import cronJob from './cron-job';
import {
  add,
  create,
  update,
  del,
  reset,
  getAlerts,
  getUserStats,
  getMonitors,
  CreateParams,
  UpdateParams,
  DeleteParams,
} from './rpc';

export const onRpcRequest: OnRpcRequestHandler = async ({ request }) => {
  switch (request.method) {
    case 'add':
      await add();
      break;

    case 'create':
      await create(request.params as CreateParams);
      break;

    case 'get_monitors':
      return await getMonitors();

    case 'get_alerts':
      return await getAlerts();

    case 'get_user_stats':
      return await getUserStats();

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

export const onCronjob: OnCronjobHandler = async (ctx) => {
  console.log('onCronjob', ctx);
  await cronJob.process(ctx);
};
