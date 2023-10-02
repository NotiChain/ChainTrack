import { ReactNode } from 'react';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import * as React from 'react';
import Card from '@mui/material/Card';
import purple from '@mui/material/colors/purple';

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
    <Card
      sx={{
        width: '100%',
        height: '100%',
        border: 1,
        borderRadius: '16px',
        borderColor: purple[500],
      }}
    >
      {title && (
        <CardHeader
          title={
            <Typography variant="h3" color="secondary">
              {title}
            </Typography>
          }
        ></CardHeader>
      )}
      <CardContent>
        <Typography variant="h4" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      {button && <CardActions>{button}</CardActions>}
      {buttons && <CardActions>{buttons}</CardActions>}
    </Card>
  );
};
