export enum ChainNameToIdEnum {
  'sepolia' = '0xaa36a7',
  'mainnet' = '0x1',
  'goerli' = '0x5',
}

export enum ChainIdToNameEnum {
  '0xaa36a7' = 'sepolia',
  '0x1' = 'mainnet',
  '0x5' = 'goerli',
}

export enum Preconditions {
  'BrightID' = 'BrightID',
  'MainnetBalance' = 'Mainnet Balance',
  'AlchemyAccount' = 'Alchemy Account',
  'ENS' = 'ENS',
}

export enum MonitorCategory {
  'Faucet' = 'Faucet',
  'Bridge' = 'Bridge',
  'DEX' = 'DEX',
  'DAPP' = 'DAPP',
}

type BaseMonitor = {
  name?: string;
  network: keyof typeof ChainIdToNameEnum;
  intervalHours: string;
  intervalMs?: number;
  lastTransaction?: number;
  contractAddress?: string;
  amount?: number;
  url?: string;
  precondition?: Preconditions;
  category?: MonitorCategory;
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
