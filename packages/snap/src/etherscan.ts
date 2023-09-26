import { ChainEnum } from './storage';

export type Transaction = {
  from: string;
  to: string;
  value: number;
  timeStamp: number;
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
    contractAddress: string | null,
  ): Promise<Transaction[] | null> {
    if (!this.chains[chain]) {
      console.log('Etherscan.getTransactions chain is not found');
      return [];
    }

    const host = this.chains[chain];
    const { ETHERSCAN_API_KEY } = process?.env || {};
    const ETHERSCAN_API_KEY_QUERY = ETHERSCAN_API_KEY
      ? `&apiKey=${ETHERSCAN_API_KEY}`
      : '';

    // TODO: limit with block numbers
    const request =
      contractAddress === null
        ? `https://${host}/api?module=account&action=txlist&address=${walletAddress}&sort=desc${ETHERSCAN_API_KEY_QUERY}`
        : `https://${host}/api?module=account&action=tokentx&contractaddress=${contractAddress}&address=${walletAddress}&sort=desc${ETHERSCAN_API_KEY_QUERY}`;

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
