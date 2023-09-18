export type ChainId = '0xaa36a7' | '0x1' | '0x5';

export type DataItem = {
  // can not be longer than 14 characters to fit in the notification
  name?: string;
  network?: ChainId;
  from?: string;
  to?: string;
  intervalHours?: string;
  intervalMs?: number;
};

export type Data = {
  monitors?: DataItem[];
  // each element is an index of a monitor
  sentAlerts?: number[];
};

export class Storage {
  /**
   * Get the current snap state.
   */
  async get(): Promise<Data> {
    console.log('Storage.get');
    const data = await snap.request({
      method: 'snap_manageState',
      params: { operation: 'get' },
    });
    return data || {};
  }

  /**
   * Update the snap state.
   *
   * @param data - The new snap state.
   */
  async set(data: Data): Promise<void> {
    console.log('Storage.set', data);
    await snap.request({
      method: 'snap_manageState',
      params: { operation: 'update', newState: data },
    });
  }

  /**
   * Clear the snap state.
   */
  async clear(): Promise<void> {
    console.log('Storage.clear');
    await snap.request({
      method: 'snap_manageState',
      params: { operation: 'clear' },
    });
  }
}

export default new Storage();
