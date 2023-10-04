import { ChainIdToNameEnum, ChainNameToIdEnum } from '../../shared/types';

export type Transaction = {
  from: string;
  to: string;
  value: number;
  timeStamp: number;
};

export class Etherscan {
  readonly chains: Record<ChainNameToIdEnum, string>;

  constructor() {
    console.log('Etherscan constructor');
    this.chains = {
      [ChainNameToIdEnum.sepolia]: 'api-sepolia.etherscan.io',
      [ChainNameToIdEnum.goerli]: 'api-goerli.etherscan.io',
      [ChainNameToIdEnum.mainnet]: 'api.etherscan.io',
    };
  }

  async getTransactions(
    walletAddress: string,
    chain: keyof typeof ChainIdToNameEnum,
    contractAddress?: string,
  ): Promise<Transaction[] | null> {
    if (!this.chains[chain]) {
      console.log('Etherscan.getTransactions chain is not found');
      return [];
    }

    const host = this.chains[chain];
    const { ETHERSCAN_API_KEY: etherscanApiKey = '' } = process.env || {};

    // TODO: limit with block numbers
    const request = contractAddress
      ? `https://${host}/api?module=account&action=tokentx&contractaddress=${contractAddress}&address=${walletAddress}&sort=desc&apiKey=${etherscanApiKey}`
      : `https://${host}/api?module=account&action=txlist&address=${walletAddress}&sort=desc&apiKey=${etherscanApiKey}`;

    try {
      const response = await fetch(request);

      const data = await response.json();
      console.log('Etherscan.getTransactions', data);
      if (data.status !== '1') {
        console.log('Etherscan.getTransactions status is not 1');
        return null;
      }
      return data.result;
    } catch (e) {
      console.error('Etherscan.getTransactions', e);
      return null;
    }
  }
}

const etherscan = new Etherscan();
export default etherscan;
