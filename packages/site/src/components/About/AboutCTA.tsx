import React, { FC } from 'react';
import { Box, Typography } from '@mui/material';
import { MyButton } from '../Button';

type AboutCTAProps = {
  handleConnectClick(): void;
  disabled: boolean;
};

export const AboutCTA: FC<AboutCTAProps> = ({
  handleConnectClick,
  disabled,
}) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      marginBottom="180px"
    >
      <Typography variant="h1" fontWeight="bold">
        Stay on top of your recurring transactions.
      </Typography>
      <Typography variant="h1" fontWeight="bold">
        Experience the ChainTrack difference today.
      </Typography>
      <Box padding="30px 40px">
        <MyButton
          disabled={disabled}
          onClick={handleConnectClick}
          size="large"
          sx={{
            fontSize: '25x',
            fontWeight: 400,
            padding: '15px 30px',
          }}
        >
          Get Started with ChainTrack
        </MyButton>
      </Box>
    </Box>
  );
};
