import { ChainId } from './storage';

export type Transaction = {
  from: string;
  to: string;
  value: number;
  timestamp: number;
};

export class Etherscan {
  readonly chains: Record<ChainId, string>;

  constructor() {
    console.log('Etherscan constructor');
    this.chains = {
      '0xaa36a7': 'api-sepolia.etherscan.io',
      '0x5': 'api-goerli.etherscan.io',
      '0x1': 'api.etherscan.io',
    };
  }

  async getTransactions(
    walletAddress: string,
    chain: ChainId,
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
