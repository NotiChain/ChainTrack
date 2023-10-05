import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Modal } from '@mui/material';
import CurrencyBitcoinOutlinedIcon from '@mui/icons-material/CurrencyBitcoinOutlined';

import React, { useContext } from 'react';
import { MetamaskActions, MetaMaskContext } from '../hooks';
import { MyButton } from './Button';

export const Donate = () => {
  const [state, dispatch] = useContext(MetaMaskContext);
  const [openThanks, setOpenThanks] = React.useState(false);
  const [transactionHash, setTransactionHash] = React.useState<string>('');

  const handleDonateClick = async () => {
    try {
      if (!state?.wallets || !state.wallets[0]) {
        throw new Error('Wallet not connected');
      }

      const hash = await window.ethereum.request<string>({
        method: 'eth_sendTransaction',
        params: [
          {
            from: state.wallets[0],
            to: '0xc2f0CB781Eee77F469cC716c10234dd4F4c2e37f',
            value: (0.01 * 1000000000000000000).toString(16),
          },
        ],
      });

      if (!hash) {
        return;
      }

      setTransactionHash(hash);
      setOpenThanks(true);
    } catch (e) {
      console.error(e);
      dispatch({ type: MetamaskActions.SetError, payload: e });
    }
  };

  return (
    <Box
      padding="2.4rem"
      maxWidth="60rem"
      display="flex"
      flexDirection="column"
      alignSelf="center"
    >
      <Typography variant="h5">
        Support <b>ChainTrack</b>: If you've found value in our tool and wish to
        support our mission to enhance blockchain transparency, consider making
        a donation. Every contribution, big or small, helps us continue our work
        and serve you better. Thank you for believing in <b>ChainTrack</b>!
      </Typography>
      <Box alignSelf="center" marginTop="12px">
        <MyButton
          onClick={handleDonateClick}
          startIcon={<CurrencyBitcoinOutlinedIcon />}
          color="secondary"
        >
          Donate
        </MyButton>
      </Box>
      <Modal
        open={openThanks}
        onClose={() => setOpenThanks(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: 'absolute' as const,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-modal-title" variant="h4" component="h2">
            Thank you for your donation!
          </Typography>
          <Typography id="modal-modal-description" variant="h5" sx={{ mt: 2 }}>
            Your contribution will help us continue our work and serve you
            better!
          </Typography>
          <Typography id="modal-modal-description" variant="h5" sx={{ mt: 2 }}>
            Transaction hash: {transactionHash}
          </Typography>
        </Box>
      </Modal>
    </Box>
  );
};
