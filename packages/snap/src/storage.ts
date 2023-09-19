export enum ChainEnum {
  'sepolia' = '0xaa36a7',
  'mainnet' = '0x1',
  'goerli' = '0x5',
}

type BaseMonitor = {
  network: ChainEnum;
  intervalHours: string;
  intervalMs?: number;
  lastTransaction?: number;
};

type FromOnlyMonitor = BaseMonitor & {
  from: string;
  to?: null;
};

type ToOnlyMonitor = BaseMonitor & {
  from?: null;
  to: string;
};

export type FromToMonitor = BaseMonitor & {
  from: string;
  to: string;
};

export type Monitor = FromOnlyMonitor | ToOnlyMonitor | FromToMonitor;

export type Alert = Monitor & {
  date?: string;
};

export type Monitors = Monitor[];

export type Alerts = Alert[];

export type Data = {
  monitors?: Monitors;
  alerts?: Alerts;
};

export class Storage {
  async get(): Promise<Data> {
    console.log('Storage.get()');
    const data = await snap.request({
      method: 'snap_manageState',
      params: { operation: 'get' },
    });
    return (
      data || {
        monitors: [],
        alerts: [],
      }
    );
  }

  async set(data: Data): Promise<void> {
    console.log('Storage.set()', data);
    await snap.request({
      method: 'snap_manageState',
      params: { operation: 'update', newState: data },
    });
  }

  async clear(): Promise<void> {
    console.log('Storage.clear()');
    await snap.request({
      method: 'snap_manageState',
      params: { operation: 'clear' },
    });
  }

  async getMonitors(): Promise<Monitors> {
    console.log('Storage.getMonitors()');
    const data = await this.get();
    return data.monitors || [];
  }

  async addMonitor(monitor: Monitor): Promise<void> {
    console.log('Storage.addMonitor()', monitor);
    const data = await this.get();
    if (!data.monitors) {
      data.monitors = [];
    }
    data.monitors.push(monitor);
    await this.set(data);
  }

  async getAlerts(): Promise<Alerts> {
    console.log('Storage.getAlerts()');
    const data = await this.get();
    return data.alerts || [];
  }

  async addAlert(alert: Alert): Promise<void> {
    console.log('Storage.addAlert()', alert);
    const data = await this.get();
    if (!data.alerts) {
      data.alerts = [];
    }
    data.alerts.push(alert);
    await this.set(data);
  }
}

export default new Storage();
