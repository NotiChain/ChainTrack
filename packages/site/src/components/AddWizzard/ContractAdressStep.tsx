import React, { FC, useState } from 'react';
import { Box, Input, Modal, Typography } from '@mui/material';
import { Monitor } from '../../../../shared-types';
import { WizzardFooter } from './FooterWizzard';

export type ContractAdressStepProps = {
  assemblingData: Monitor;
  handleEnd: () => void;
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

export const ContractAdressStep: FC<ContractAdressStepProps> = (props) => {
  const { assemblingData, handleEnd } = props;

  const [value, setValue] = useState('');

  const handleNextClick = () => {
    assemblingData.contractAddress = value === '' ? null : value;
    handleEnd();
  };

  const keyPress = (e) => {
    if (e.keyCode === 13) {
      handleNextClick();
    }
  };
  return (
    <Modal open={true}>
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Contract address (not required, empty means ethereum)
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
