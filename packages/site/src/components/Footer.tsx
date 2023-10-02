import { Box } from '@mui/material';
import { SnapLogo } from './SnapLogo';
import { SnapName } from './SnapName';

export const Footer = () => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="flex-start"
      padding="2.4rem"
    >
      <SnapLogo color="black" size={36} />
      <SnapName />
    </Box>
  );
};
