import { Button } from '@mui/material';
import * as React from 'react';
import { ComponentProps } from 'react';
import { useTheme } from '@mui/material/styles';

type MyButtonProps = {
  mykey?: string;
} & ComponentProps<typeof Button>;

export const MyButton = (props: MyButtonProps) => {
  const theme = useTheme();
  return (
    <Button
      key={props.mykey || props.key || props.name}
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
