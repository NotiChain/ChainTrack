import React, { FC, useState } from 'react';
import { Box, Button, Input, Modal, Typography } from '@mui/material';
import { useWizard } from 'react-use-wizard';
import { Monitor } from '../../../../shared-types';
import { addParams } from './AddWizzard';
import { WizzardFooter } from './FooterWizzard';

export type AmountStepProps = {
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

export const AmountStep: FC<AmountStepProps> = (props) => {
  const { assemblingData, onClose } = props;
  const { nextStep } = useWizard();

  const [value, setValue] = useState('');

  const handleNextClick = () => {
    assemblingData.amount = Number(value);
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
          Token amount (not required, empty means any)
        </Typography>
        <Input
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
