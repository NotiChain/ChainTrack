import { Button, ButtonProps as MuiButtonProps } from '@mui/material';
import * as React from 'react';

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
interface ButtonProps extends MuiButtonProps {
  mykey?: string;
  target?: string;
}

export const MyButton = (props: React.PropsWithChildren<ButtonProps>) => {
  return (
    <Button
      key={props.mykey || props.key || props.name}
      size="large"
      variant="outlined"
      color="primary"
      {...props}
    >
      {props.children}
    </Button>
  );
};
