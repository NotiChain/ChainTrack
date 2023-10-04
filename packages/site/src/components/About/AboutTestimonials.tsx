import React, { FC } from 'react';
import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';

export const AboutTestimonials: FC = () => {
  return (
    <Grid container spacing={8} marginBottom="180px">
      <Grid container item xs={4} flexDirection="column" gap="12px">
        <Typography variant="h3" fontWeight="500">
          "ChainTrack is one of my first dives into the web3 world. Hope you dig
          it!"
        </Typography>
        <Box>
          <Typography fontWeight="400" variant="h4">
            Nikolay S.
          </Typography>
          <Typography fontWeight="400" variant="h4" sx={{ opacity: '40%' }}>
            Software Engineer
          </Typography>
        </Box>
      </Grid>
      <Grid container item xs={5} flexDirection="column" gap="12px">
        <Typography variant="h3" fontWeight="500">
          "ChainTrack exhibits simplicity, effectiveness, and reliability. It
          has significantly improved the fluidity of my MetaMask experience."
        </Typography>
        <Box>
          <Typography fontWeight="400" variant="h4">
            Dzmitry H.
          </Typography>
          <Typography fontWeight="400" variant="h4" sx={{ opacity: '40%' }}>
            Software Engineer
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};
