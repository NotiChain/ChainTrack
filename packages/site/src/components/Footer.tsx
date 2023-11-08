import { Box, IconButton, Typography, useMediaQuery } from '@mui/material';
import React from 'react';
import GitHubIcon from '@mui/icons-material/GitHub';
import TelegramIcon from '@mui/icons-material/Telegram';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import { Link } from 'gatsby';
import { HOME_ROUTE } from '../routes';
import { SnapName } from './SnapName';
import { Logo } from './Logo';

export const Footer = () => {
  const theme = useTheme();
  const screenLessThanMedium = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Grid
      padding="2.4rem"
      paddingTop="0"
      justifyContent="center"
      alignItems="center"
      container
      flexDirection={screenLessThanMedium ? 'column-reverse' : 'row'}
    >
      <Grid
        container
        item
        alignItems="center"
        xs={screenLessThanMedium ? 12 : 3}
        justifyContent="flex-start"
      >
        <Link to={HOME_ROUTE} style={{ textDecoration: 'none' }}>
          <Box display="flex" alignItems="center">
            <Logo size={54} />
            <SnapName />
          </Box>
        </Link>
      </Grid>
      <Grid
        container
        item
        alignItems="center"
        xs={screenLessThanMedium ? 12 : 6}
        justifyContent="center"
      >
        <IconButton
          aria-label="telegram"
          href="https://t.me/+d5rzvM1WvD1kODYy"
          target="_blank"
          size="large"
        >
          <TelegramIcon />
          <Typography variant="h5" marginLeft="4px">
            Share your feedback!
          </Typography>
        </IconButton>
        <IconButton
          aria-label="github"
          href="https://github.com/NasCorp/ChainTrack"
          target="_blank"
          size="large"
        >
          <GitHubIcon />
          <Typography variant="h5" marginLeft="4px">
            Give us a star!
          </Typography>
        </IconButton>
      </Grid>
      {!screenLessThanMedium && <Grid item xs={3} />}
    </Grid>
  );
};
