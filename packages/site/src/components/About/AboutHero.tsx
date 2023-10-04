import React, { FC } from 'react';
import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { MyButton } from '../Button';

type AboutHeroProps = {
  handleConnectClick(): void;
  disabled: boolean;
};

export const AboutHero: FC<AboutHeroProps> = ({
  handleConnectClick,
  disabled,
}) => {
  const theme = useTheme();

  return (
    <Box
      height="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
    >
      <Typography
        fontSize="80px"
        fontWeight="bold"
        color={theme.palette.secondary.main}
      >
        ChainTrack
      </Typography>
      <Typography
        fontSize="50px"
        fontWeight="bold"
        marginTop="20px"
        marginBottom="20px"
      >
        Never Miss a Transaction Again.
      </Typography>
      <MyButton
        disabled={disabled}
        onClick={handleConnectClick}
        variant="outlined"
        size="large"
        sx={{
          fontSize: '32px',
          fontWeight: 500,
          padding: '20px 40px',
        }}
      >
        Start Tracking
      </MyButton>
    </Box>
  );
};
