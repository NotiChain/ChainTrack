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

    if (!data?.monitors) {
      console.log('CronJob process no monitors found');
      return;
    }

    if (!data?.sentNotifications) {
      data.sentNotifications = [];
    }

    console.log('CronJob process monitors', data.monitors);
    console.log('CronJob process sentNotifications', data.sentNotifications);
    for (const [i, monitor] of data.monitors.entries()) {
      const notify = await this.checkMonitor(monitor);
      if (notify) {
        if (data.sentNotifications.includes(i)) {
          console.log('CronJob notification already sent');
        } else {
          try {
            // here is a tricky part, because notification may not be sent because of
            // the rate limit, so we need to check weather it was sent or not
            await snap.request({
              method: 'snap_notify',
              params: {
                type: 'native',
                // type: 'inApp',
                // can not be longer than 50 characters
                message: `Expected transaction from ${monitor.name} not found`,
              },
            });
            // if no error, then notification was sent
            data.sentNotifications.push(i);
          } catch (e) {
            console.log('CronJob notification error', e);
          }
        }
      }

      if (!notify) {
        console.log('CronJob remove sent notification');
        data.sentNotifications = data.sentNotifications.filter((n) => n !== i);
      }
    }

    await storage.set(data);
  }

  async checkMonitor(monitor: DataItem): Promise<boolean> {
    if (
      !monitor?.network ||
      !monitor?.to ||
      !monitor?.from ||
      !monitor?.intervalMs
    ) {
      console.log('CronJob process not all data provided: ', monitor);
      throw new Error('CronJob process not all data provided');
    }

    const transaction = await this.getLastMatchingTransaction(monitor);

    if (!transaction) {
      return true;
    }

    console.log('CronJob.checkMonitor transaction found');
    // compare time
    const transactionTime = new Date(transaction.timestamp * 1000).getTime();
    const diff = Date.now() - transactionTime;
    if (diff < monitor.intervalMs) {
      console.log('CronJob.checkMonitor transaction found in time');
      return false;
    }

    return true;
  }

  async getLastMatchingTransaction(
    monitor: DataItem,
  ): Promise<Transaction | undefined> {
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
