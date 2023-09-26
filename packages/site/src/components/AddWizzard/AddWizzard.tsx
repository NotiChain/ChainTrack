import React, { FC } from 'react';
import { Wizard } from 'react-use-wizard';
import { addMonitor } from '../../utils';
import { ChainEnum, Monitor } from '../../../../shared-types';
import { TransactionNameStep } from './TransactionNameStep';
import { TransactionFromStep } from './TranactionFromStep';
import { TransactionToStep } from './TransactionToStep';
import { IntervalStep } from './IntervalStep';
import { AmountStep } from './AmountStep';
import { ContractAdressStep } from './ContractAdressStep';

export type WizzardProps = {
  onClose: () => void;
  loadData: () => void;
};

const Meme = () => <div>haha</div>;

export type addParams = {
  name?: string;
  from?: string;
  to?: string;
  intervalHours: string;
  amount?: number;
  contractAddress?: string | null;
};

export const AddWizzard: FC<WizzardProps> = (props) => {
  const { onClose, loadData } = props;

  const assemblingData: Monitor = {
    name: '',
    from: '',
    to: '',
    intervalHours: '',
    amount: undefined,
    contractAddress: null,
    network: ChainEnum.goerli,
    intervalMs: 100000000,
  };

  const handleEnd = async () => {
    console.log(assemblingData);
    onClose();
    await addMonitor(assemblingData);
    await loadData();
  };

  return (
    <div>
      <Wizard startIndex={0}>
        <TransactionNameStep
          assemblingData={assemblingData}
          onClose={onClose}
        />
        <TransactionFromStep
          assemblingData={assemblingData}
          onClose={onClose}
        />
        <TransactionToStep assemblingData={assemblingData} onClose={onClose} />
        <IntervalStep assemblingData={assemblingData} onClose={onClose} />
        <AmountStep assemblingData={assemblingData} onClose={onClose} />
        <ContractAdressStep
          assemblingData={assemblingData}
          handleEnd={handleEnd}
        />
      </Wizard>
    </div>
  );
};
