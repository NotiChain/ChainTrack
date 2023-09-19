import { ChainEnum } from './storage';

export type Transaction = {
  from: string;
  to: string;
  value: number;
  timestamp: number;
};

export class Etherscan {
  readonly chains: Record<ChainEnum, string>;

  constructor() {
    console.log('Etherscan constructor');
    this.chains = {
      [ChainEnum.sepolia]: 'api-sepolia.etherscan.io',
      [ChainEnum.goerli]: 'api-goerli.etherscan.io',
      [ChainEnum.mainnet]: 'api.etherscan.io',
    };
  }

  async getTransactions(
    walletAddress: string,
    chain: ChainEnum,
  ): Promise<Transaction[]> {
    if (!this.chains[chain]) {
      console.log('Etherscan.getTransactions chain is not found');
      return [];
    }

    const host = this.chains[chain];

    // TODO: limit with block numbers

    const response = await fetch(
      `https://${host}/api?module=account&action=txlist&address=${walletAddress}&sort=desc`,
    );

    const data = await response.json();
    console.log('Etherscan.getTransactions', data);
    return data.result;
  }
}

export default new Etherscan();
