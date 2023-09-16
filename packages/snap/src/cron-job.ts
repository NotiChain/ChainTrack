import storage, { DataItem } from './storage';
import etherscan, { Transaction } from './etherscan';

export class CronJob {
  constructor() {
    console.log('CronJob constructor');
  }

  async process(ctx: { request: { method: string } }) {
    const data = await storage.get();

    console.log('CronJob process');

    if (ctx.request.method !== 'everyMinute') {
      throw new Error('Method not found.');
    }

    if (!data?.track) {
      console.log('CronJob process no tracks found');
      return;
    }

    for (const track of data.track) {
      await this.checkTrack(track);
    }
  }

  async checkTrack(track: DataItem) {
    if (!track?.network || !track?.to || !track?.from || !track?.intervalMs) {
      console.log('CronJob process not all data provided: ', track);
      return;
    }

    const transaction = await this.getLastTransaction(track);

    if (transaction) {
      console.log('CronJob.checkTrack transaction found');
      // compare time
      const transactionTime = new Date(transaction.timestamp * 1000).getTime();
      const diff = Date.now() - transactionTime;
      if (diff < track.intervalMs) {
        console.log('CronJob.checkTrack transaction found in time');
        return;
      }
    }

    await snap.request({
      method: 'snap_notify',
      params: {
        type: 'native',
        // type: 'inApp',
        // can not be longer than 50 characters
        message: `Expected transaction not found!`,
      },
    });
  }

  async getLastTransaction(track: DataItem): Promise<Transaction | undefined> {
    if (!track?.network) {
      console.log('CronJob.getLastTransaction network is not provided');
      return undefined;
    }

    if (!track?.to) {
      console.log('CronJob.getLastTransaction to is not provided');
      return undefined;
    }

    const transactions = await etherscan.getTransactions(
      track.to,
      track.network,
    );

    const filteredTransactions = transactions.filter(
      (transaction: Transaction) => {
        return transaction.to === track.to && transaction.from === track.from;
      },
    );

    if (!filteredTransactions.length) {
      console.log('CronJob.getLastTransaction no transactions found');
      return undefined;
    }

    return filteredTransactions[0];
  }
}

export default new CronJob();
