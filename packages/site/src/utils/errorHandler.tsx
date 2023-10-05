import { useContext, useState } from 'react';
import { MetamaskActions, MetaMaskContext } from '../hooks';

const useThrowAsyncError = () => {
  const [, dispatch] = useContext(MetaMaskContext);
  const [, setState] = useState();

  return (error: any) => {
    setState(() => {
      dispatch({
        type: MetamaskActions.SetLoading,
        payload: false,
      });

      throw error;
    });
  };
};

export default useThrowAsyncError;
