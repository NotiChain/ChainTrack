import storage from '../storage';

export type DeleteParams = {
  index: number;
};

export async function del({ index }: DeleteParams) {
  if (typeof index !== 'number') {
    throw new Error('Invalid index');
  }

  const snapData = await storage.get();

  if (!snapData?.monitors || !snapData?.monitors[index]) {
    throw new Error('Monitor does not exist');
  }

  snapData.monitors.splice(index, 1);

  await storage.set(snapData);
}
