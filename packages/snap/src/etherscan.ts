import { ChainIdToNameEnum, ChainNameToIdEnum } from './storage';

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
    contractAddress: string,
  ): Promise<Transaction[] | null> {
    if (!this.chains[chain]) {
      console.log('Etherscan.getTransactions chain is not found');
      return [];
    }

    const host = this.chains[chain];

    // TODO: limit with block numbers
    const request =
      contractAddress === '0x2170Ed0880ac9A755fd29B2688956BD959F933F8'
        ? `https://${host}/api?module=account&action=txlist&address=${walletAddress}&sort=desc`
        : `https://${host}/api?module=account&action=tokentx&contractaddress=${contractAddress}&address=${walletAddress}&sort=desc`;

    const response = await fetch(request);

    const data = await response.json();
    console.log('Etherscan.getTransactions', data);
    if (data.status !== '1') {
      console.log('Etherscan.getTransactions status is not 1');
      return null;
    }
    return data.result;
  }
}

export default new Etherscan();
