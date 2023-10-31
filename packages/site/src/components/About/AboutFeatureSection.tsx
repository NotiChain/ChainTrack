import React, { FC } from 'react';
import { Typography, styled, Grid, useMediaQuery } from '@mui/material';
import CodeIcon from '@mui/icons-material/Code';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import { useTheme } from '@mui/material/styles';

export const AboutFeatureSection: FC = () => {
  const theme = useTheme();
  const screenLessThanMedium = useMediaQuery(theme.breakpoints.down('md'));

  const BorderLine = styled('div')(() => ({
    minHeight: '25px',
    margin: '60px 0 40px 0',
    background: 'linear-gradient(-45deg, #5899e2, #5e5368, #23a6d5, #23d5ab)',
    animation: 'gradient 15s ease infinite',
    'background-size': '400% 400%',
    keyframes: {
      '@keyframes gradient': {
        '0%': {
          backgroundPosition: '0% 50%',
        },
        '50%': {
          backgroundPosition: '100% 50%',
        },
        '100%': {
          backgroundPosition: '0% 50%',
        },
      },
    },
  }));

  return (
    <Grid
      display="flex"
      justifyContent="space-between"
      marginTop={screenLessThanMedium ? '90px' : '180px'}
      marginBottom={screenLessThanMedium ? '90px' : '180px'}
      gap="48px"
    >
      <Grid width="60%" sx={{ '@media (max-width: 900px)': { width: '100%' } }}>
        <Typography
          variant={screenLessThanMedium ? 'h2' : 'h1'}
          fontWeight="500"
        >
          Exclusively for MetaMask users, we'll alert you about recurring
          transaction that hasn't taken place.
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
              Ensuring the security of your data is our top priority. ChainTrack
              directly saves data to your MetaMask Extension, and we do not
              retain any of your information.
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
