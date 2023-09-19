import storage, { Monitor, monitorEq } from './storage';
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
      const notify = await this.checkMonitor(monitor);
      if (notify) {
        if (data.alerts?.find((alert) => {
          // check date
          return monitorEq(alert.monitor, monitor);
        })) {
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
            await storage.addAlert({ monitor, date: new Date().toISOString() });
          } catch (e) {
            console.log('CronJob notification error', e);
          }
        }
      }
    }
  }

  async checkMonitor(monitor: Monitor): Promise<boolean> {
    if (!monitor?.network || !monitor?.to || !monitor?.intervalMs) {
      console.log('CronJob process not all data provided');
      return false;
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

  async getLastMatchingTransaction(monitor: Monitor): Promise<Transaction | undefined> {
    if (!monitor?.network) {
      console.log('CronJob.getLastMatchingTransaction network is not provided');
      return undefined;
    }

    if (!(monitor?.to || monitor?.from)) {
      console.log(
        'CronJob.getLastMatchingTransaction from and to are not provided',
      );
      return undefined;
    }

    const monitorAddress: string = monitor.to || monitor.from;

    const transactions = await etherscan.getTransactions(
      monitorAddress,
      monitor.network,
    );

    const filteredTransactions = transactions.filter(
      (transaction: Transaction) => {
        if (monitor.to && monitor.from) {
          return (
            transaction.to === monitor.to && transaction.from === monitor.from
          );
        } else if (monitor.to) {
          return transaction.to === monitor.to;
        } else if (monitor.from) {
          return transaction.from === monitor.from;
        }
        throw new Error('CronJob.getLastMatchingTransaction no address found');
      },
    );

    if (!filteredTransactions.length) {
      console.log('CronJob.getLastMatchingTransaction no transactions found');
      return undefined;
    }

    return filteredTransactions[0];
  }
}

export default new CronJob();
