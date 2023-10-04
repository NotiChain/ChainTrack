import { Box, IconButton, useTheme, Typography } from '@mui/material';
import React from 'react';
import GitHubIcon from '@mui/icons-material/GitHub';
import TelegramIcon from '@mui/icons-material/Telegram';
import { SnapLogo } from './SnapLogo';
import { SnapName } from './SnapName';

export const Footer = () => {
  const theme = useTheme();

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="flex-end"
      padding="2.4rem"
    >
      <IconButton
        aria-label="telegram"
        href="https://t.me/+d5rzvM1WvD1kODYy"
        target="_blank"
        size="large"
      >
        <TelegramIcon />
        <Typography>Share your feedback!</Typography>
      </IconButton>
      <IconButton
        aria-label="github"
        href="https://github.com/NasCorp/ChainTrack"
        target="_blank"
        size="large"
      >
        <GitHubIcon />
        <Typography>Give us a star!</Typography>
      </IconButton>
      <SnapLogo color={theme?.custom?.colors?.icon?.default} size={36} />
      <SnapName />
    </Box>
  );
};
