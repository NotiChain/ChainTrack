export enum ChainEnum {
  'sepolia' = '0xaa36a7',
  'mainnet' = '0x1',
  'goerli' = '0x5',
}

type BaseMonitor = {
  name: string;
  network: ChainEnum;
  amount?: number;
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

type FromToMonitor = BaseMonitor & {
  from: string;
  to: string;
};

export type Monitor = FromOnlyMonitor | ToOnlyMonitor | FromToMonitor;

export type Monitors = Monitor[];

export type Alert = {
  monitor: Monitor;
  date: string;
  confirmed: boolean;
};

export type Alerts = Alert[];
