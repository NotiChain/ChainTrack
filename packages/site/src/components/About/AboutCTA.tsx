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
    <Box>
      <Typography variant="h1">
        Stay on top of your recurring transactions.
      </Typography>
      <Typography variant="h1">
        Experience the ChainTrack difference today.
      </Typography>
      <Button disabled={disabled} onClick={handleConnectClick}>
        Get Started with ChainTrack
      </Button>
    </Box>
  );
};
