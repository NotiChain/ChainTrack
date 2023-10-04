import { Button } from '@mui/material';
import * as React from 'react';
import { ComponentProps } from 'react';
import { useTheme } from '@mui/material/styles';

export const MyButton = (props: ComponentProps<typeof Button>) => {
  const theme = useTheme();
  return (
    <Button
      key={props.key || props.name}
      size="large"
      variant="outlined"
      style={{
        color: theme.palette.secondary.main,
        borderColor: theme.palette.secondary.main,
      }}
      {...props}
    >
      {props.children}
    </Button>
  );
};
