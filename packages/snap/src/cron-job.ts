import storage, { Monitor } from './storage';
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

    if (!data?.monitors) {
      console.log('CronJob process no monitors found');
      return;
    }

    for (const monitor of data.monitors) {
      await this.checkMonitor(monitor);
    }
  }

  async checkMonitor(monitor: Monitor) {
    if (!monitor?.network || !monitor?.to || !monitor?.intervalMs) {
      console.log('CronJob process not all data provided');
      return;
    }

    const transaction = await this.getLastTransaction(monitor);

    if (transaction) {
      console.log('CronJob.checkMonitor transaction found');
      // compare time
      const transactionTime = new Date(transaction.timestamp * 1000).getTime();
      const diff = Date.now() - transactionTime;
      if (diff < monitor.intervalMs) {
        console.log('CronJob.checkMonitor transaction found in time');
        return;
      }
    }

    await storage.addAlert({ ...monitor, date: new Date().toISOString() });

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

  async getLastTransaction(monitor: Monitor): Promise<Transaction | undefined> {
    if (!monitor?.network) {
      console.log('CronJob.getLastTransaction network is not provided');
      return undefined;
    }

    if (!monitor?.to) {
      console.log('CronJob.getLastTransaction to is not provided');
      return undefined;
    }

    const transactions = await etherscan.getTransactions(
      monitor.to,
      monitor.network,
    );

    const filteredTransactions = transactions.filter(
      (transaction: Transaction) => {
        return (
          transaction.to === monitor.to && transaction.from === monitor.from
        );
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
