import storage from '../storage';
import { Monitor } from '../../../shared/types';

export type UpdateParams = {
  item: Monitor;
};

export async function update({ item }: UpdateParams) {
  if (!item) {
    throw new Error('Invalid item');
  }

  const snapData = await storage.get();

  const index = snapData.monitors.findIndex(
    (monitor) => monitor.id === item.id,
  );

  if (index === -1) {
    throw new Error('Monitor not found');
  }

  snapData.monitors[index] = item;

  await storage.set(snapData);
}
