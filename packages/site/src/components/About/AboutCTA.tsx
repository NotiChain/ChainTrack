import React, { FC } from 'react';
import { Box, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { MyButton } from '../Button';

type AboutCTAProps = {
  handleConnectClick(): void;
  disabled: boolean;
};

export const AboutCTA: FC<AboutCTAProps> = ({
  handleConnectClick,
  disabled,
}) => {
  const theme = useTheme();
  const screenLessThanMedium = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      marginBottom="6rem"
    >
      <Typography
        variant={screenLessThanMedium ? 'h2' : 'h1'}
        fontWeight="bold"
      >
        Stay on top of your recurring transactions.
      </Typography>
      <Typography
        variant={screenLessThanMedium ? 'h2' : 'h1'}
        fontWeight="bold"
      >
        Experience the ChainTrack difference today.
      </Typography>
      <Box padding="30px 40px">
        <MyButton
          disabled={disabled}
          onClick={handleConnectClick}
          size="large"
          sx={{
            fontSize: '2rem',
            fontWeight: 500,
            padding: '20px 40px',
          }}
        >
          Get Started with ChainTrack
        </MyButton>
      </Box>
    </Box>
  );
};
