import React, { FC } from 'react';
import { Stack, Typography, styled, Grid, Paper } from '@mui/material';
import { CodeIcon } from '../../assets/icons/CodeIcon';
import { MobileIcon } from '../../assets/icons/MobileIcon';
import { StarIcon } from '../../assets/icons/StarIcon';

const BorderLine = styled('div')(() => ({
  minHeight: '25px',
  margin: '60px 0 40px 0',
  background:
    'linear-gradient(90deg, #ffffff -1.56%, #61a1dd 24.89%, #3864d3 100%)',
}));

export const AboutFeatureSection: FC = () => {
  return (
    <Stack>
      <Paper>
        <Typography variant="h3">WHAT WE DO</Typography>
      </Paper>
      <Paper>
        <Typography variant="h2">
          Designed exclusively for MetaMask users, we ensure every recurring
          transaction is right at your fingertips.
        </Typography>
        <BorderLine />
        <Grid>
          <Paper>
            <CodeIcon />
            <Typography variant="h4">Instant Alerts</Typography>
            <Typography>
              Stay informed with real-time notifications. With ChainTrack,
              missed recurring transactions are a thing of the past.
            </Typography>
          </Paper>
          <Paper>
            <MobileIcon />
            <Typography variant="h4">User-Friendly Interface</Typography>
            <Typography>
              Navigate with ease. ChainTrack's intuitive design ensures you get
              the information you need without the hassle.
            </Typography>
          </Paper>
          <Paper>
            <StarIcon />
            <Typography variant="h4">Top-Notch Security</Typography>
            <Typography>
              Your data's safety is paramount. ChainTrack operates with
              stringent security protocols, giving you peace of mind.
            </Typography>
          </Paper>
          <Paper>
            <CodeIcon />
            <Typography variant="h4">Detailed Insights</Typography>
            <Typography>
              Understand your transactions better. Dive deep into analytics and
              gain clarity on your recurring transactions.
            </Typography>
          </Paper>
        </Grid>
      </Paper>
    </Stack>
  );
};
