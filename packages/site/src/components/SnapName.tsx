import { Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

export const SnapName = () => {
  const theme = useTheme();
  return (
    <Typography
      sx={{
        color: theme.palette.primary.main,
        fontWeight: 'bold',
        marginLeft: '1rem',
      }}
      variant="h4"
    >
      ChainTrack
    </Typography>
  );
};
