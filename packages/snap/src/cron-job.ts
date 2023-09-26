import { panel, text } from '@metamask/snaps-ui';
import { Monitor } from '../../shared-types';
import storage, { monitorEq } from './storage';
import etherscan, { Transaction } from './etherscan';

function alertExpired(alert: { date: string; monitor: Monitor }): boolean {
  const date = new Date(alert.date);
  const diff = Date.now() - date.getTime();
  if (diff < alert.monitor.intervalMs) {
    return false;
  }
  return true;
}

type NotificationType = 'inApp' | 'native';

// message cannot be longer than 50 characters
export async function snapNotify(type: NotificationType, message: string) {
  try {
    await snap.request({
      method: 'snap_notify',
      params: {
        type,
        message,
      },
    });
    return true;
  } catch (e) {
    console.log('Notification error', e);
  }
  return false;
}

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
        const found = data.alerts?.find((alert) => {
          return monitorEq(alert.monitor, monitor);
        });
        if (!found) {
          const notificationSent = await snapNotify(
            'native',
            `Expected transaction from ${monitor.name} not found`,
          );

          // if no error, then notification was sent
          if (notificationSent) {
            await storage.addAlert({
              monitor,
              date: new Date().toISOString(),
              confirmed: false,
            });
          }
        } else if (found && alertExpired(found) && !found.confirmed) {
          const confirm = await snap.request({
            method: 'snap_dialog',
            params: {
              type: 'confirmation',
              content: panel([
                text(`You didn't receive transaction from ${monitor.name}`),
                text('Would you like to NOT receive another notification?'),
              ]),
            },
          });

          if (confirm) {
            found.confirmed = true;
            await storage.set(data);
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
      return false;
    }

    console.log('CronJob.checkMonitor transaction found');
    // compare time
    const transactionTime = new Date(transaction.timeStamp * 1000).getTime();
    const diff = Date.now() - transactionTime;

    if (diff < monitor.intervalMs) {
      console.log('CronJob.checkMonitor transaction found in time');
      return false;
    }

    return true;
  }

  async getLastMatchingTransaction(
    monitor: Monitor,
  ): Promise<Transaction | undefined> {
    if (!monitor?.network) {
      console.log('CronJob.getLastMatchingTransaction network is not provided');
      return undefined;
    }

    const monitorAddress: string | null | undefined =
      monitor.to || monitor.from;

    if (!monitorAddress) {
      console.log(
        'CronJob.getLastMatchingTransaction from and to are not provided',
      );
      return undefined;
    }

    const transactions = await etherscan.getTransactions(
      monitorAddress,
      monitor.network,
      monitor.contractAddress,
    );

    if (!transactions) {
      console.log(
        'CronJob.getLastMatchingTransaction returned error (probably rate limit)',
      );
      return undefined;
    }

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
