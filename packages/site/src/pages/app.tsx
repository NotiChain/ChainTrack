import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import React, { useContext, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { Alert, CircularProgress, IconButton, Snackbar } from '@mui/material';
import {
  AddMonitorActionCard,
  ConnectActionCard,
  StatsActionCard,
  DebugActionCard,
  AddTransactionModal,
  TableTabs,
  CatalogActionCard,
} from '../components';
import {
  shouldDisplayReconnectButton,
  addMonitor,
  updateMonitor,
  sendAdd,
} from '../utils';
import { MetamaskActions, MetaMaskContext } from '../hooks';
import { Monitor, PredefinedMonitor } from '../../../shared/types';
import predefinedMonitors from '../../../shared/predefined-monitors';
// eslint-disable-next-line import/no-unassigned-import
import './styles.css';
import useThrowAsyncError from '../utils/errorHandler';

type AppPageProps = {
  handleConnectClick: () => void;
  handleResetClick: () => void;
  handleReloadClick: () => void;
  loadSnapData: () => void;
  isMetaMaskReady: boolean;
};

const transactionAddedText = 'New transaction has been added!';
const transactionUpdatedText = 'Transaction has been updated!';
const maxColumnsInGridContainer = 11;

const AppPage = ({
  handleConnectClick,
  handleResetClick,
  handleReloadClick,
  isMetaMaskReady,
  loadSnapData,
}: AppPageProps) => {
  const [state, dispatch] = useContext(MetaMaskContext);
  const [successSnackbarText, setSuccessSnackbarText] = useState<string>('');
  const [editTransaction, setEditTransaction] = useState<boolean>(false);
  const [openAddTransactionModal, setOpenAddTransactionModal] = useState(false);
  const [selectedPredefinedMonitor, setSelectedPredefinedMonitor] =
    useState<PredefinedMonitor>();
  const [tab, setTab] = useState(0);
  const throwAsyncError = useThrowAsyncError();

  const cardsGridIndex = 3;

  return (
    <Box display="flex" flexDirection="column" alignItems="center" flex="1">
      {state.isLoading && (
        <CircularProgress
          sx={{ position: 'absolute', left: '50%', top: '50%' }}
        />
      )}
      <Box sx={{ flexGrow: 1 }} margin="24px">
        <Grid
          container
          direction="row"
          justifyContent="space-evenly"
          alignItems="space-between"
          spacing={{ xs: 2, md: 2 }}
        >
          <Grid item xs={cardsGridIndex}>
            {state.installedSnap ? (
              <StatsActionCard
                alerts={state?.alerts || []}
                monitors={state?.monitors || []}
                userStats={state?.userStats || {}}
              />
            ) : (
              <ConnectActionCard
                installedSnap={state.installedSnap}
                handleConnectClick={handleConnectClick}
                isMetaMaskReady={isMetaMaskReady}
              />
            )}
          </Grid>
          <Grid item xs={cardsGridIndex}>
            <AddMonitorActionCard
              installedSnap={state.installedSnap}
              handleSendAddClick={() => {
                setSelectedPredefinedMonitor(undefined);
                setOpenAddTransactionModal(true);
              }}
            />
          </Grid>
          <Grid item xs={cardsGridIndex}>
            <CatalogActionCard
              installedSnap={state.installedSnap}
              handleGoToCatalogClick={() => {
                setTab(2);
              }}
            />
          </Grid>
          {shouldDisplayReconnectButton(state.installedSnap) && (
            <Grid item xs={cardsGridIndex}>
              <DebugActionCard
                handleResetClick={handleResetClick}
                handleReloadClick={handleReloadClick}
                handleConnectClick={handleConnectClick}
                handleAddClick={sendAdd}
              />
            </Grid>
          )}
          <Grid item xs={11} marginTop="24px">
            <TableTabs
              monitors={state?.monitors || []}
              loadSnapData={loadSnapData}
              alerts={state?.alerts || []}
              predefinedMonitors={predefinedMonitors}
              tab={tab}
              setTab={setTab}
              openAddTransactionModal={(
                predefinedMonitor: PredefinedMonitor,
                isEditTransaction?: boolean,
              ) => {
                setSelectedPredefinedMonitor(predefinedMonitor);
                setOpenAddTransactionModal(true);
                setEditTransaction(Boolean(isEditTransaction));
              }}
            />
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
          dispatch({ type: MetamaskActions.SetLoading, payload: true });
          addMonitor(monitor)
            .then(() => {
              setSelectedPredefinedMonitor(undefined);
              setOpenAddTransactionModal(false);
              setSuccessSnackbarText(transactionAddedText);
              loadSnapData();
            })
            .catch(throwAsyncError);
        }}
        handleUpdateMonitor={(editableMonitor: Monitor) => {
          dispatch({ type: MetamaskActions.SetLoading, payload: true });
          updateMonitor({
            item: editableMonitor,
          })
            .then(() => {
              setSelectedPredefinedMonitor(undefined);
              setOpenAddTransactionModal(false);
              setEditTransaction(false);
              setSuccessSnackbarText(transactionUpdatedText);
              loadSnapData();
            })
            .catch(throwAsyncError);
        }}
      />
      <Snackbar
        open={Boolean(successSnackbarText)}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        onClose={() => setSuccessSnackbarText('')}
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
    </Box>
  );
};

export default AppPage;
