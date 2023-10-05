import storage from '../storage';

export type DeleteParams = {
  id: string;
};

export async function del({ id }: DeleteParams) {
  if (!id) {
    throw new Error('Monitor ID is required');
  }

  const snapData = await storage.get();

  const index = snapData.monitors.findIndex((monitor) => monitor.id === id);

  if (index === -1) {
    throw new Error('Monitor not found');
  }

  snapData.monitors.splice(index, 1);

  await storage.set(snapData);
}
