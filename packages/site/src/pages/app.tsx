import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import React, { useContext, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { Alert, IconButton, Slide, Snackbar } from '@mui/material';
import {
  AddMonitorActionCard,
  ConnectActionCard,
  StatsActionCard,
  DebugActionCard,
  AddTransactionModal,
} from '../components';
import { shouldDisplayReconnectButton, addMonitor, sendUpdate } from '../utils';
import { AddWizzard } from '../components/AddWizzard/AddWizzard';
import { MetamaskActions, MetaMaskContext } from '../hooks';
import { Monitor, PredefinedMonitor } from '../../../shared/types';
// eslint-disable-next-line import/no-unassigned-import
import './styles.css';

type AppPageProps = {
  handleConnectClick: () => void;
  handleResetClick: () => void;
  handleReloadClick: () => void;
  loadSnapData: () => void;
  isMetaMaskReady: boolean;
};

const transactionAddedText = 'New transaction has been added!';
const transactionUpdatedText = 'Transaction has been updated!';

export const AppPage = ({
  handleConnectClick,
  handleResetClick,
  handleReloadClick,
  isMetaMaskReady,
  loadSnapData,
}: AppPageProps) => {
  const [state, dispatch] = useContext(MetaMaskContext);
  console.log(state);
  const [successSnackbarText, setSuccessSnackbarText] = useState<string>('');
  const [editTransaction, setEditTransaction] = useState<boolean>(false);
  const [showAddWizzard, setShowAddWizzard] = useState(false);
  const [openAddTransactionModal, setOpenAddTransactionModal] = useState(false);
  const [selectedPredefinedMonitor, setSelectedPredefinedMonitor] =
    useState<PredefinedMonitor>();

  return (
    <Box display="flex" flexDirection="column" alignItems="center" flex="1">
      <Box sx={{ flexGrow: 1 }} marginTop="24px">
        <Grid
          container
          direction="row"
          justifyContent="space-evenly"
          spacing={{ xs: 2, md: 3 }}
          gap="24px"
        >
          <Snackbar
            open={Boolean(state?.error)}
            autoHideDuration={6000}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            onClose={() =>
              dispatch({
                type: MetamaskActions.SetError,
                payload: undefined,
              })
            }
            TransitionComponent={(props) => <Slide {...props} direction="up" />}
          >
            <Alert
              severity="error"
              sx={{ width: '100%', alignItems: 'center' }}
              elevation={6}
              className="snackbar"
              action={
                <IconButton
                  size="large"
                  onClick={() =>
                    dispatch({
                      type: MetamaskActions.SetError,
                      payload: undefined,
                    })
                  }
                >
                  <CloseIcon />
                </IconButton>
              }
            >
              <Typography variant="h4">
                <b>An error happened:</b> {state?.error?.message}
              </Typography>
            </Alert>
          </Snackbar>
          <Box display="flex" justifyContent="space-between">
            <Box width="20%">
              {state.installedSnap ? (
                <StatsActionCard
                  alerts={state?.alerts || []}
                  monitors={state?.monitors || []}
                />
              ) : (
                <ConnectActionCard
                  installedSnap={state.installedSnap}
                  handleConnectClick={handleConnectClick}
                  isMetaMaskReady={isMetaMaskReady}
                />
              )}
            </Box>
            <Box width="20%">
              <AddMonitorActionCard
                installedSnap={state.installedSnap}
                handleSendAddClick={() => {
                  setSelectedPredefinedMonitor(undefined);
                  setOpenAddTransactionModal(true);
                }}
              />
            </Box>
            {shouldDisplayReconnectButton(state.installedSnap) && (
              <Box width="20%">
                <DebugActionCard
                  handleResetClick={handleResetClick}
                  handleReloadClick={handleReloadClick}
                  handleConnectClick={handleConnectClick}
                />
              </Box>
            )}
          </Box>
          <Grid item xs={11}>
            {/* <TableTabs*/}
            {/*  monitors={state?.monitors || []}*/}
            {/*  loadSnapData={loadSnapData}*/}
            {/*  alerts={state?.alerts || []}*/}
            {/*  predefinedMonitors={predefinedMonitors}*/}
            {/*  openAddTransactionModal={(*/}
            {/*    predefinedMonitor: PredefinedMonitor,*/}
            {/*    isEditTransaction?: boolean,*/}
            {/*  ) => {*/}
            {/*    setSelectedPredefinedMonitor(predefinedMonitor);*/}
            {/*    setOpenAddTransactionModal(true);*/}
            {/*    setEditTransaction(Boolean(isEditTransaction));*/}
            {/*  }}*/}
            {/* />*/}
          </Grid>
        </Grid>
      </Box>
      <Fab
        color="secondary"
        aria-label="add"
        sx={{
          margin: 0,
          top: 'auto',
          left: 20,
          bottom: 20,
          position: 'fixed',
        }}
        onClick={() => {
          setSelectedPredefinedMonitor(undefined);
          setOpenAddTransactionModal(true);
        }}
      >
        <AddIcon />
      </Fab>
      <AddTransactionModal
        open={openAddTransactionModal}
        editTransaction={editTransaction}
        setOpenAddTransactionModal={setOpenAddTransactionModal}
        handleClose={() => {
          setSelectedPredefinedMonitor(undefined);
          setOpenAddTransactionModal(false);
          setEditTransaction(false);
          loadSnapData();
        }}
        predefinedMonitor={selectedPredefinedMonitor}
        handleAddMonitor={(monitor: Monitor) => {
          addMonitor(monitor).then(() => {
            setSelectedPredefinedMonitor(undefined);
            setOpenAddTransactionModal(false);
            setSuccessSnackbarText(transactionAddedText);
            loadSnapData();
          });
        }}
        handleUpdateMonitor={(editableMonitor: Monitor) => {
          let indexOfEditableMonitor = -1;
          console.log(state.monitors, editableMonitor);
          state?.monitors?.forEach((monitor, index) => {
            if (monitor?.id === editableMonitor?.id) {
              indexOfEditableMonitor = index;
            }
          });

          sendUpdate({
            index: indexOfEditableMonitor as number,
            item: editableMonitor,
          }).then(() => {
            setSelectedPredefinedMonitor(undefined);
            setOpenAddTransactionModal(false);
            setEditTransaction(false);
            setSuccessSnackbarText(transactionUpdatedText);
            loadSnapData();
          });
        }}
      />
      <Snackbar
        open={Boolean(successSnackbarText)}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        onClose={() => setSuccessSnackbarText('')}
        TransitionComponent={(props) => <Slide {...props} direction="up" />}
      >
        <Alert
          severity="success"
          sx={{ width: '100%', alignItems: 'center' }}
          elevation={6}
          onClose={() => setSuccessSnackbarText('')}
          className="snackbar"
          action={
            <IconButton size="large" onClick={() => setSuccessSnackbarText('')}>
              <CloseIcon />
            </IconButton>
          }
        >
          <Typography variant="h4">{successSnackbarText}</Typography>
        </Alert>
      </Snackbar>
      <Box display="flex" justifyContent="space-between" marginTop="1.5rem">
        {showAddWizzard && (
          <AddWizzard
            onClose={() => setShowAddWizzard(false)}
            loadData={() => {}}
          />
        )}
      </Box>
    </Box>
  );
};
