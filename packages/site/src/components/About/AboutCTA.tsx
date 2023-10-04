import React, { FC } from 'react';
import { Box, Typography, Button } from '@mui/material';

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
        <Button
          disabled={disabled}
          onClick={handleConnectClick}
          variant="outlined"
          size="large"
        >
          Get Started with ChainTrack
        </Button>
      </Box>
    </Box>
  );
};
