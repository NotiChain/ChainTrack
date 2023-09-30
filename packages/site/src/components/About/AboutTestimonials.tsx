import React, { FC } from 'react';
import { Box, Stack, Typography } from '@mui/material';

export const AboutTestimonials: FC = () => {
  return (
    <Stack>
      <Stack>
        <Typography variant="h4">
          "Simple, effective, and reliable. ChainTrack has made my MetaMask
          experience so much smoother"
        </Typography>
        <Box>
          <Typography>Taylor S.</Typography>
          <Typography>Blockchain Analyst</Typography>
        </Box>
      </Stack>
      <Stack>
        <Typography variant="h4">
          "ChainTrack exhibits simplicity, effectiveness, and reliability. It
          has significantly improved the fluidity of my MetaMask experience."
        </Typography>
        <Box>
          <Typography>Dzmitry H.</Typography>
          <Typography>Software Engineer</Typography>
        </Box>
      </Stack>
    </Stack>
  );
};
