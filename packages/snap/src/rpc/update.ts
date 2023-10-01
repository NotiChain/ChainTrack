import storage from '../storage';
import { Monitor } from '../../../shared/types';

export type UpdateParams = {
  index: number;
  item: Monitor;
};

export async function update({ index, item }: UpdateParams) {
  if (typeof index !== 'number') {
    throw new Error('Invalid index');
  }

  if (!item) {
    throw new Error('Invalid item');
  }

  const snapData = await storage.get();

  if (!snapData?.monitors || !snapData?.monitors[index]) {
    throw new Error('Monitor does not exist');
  }

  snapData.monitors[index] = item;

  await storage.set(snapData);
}
