import { Box, useTheme } from '@mui/material';
import { SnapLogo } from './SnapLogo';
import { SnapName } from './SnapName';

export const Footer = () => {
  const theme = useTheme();

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="flex-start"
      padding="2.4rem"
    >
      <SnapLogo color={theme?.custom?.colors?.icon?.default} size={36} />
      <SnapName />
    </Box>
  );
};
