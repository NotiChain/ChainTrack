export enum ChainNameToIdEnum {
  'sepolia' = '0xaa36a7',
  'mainnet' = '0x1',
  'goerli' = '0x5',
  'arbitrum' = '0xa4b1',
  'arbitrum-goerli' = '0x66eed',
  'matic' = '0x89',
  'maticum' = '0x13881',
  'optimism' = '0xa',
  'optimism-goerli' = '0x7a',
}

export enum ChainIdToNameEnum {
  '0xaa36a7' = 'sepolia',
  '0x1' = 'mainnet',
  '0x5' = 'goerli',
  '0xa4b1' = 'arbitrum',
  '0x66eed' = 'arbitrum-goerli',
  '0x89' = 'matic',
  '0x13881' = 'maticum',
  '0xa' = 'optimism',
  '0x7a' = 'optimism-goerli',
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

export type PredefinedMonitor = Omit<Monitor, 'lastTransaction'>;

export type PredefinedMonitors = PredefinedMonitor[];

export type Alerts = Alert[];
