import React, { FC } from 'react';
import { Box, Button, Typography } from '@mui/material';

type AboutFooterProps = {
  handleDonateClick(): void;
};

export const AboutFooter: FC<AboutFooterProps> = ({ handleDonateClick }) => {
  return (
    <Box>
      <Typography>
        If ChainTrack has streamlined your tracking experience, consider
        supporting our mission to enhance transparency in recurring
        transactions.
      </Typography>
      <Button onClick={handleDonateClick}>Donate</Button>
    </Box>
  );
};
