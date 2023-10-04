import { v4 as uuidv4 } from 'uuid';
import storage, { Data } from '../storage';
import { Monitor } from '../../../shared/types';

export type CreateParams = Omit<Monitor, 'intervalMs' | 'lastTransaction'>;

export async function create({
  id,
  name,
  network,
  from,
  to,
  intervalHours,
  contractAddress,
  amount,
  url,
  precondition,
  category,
}: CreateParams): Promise<void> {
  if (!network) {
    throw new Error('Network is required');
  }

  if (!from && !to) {
    throw new Error('From or To is required');
  }

  if (!intervalHours) {
    throw new Error('Interval is required');
  }

  const intervalMs = Number(intervalHours) * 60 * 60 * 1000;

  const snapData: Data = await storage.get();

  if (!snapData.monitors) {
    snapData.monitors = [];
  }

  const snapDataItem = {
    id: id || uuidv4(),
    name,
    network,
    from,
    to,
    intervalMs,
    intervalHours,
    contractAddress,
    amount,
    url,
    precondition,
    category,
  } as Monitor;

  const existing = snapData.monitors.find((item) => {
    if (item.network !== network) {
      return false;
    }

    if (item.amount && !amount) {
      return false;
    }

    if (item.intervalHours !== intervalHours) {
      return false;
    }

    if (from && !to) {
      return item.network === network && item.from === from;
    }

    if (!from && to) {
      return item.network === network && item.to === to;
    }

    if (from && to) {
      return item.network === network && item.from === from && item.to === to;
    }

    return false;
  });

  if (existing) {
    throw new Error('Monitor already exists');
  }

  await storage.addMonitor(snapDataItem);
}
