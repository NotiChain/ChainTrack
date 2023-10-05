import {
  Alert,
  Alerts,
  Monitor,
  Monitors,
  UserStats,
} from '../../shared/types';

export type Data = {
  monitors: Monitors;
  alerts: Alerts;
  userStats: UserStats;
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

    return {
      monitors: (data?.monitors as Monitors) || [],
      alerts: (data?.alerts as Alerts) || [],
      userStats: (data?.userStats as UserStats) || {},
    };
  }

  async set(data: Data): Promise<void> {
    console.log('Storage.set()', data);
    try {
      await snap.request({
        method: 'snap_manageState',
        params: { operation: 'update', newState: data },
      });
    } catch (err) {
      console.error('Storage.set() error', err);
      throw err;
    }
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
    // remove all undefined keys
    for (const key of Object.keys(monitor)) {
      const prop = key as keyof Monitor;
      if (monitor[prop] === undefined) {
        delete monitor[prop];
      }
    }
    const data = await this.get();
    if (!data.monitors) {
      data.monitors = [];
    }
    data.monitors.push(monitor);
    await this.set(data);
  }

  async updateMonitor(monitor: Monitor): Promise<void> {
    console.log('Storage.updateMonitor()', monitor);
    const data = await this.get();
    if (!data.monitors) {
      data.monitors = [];
    }
    const index = data.monitors.findIndex((m) => m.id === monitor.id);
    if (index === -1) {
      throw new Error('Monitor not found');
    }
    data.monitors[index] = monitor;
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

  async getUserStats(): Promise<UserStats> {
    console.log('Storage.getUserStats()');
    const data = await this.get();
    return data.userStats || {};
  }

  async setUserStats(userStats: UserStats): Promise<void> {
    console.log('Storage.setUserStats()', userStats);
    const data = await this.get();
    data.userStats = { ...data.userStats, ...userStats };
    await this.set(data);
  }
}

const storage = new Storage();
export default storage;
