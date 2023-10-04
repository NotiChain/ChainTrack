import React, { FC } from 'react';
import { Typography, styled, Grid, Box } from '@mui/material';
import CodeIcon from '@mui/icons-material/Code';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import SmartphoneIcon from '@mui/icons-material/Smartphone';

const BorderLine = styled('div')(() => ({
  minHeight: '25px',
  margin: '60px 0 40px 0',
  background:
    'linear-gradient(90deg, rgba(238,174,202,1) 2%, rgba(195,180,217,1) 100%, rgba(148,187,233,1) 100%)',
}));

export const AboutFeatureSection: FC = () => {
  return (
    <Grid
      display="flex"
      justifyContent="space-between"
      marginBottom="180px"
      gap="48px"
    >
      <Box sx={{ '@media (max-width: 900px)': { display: 'none' } }}>
        <Typography variant="h2" fontWeight="500">
          WHAT WE DO
        </Typography>
      </Box>
      <Grid width="60%" sx={{ '@media (max-width: 900px)': { width: '100%' } }}>
        <Typography variant="h1" fontWeight="500">
          Designed exclusively for MetaMask users, we ensure every recurring
          transaction is right at your fingertips.
        </Typography>
        <BorderLine />
        <Grid container spacing={8}>
          <Grid container item xs={6} flexDirection="column" gap="12px">
            <CodeIcon fontSize="large" />
            <Typography variant="h3" fontWeight="600">
              Instant Alerts
            </Typography>
            <Typography variant="h4" sx={{ opacity: '60%' }} fontWeight="400">
              Stay informed with real-time notifications. With ChainTrack,
              missed recurring transactions are a thing of the past.
            </Typography>
          </Grid>
          <Grid container item xs={6} flexDirection="column" gap="12px">
            <SmartphoneIcon fontSize="large" />
            <Typography variant="h3" fontWeight="600">
              User-Friendly Interface
            </Typography>
            <Typography variant="h4" sx={{ opacity: '60%' }} fontWeight="400">
              Navigate with ease. ChainTrack's intuitive design ensures you get
              the information you need without the hassle.
            </Typography>
          </Grid>
          <Grid container item xs={6} flexDirection="column" gap="12px">
            <StarBorderIcon fontSize="large" />
            <Typography variant="h3" fontWeight="600">
              Top-Notch Security
            </Typography>
            <Typography variant="h4" sx={{ opacity: '60%' }} fontWeight="400">
              Your data's safety is paramount. ChainTrack operates with
              stringent security protocols, giving you peace of mind.
            </Typography>
          </Grid>
          <Grid container item xs={6} flexDirection="column" gap="12px">
            <CodeIcon fontSize="large" />
            <Typography variant="h3" fontWeight="600">
              Detailed Insights
            </Typography>
            <Typography variant="h4" sx={{ opacity: '60%' }} fontWeight="400">
              Understand your transactions better. Dive deep into analytics and
              gain clarity on your recurring transactions.
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
