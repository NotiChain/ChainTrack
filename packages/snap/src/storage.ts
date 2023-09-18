export type ChainId = '0xaa36a7' | '0x1' | '0x5';

export type DataItem = {
  network?: ChainId;
  from?: string;
  to?: string;
  intervalHours?: string;
  intervalMs?: number;
  lastTransaction?: number;
};

export type Data = {
  track?: DataItem[];
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
