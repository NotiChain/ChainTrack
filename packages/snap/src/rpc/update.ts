import storage from '../storage';
import { Monitor } from '../../../shared/types';

export type UpdateParams = {
  item: Monitor;
};

export async function update({ item }: UpdateParams) {
  if (!item) {
    throw new Error('Invalid item');
  }

  await storage.updateMonitor(item);
}
