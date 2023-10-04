import React, { FC } from 'react';
import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';

export const AboutTestimonials: FC = () => {
  return (
    <Grid container spacing={8} marginBottom="180px">
      <Grid container item xs={4} flexDirection="column" gap="12px">
        <Typography variant="h3" fontWeight="500">
          "Simple, effective, and reliable. ChainTrack has made my MetaMask
          experience so much smoother"
        </Typography>
        <Box>
          <Typography fontWeight="400" variant="h4">
            Taylor S.
          </Typography>
          <Typography fontWeight="400" variant="h4" sx={{ opacity: '40%' }}>
            Blockchain Analyst
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
