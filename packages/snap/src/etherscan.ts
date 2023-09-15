import { Chain } from './storage';

export type Transaction = {
  from: string;
  to: string;
  value: number;
  timestamp: number;
};

export class Etherscan {
  readonly chains: Record<Chain, string>;

  constructor() {
    console.log('Etherscan constructor');
    this.chains = {
      sepolia: 'api-sepolia.etherscan.io',
      goerli: 'api-goerli.etherscan.io',
      mainnet: 'api.etherscan.io',
    };
  }

  async getTransactions(
    walletAddress: string,
    chain: Chain,
  ): Promise<Transaction[]> {
    if (!this.chains[chain]) {
      console.log('Etherscan.getTransactions chain is not found');
      return;
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
