import React from 'react';
import { Modal, Box, Button } from '@mui/material';
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

type AddTransactionModalProps = {
  open: boolean;
  handleClose: () => void;
  handleAddMonitor: (monitor: Monitor) => void;
  predefinedMonitor?: PredefinedMonitor;
};

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export const AddTransactionModal = ({
  open,
  handleClose,
  handleAddMonitor,
  predefinedMonitor,
}: AddTransactionModalProps) => {
  console.log('!!!!!!! predefinedMonitor from modal', predefinedMonitor);
  const [monitor, setMonitor] = React.useState<Partial<PredefinedMonitor>>(
    predefinedMonitor || {},
  );

  React.useEffect(() => {
    setMonitor(predefinedMonitor || {});
  }, [predefinedMonitor]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <FormControl>
          <TextField
            id="add-transaction-network"
            label="Name"
            variant="standard"
            value={monitor?.name}
            onChange={(event) => {
              setMonitor({ ...monitor, name: event.target.value });
            }}
          />

          <Select
            labelId="network"
            id="network-simple-select"
            value={monitor.network ?? ''}
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
                key={ChainNameToIdEnum[name as keyof typeof ChainNameToIdEnum]}
              >
                {name}
              </MenuItem>
            ))}
          </Select>

          <TextField
            id="add-transaction-from"
            label="From"
            variant="standard"
            value={monitor?.from}
            onChange={(event) => {
              setMonitor({ ...monitor, from: event.target.value });
            }}
          />

          <TextField
            id="add-transaction-to"
            label="To"
            variant="standard"
            value={monitor?.to}
            onChange={(event) => {
              setMonitor({ ...monitor, to: event.target.value });
            }}
          />

          <TextField
            id="add-transaction-intervalHours"
            label="Interval Hours"
            variant="standard"
            value={monitor?.intervalHours}
            onChange={(event) => {
              setMonitor({ ...monitor, intervalHours: event.target.value });
            }}
          />

          <TextField
            id="add-transaction-contractAddress"
            label="Contract Address"
            variant="standard"
            value={monitor?.contractAddress}
            onChange={(event) => {
              setMonitor({ ...monitor, contractAddress: event.target.value });
            }}
          />

          <TextField
            id="add-transaction-amount"
            label="Amount"
            variant="standard"
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
            variant="standard"
            value={monitor?.url}
            onChange={(event) => {
              setMonitor({ ...monitor, url: event.target.value });
            }}
          />
        </FormControl>
        <Button onClick={() => handleAddMonitor(monitor as Monitor)}>
          Add
        </Button>
      </Box>
    </Modal>
  );
};
