import React, { FC } from 'react';
import { Box, Button, Typography, styled } from '@mui/material';
import { useTheme } from '@mui/material/styles';

type AboutHeroProps = {
  handleConnectClick(): void;
  disabled: boolean;
};

const HeroButton = styled(Button)(() => ({
  fontSize: '32px',
  fontWeight: 500,
  padding: '20px 40px',
}));

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
      <HeroButton
        disabled={disabled}
        onClick={handleConnectClick}
        variant="outlined"
        size="large"
      >
        GET IN TOUCH
      </HeroButton>
    </Box>
  );
};
