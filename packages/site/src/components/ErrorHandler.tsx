import React, { ReactElement } from 'react';
import { Alert, IconButton, Snackbar } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { MetamaskActions, MetaMaskContext, MetamaskDispatch } from '../hooks';

type ErrorBoundaryState = {
  hasError: boolean;
  errorMessage: string;
};

type ErrorBoundaryProps = {
  children: ReactElement;
};

class ErrorHandler extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  static contextType = MetaMaskContext;

  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      errorMessage: '',
    };
  }

  componentDidCatch(error: Error) {
    this.setState({ hasError: true });
    this.setState({ errorMessage: error.message });
  }

  closeSnackbar(dispatch: React.Dispatch<MetamaskDispatch>) {
    dispatch({
      type: MetamaskActions.SetError,
      payload: undefined,
    });

    this.setState({
      hasError: false,
      errorMessage: '',
    });
  }

  render(): React.ReactNode {
    const [state, dispatch] = this.context as any;

    return (
      <>
        {(this.state.hasError || state?.error) && (
          <Snackbar
            open={Boolean(state?.error || this.state.hasError)}
            autoHideDuration={6000}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            onClose={() => this.closeSnackbar(dispatch)}
          >
            <Alert
              severity="error"
              sx={{ width: '100%', alignItems: 'center' }}
              elevation={6}
              className="snackbar"
              action={
                <IconButton
                  size="large"
                  onClick={() => this.closeSnackbar(dispatch)}
                >
                  <CloseIcon />
                </IconButton>
              }
            >
              <Typography variant="h4">
                <b>An error happened:</b>{' '}
                {this.state.errorMessage || state?.error?.message}
              </Typography>
            </Alert>
          </Snackbar>
        )}
        {this.props.children}
      </>
    );
  }
}

export default ErrorHandler;
