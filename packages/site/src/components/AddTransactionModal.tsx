import React, { useContext } from 'react';
import { Modal, Box, InputLabel, useTheme, useMediaQuery } from '@mui/material';
import FormControl from '@mui/material/FormControl';

import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import {
  PredefinedMonitor,
  Monitor,
  ChainNameToIdEnum,
  ChainIds,
} from '../../../shared/types';
import { MetaMaskContext } from '../hooks';
import { MyButton } from './Button';

type AddTransactionModalProps = {
  open: boolean;
  editTransaction: boolean;
  setOpenAddTransactionModal: (value: boolean) => void;
  handleClose: () => void;
  handleAddMonitor: (monitor: Monitor) => void;
  handleUpdateMonitor: (monitor: Monitor) => void;
  predefinedMonitor?: PredefinedMonitor;
};

export const AddTransactionModal = ({
  open,
  editTransaction,
  setOpenAddTransactionModal,
  handleClose,
  handleAddMonitor,
  handleUpdateMonitor,
  predefinedMonitor,
}: AddTransactionModalProps) => {
  const [state] = useContext(MetaMaskContext);
  const [monitor, setMonitor] = React.useState<Partial<PredefinedMonitor>>(
    predefinedMonitor || {},
  );
  const theme = useTheme();
  const screenLessThanSmall = useMediaQuery(theme.breakpoints.down('sm'));

  React.useEffect(() => {
    setMonitor(predefinedMonitor || {});
  }, [predefinedMonitor]);

  const from = monitor?.from || (state.wallets ? state.wallets[0] : undefined);
  if (from !== monitor.from) {
    setMonitor({ ...monitor, from });
  }
  const to = monitor?.to || (state.wallets ? state.wallets[0] : undefined);
  if (to !== monitor.to) {
    setMonitor({ ...monitor, to });
  }
  const chainId = monitor?.network || (state?.chainId as ChainIds);
  if (chainId !== monitor.network) {
    setMonitor({ ...monitor, network: chainId });
  }

  return (
    <Modal
      open={open}
      onClose={() => {
        setMonitor({});
        handleClose();
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className="add-transactions-modal"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: screenLessThanSmall ? '100%' : 600,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
        }}
        className="add-transactions-modal-container"
      >
        <Box flexDirection="column" display="flex">
          <FormControl sx={{ gap: '24px' }}>
            <TextField
              id="add-transaction-network"
              label="Name"
              focused
              variant="standard"
              value={monitor?.name}
              onChange={(event) => {
                setMonitor({ ...monitor, name: event.target.value });
              }}
            />

            <FormControl
              fullWidth
              error={!monitor?.network}
              focused
              variant="standard"
              required
            >
              <InputLabel
                id="network-select-label"
                error={!monitor?.network}
                focused
                required
              >
                Network
              </InputLabel>
              <Select
                labelId="network-select-label"
                id="network-select"
                error={!monitor?.network}
                value={monitor.network ?? ''}
                required
                label="Network"
                onChange={(event) => {
                  setMonitor({
                    ...monitor,
                    network: event.target.value as ChainIds,
                  });
                }}
              >
                {Object.keys(ChainNameToIdEnum).map((name) => (
                  <MenuItem
                    value={
                      ChainNameToIdEnum[name as keyof typeof ChainNameToIdEnum]
                    }
                    key={
                      ChainNameToIdEnum[name as keyof typeof ChainNameToIdEnum]
                    }
                  >
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              id="add-transaction-from"
              label="From"
              focused
              required
              error={!monitor?.from}
              variant="standard"
              value={monitor?.from}
              onChange={(event) => {
                setMonitor({ ...monitor, from: event.target.value });
              }}
            />

            <TextField
              id="add-transaction-to"
              label="To"
              focused
              required
              error={!monitor?.to}
              variant="standard"
              value={monitor?.to}
              onChange={(event) => {
                setMonitor({ ...monitor, to: event.target.value });
              }}
            />

            <TextField
              id="add-transaction-intervalHours"
              label="Interval Hours"
              focused
              required
              type="number"
              InputProps={{
                inputProps: { min: 0 },
              }}
              error={!monitor?.intervalHours}
              variant="standard"
              value={monitor?.intervalHours}
              onChange={(event) => {
                setMonitor({ ...monitor, intervalHours: event.target.value });
              }}
            />

            <TextField
              id="add-transaction-contractAddress"
              label="Contract Address"
              focused
              variant="standard"
              value={monitor?.contractAddress}
              onChange={(event) => {
                setMonitor({ ...monitor, contractAddress: event.target.value });
              }}
            />

            <TextField
              id="add-transaction-amount"
              label="Amount"
              focused
              variant="standard"
              type="number"
              InputProps={{
                inputProps: { min: 0 },
              }}
              value={monitor?.amount}
              onChange={(event) => {
                setMonitor({
                  ...monitor,
                  amount: event.target.value
                    ? Number(event.target.value)
                    : undefined,
                });
              }}
            />

            <TextField
              id="add-transaction-url"
              label="URL"
              focused
              variant="standard"
              value={monitor?.url}
              onChange={(event) => {
                setMonitor({ ...monitor, url: event.target.value });
              }}
            />
          </FormControl>

          <Box marginTop="20px" alignSelf="center" width="100%">
            <MyButton
              onClick={() => {
                if (editTransaction) {
                  handleUpdateMonitor(monitor as Monitor);
                } else {
                  handleAddMonitor(monitor as Monitor);
                }
                setOpenAddTransactionModal(false);
                setMonitor({});
              }}
              fullWidth
              disabled={
                !monitor?.from ||
                !monitor?.to ||
                !monitor?.network ||
                !monitor?.intervalHours
              }
            >
              {editTransaction ? 'Update transaction' : 'Start Monitoring'}
            </MyButton>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};
