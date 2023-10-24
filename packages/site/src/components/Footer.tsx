import { IconButton, Typography } from '@mui/material';
import React from 'react';
import GitHubIcon from '@mui/icons-material/GitHub';
import TelegramIcon from '@mui/icons-material/Telegram';
import Grid from '@mui/material/Grid';
import { SnapName } from './SnapName';
import { Logo } from './Logo';

export const Footer = () => {
  return (
    <Grid
      padding="2.4rem"
      justifyContent="center"
      alignItems="center"
      container
    >
      <Grid container item alignItems="center" xs justifyContent="flex-start">
        <Logo size={54} />
        <SnapName />
      </Grid>
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
      <Grid item xs />
    </Grid>
  );
};
