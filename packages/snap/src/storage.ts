import { Alert, Alerts, Monitor, Monitors } from '../../shared-types';

export type Data = {
  monitors?: Monitors;
  alerts?: Alerts;
};

export function monitorEq(a: Monitor, b: Monitor): boolean {
  const keys = Object.keys(a) as (keyof Monitor)[];
  for (const key of keys) {
    if (a[key] !== b[key]) {
      return false;
    }
  }
  return true;
}

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
    console.log('Storage.set()', JSON.stringify(data, null, 2));
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
    // TODO: if alerts len exceeds some threshold, delete first
    data.alerts.push(alert);
    await this.set(data);
  }
}

const storage = new Storage();
export default storage;
