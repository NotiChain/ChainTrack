import React, { FC } from 'react';
import { Box, Typography, useMediaQuery } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';

export const AboutTestimonials: FC = () => {
  const theme = useTheme();
  const screenLessThanMedium = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Grid
      container
      spacing={screenLessThanMedium ? 4 : 8}
      marginBottom={screenLessThanMedium ? '90px' : '180px'}
    >
      <Grid
        container
        item
        xs={screenLessThanMedium ? 6 : 5}
        flexDirection="column"
        gap="12px"
      >
        <Typography
          variant={screenLessThanMedium ? 'h4' : 'h3'}
          fontWeight="500"
        >
          "ChainTrack is one of my first dives into the web3 world. Hope you dig
          it!"
        </Typography>
        <Box>
          <Typography
            fontWeight="400"
            variant={screenLessThanMedium ? 'h5' : 'h4'}
          >
            Nikolay S.
          </Typography>
          <Typography
            fontWeight="400"
            variant={screenLessThanMedium ? 'h5' : 'h4'}
            sx={{ opacity: '40%' }}
          >
            Software Engineer
          </Typography>
        </Box>
      </Grid>
      <Grid
        container
        item
        xs={screenLessThanMedium ? 6 : 5}
        flexDirection="column"
        gap="12px"
      >
        <Typography
          variant={screenLessThanMedium ? 'h4' : 'h3'}
          fontWeight="500"
        >
          "ChainTrack exhibits simplicity, effectiveness, and reliability. It
          has significantly improved the fluidity of my MetaMask experience."
        </Typography>
        <Box>
          <Typography
            fontWeight="400"
            variant={screenLessThanMedium ? 'h5' : 'h4'}
          >
            Dzmitry H.
          </Typography>
          <Typography
            fontWeight="400"
            variant={screenLessThanMedium ? 'h5' : 'h4'}
            sx={{ opacity: '40%' }}
          >
            Software Engineer
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};
