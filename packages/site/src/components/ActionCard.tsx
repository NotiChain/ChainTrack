import { ReactNode } from 'react';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import * as React from 'react';
import Card from '@mui/material/Card';
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';

type CardProps = {
  content: {
    title?: string;
    description: ReactNode;
    button?: ReactNode;
    buttons?: ReactNode[];
  };
  disabled?: boolean;
  fullWidth?: boolean;
};

export const ActionCard = ({ content }: CardProps) => {
  const { title, description, button, buttons } = content;
  const theme = useTheme();

  return (
    <Card
      sx={{
        width: '100%',
        height: '100%',
        border: 1,
        borderRadius: '16px',
        borderColor: theme.palette.secondary.main,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor:
          theme?.palette?.mode === 'dark'
            ? 'rgba(0, 0, 0, 0.5)'
            : 'rgba(255, 255, 255, 0.5)',
      }}
    >
      {title && (
        <CardHeader
          title={
            <Typography variant="h3" color="primary">
              {title}
            </Typography>
          }
        ></CardHeader>
      )}
      <CardContent>
        <Box>{description}</Box>
      </CardContent>
      {button && <CardActions sx={{ mt: 'auto' }}>{button}</CardActions>}
      {buttons && <CardActions sx={{ mt: 'auto' }}>{buttons}</CardActions>}
    </Card>
  );
};
