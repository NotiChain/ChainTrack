import { Button, ButtonProps as MuiButtonProps } from '@mui/material';
import * as React from 'react';
import { Component } from 'react';

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
interface ButtonProps extends MuiButtonProps {
  mykey?: string;
}

export const MyButton = (props: React.PropsWithRef<any>) => {
  return (
    <Button
      key={props.mykey || props.key || props.name}
      size="large"
      variant="outlined"
      color="primary"
      target="_blank"
      href=""
      {...props}
    >
      {props.children}
    </Button>
  );
};
