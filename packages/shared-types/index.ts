export enum ChainEnum {
  'sepolia' = '0xaa36a7',
  'mainnet' = '0x1',
  'goerli' = '0x5',
}

type BaseMonitor = {
  name?: string;
  network: ChainEnum;
  intervalHours: string;
  intervalMs: number;
  contractAddress: string | null;
  amount?: number;
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

export type Alert = {
  monitor: Monitor;
  date: string;
  confirmed: boolean;
};

export type Monitors = Monitor[];

export type Alerts = Alert[];

export type PredefinedMonitor = Omit<Monitor, 'lastTransaction'>;

export type PredefinedMonitors = PredefinedMonitor[];
