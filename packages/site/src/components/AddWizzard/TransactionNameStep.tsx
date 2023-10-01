import React, { FC, useState } from 'react';
import { Box, Button, Input, Modal, Typography } from '@mui/material';
import { useWizard } from 'react-use-wizard';
import { Monitor } from '../../../../shared/types';
import { addParams } from './AddWizzard';
import { WizzardFooter } from './FooterWizzard';

export type TransactionNameStepProps = {
  assemblingData: Monitor;
  onClose: () => void;
};

const style = {
  position: 'absolute',
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export const TransactionNameStep: FC<TransactionNameStepProps> = (props) => {
  const { assemblingData, onClose } = props;
  const { nextStep } = useWizard();

  const [value, setValue] = useState('');

  const handleNextClick = () => {
    assemblingData.name = value;
    nextStep();
  };

  const keyPress = (e) => {
    if (e.keyCode === 13) {
      handleNextClick();
    }
  };

  return (
    <Modal open={true} onClose={onClose}>
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Transaction name
        </Typography>
        <Input
          name="name"
          onChange={(event) => setValue(event.target.value)}
          value={value}
          onKeyUp={keyPress}
          fullWidth
        />
        <WizzardFooter nextClick={handleNextClick} />
      </Box>
    </Modal>
  );
};
