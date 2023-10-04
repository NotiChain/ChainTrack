import { Box, IconButton, useTheme, Typography } from '@mui/material';
import React from 'react';
import GitHubIcon from '@mui/icons-material/GitHub';
import TelegramIcon from '@mui/icons-material/Telegram';
import Grid from '@mui/material/Grid';
import { SnapLogo } from './SnapLogo';
import { SnapName } from './SnapName';

export const Footer = () => {
  const theme = useTheme();

  return (
    <Grid
      padding="2.4rem"
      justifyContent="center"
      alignItems="center"
      container
    >
      <Grid item xs />
      <Grid container item alignItems="center" xs={6} justifyContent="center">
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
      <Grid container item alignItems="center" xs justifyContent="flex-end">
        <SnapLogo color={theme?.custom?.colors?.icon?.default} size={36} />
        <SnapName />
      </Grid>
    </Grid>
  );
};
