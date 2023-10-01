import { ReactNode } from 'react';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import * as React from 'react';
import Card from '@mui/material/Card';

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

export const ActionCard = ({
  content,
  disabled = false,
  fullWidth,
}: CardProps) => {
  const { title, description, button, buttons } = content;
  return (
    <Card sx={fullWidth ? {} : { width: 256, height: 256 }}>
      {title && <CardHeader title={title} />}
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      {button && <CardActions>{button}</CardActions>}
      {buttons && <CardActions>{buttons}</CardActions>}
    </Card>
  );
};
