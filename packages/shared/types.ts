export enum ChainNameToIdEnum {
  'Sepolia' = '0xaa36a7',
  'Mainnet' = '0x1',
  'Goerli' = '0x5',
  'Arbitrum' = '0xa4b1',
  'Arbitrum-Goerli' = '0x66eed',
  'Matic' = '0x89',
  'Maticum' = '0x13881',
  'Optimism' = '0xa',
  'Optimism-Goerli' = '0x7a',
}

export enum ChainIdToNameEnum {
  '0xaa36a7' = 'Sepolia',
  '0x1' = 'Mainnet',
  '0x5' = 'Goerli',
  '0xa4b1' = 'Arbitrum',
  '0x66eed' = 'Arbitrum-Goerli',
  '0x89' = 'Matic',
  '0x13881' = 'Maticum',
  '0xa' = 'Optimism',
  '0x7a' = 'Optimism-Goerli',
}

export type ChainIds = keyof typeof ChainIdToNameEnum;
export type ChainNames = keyof typeof ChainNameToIdEnum;

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
  id: string;
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

export type UserStats = {
  snapAddedDate?: string;
  totalBackgroundRuns?: number;
  totalBackgroundChecks?: number;
};
