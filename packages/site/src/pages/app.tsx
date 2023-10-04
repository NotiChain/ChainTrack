import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import React, { useContext, useState } from 'react';
import { useTheme } from '@mui/material';
import red from '@mui/material/colors/red';
import {
  AddMonitorActionCard,
  ConnectActionCard,
  StatsActionCard,
  DebugActionCard,
  TableTabs,
  AddTransactionModal,
} from '../components';
import { shouldDisplayReconnectButton, addMonitor } from '../utils';
import { AddWizzard } from '../components/AddWizzard/AddWizzard';
import { MetaMaskContext } from '../hooks';
import predefinedMonitors from '../../../shared/predefined-monitors';
import { Monitor, PredefinedMonitor } from '../../../shared/types';

type AppPageProps = {
  handleConnectClick: () => void;
  handleSendAddClick: () => void;
  handleResetClick: () => void;
  handleReloadClick: () => void;
  loadSnapData: () => void;
  isMetaMaskReady: boolean;
};

export const AppPage = ({
  handleConnectClick,
  handleSendAddClick,
  handleResetClick,
  handleReloadClick,
  isMetaMaskReady,
  loadSnapData,
}: AppPageProps) => {
  const [state, dispatch] = useContext(MetaMaskContext);
  const [showAddWizzard, setShowAddWizzard] = useState(false);
  const [openAddTransactionModal, setOpenAddTransactionModal] = useState(false);
  const [selectedPredefinedMonitor, setSelectedPredefinedMonitor] =
    useState<PredefinedMonitor>();

  return (
    <Box display="flex" flexDirection="column" alignItems="center" flex="1">
      <Box sx={{ flexGrow: 1 }} marginTop="12px">
        <Grid
          container
          direction="row"
          justifyContent="space-evenly"
          alignItems="stretch"
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {state.error && (
            <Grid
              item
              xs={12}
              display="flex"
              justifyContent="center"
              padding="2.4rem"
              marginTop="2.4rem"
            >
              <Typography variant="h4" color={red.A700}>
                <b>An error happened:</b> {state.error.message}
              </Typography>
            </Grid>
          )}
          <Grid item xs={2.5}>
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
          </Grid>
          <Grid item xs={2.5}>
            <AddMonitorActionCard
              installedSnap={state.installedSnap}
              handleSendAddClick={handleSendAddClick}
            />
          </Grid>
          {shouldDisplayReconnectButton(state.installedSnap) && (
            <Grid item xs={2.5}>
              <DebugActionCard
                handleResetClick={handleResetClick}
                handleReloadClick={handleReloadClick}
                handleConnectClick={handleConnectClick}
              />
            </Grid>
          )}
          <Grid item xs={11}>
            <TableTabs
              monitors={state?.monitors || []}
              alerts={state?.alerts || []}
              predefinedMonitors={predefinedMonitors}
              openAddTransactionModal={(
                predefinedMonitor: PredefinedMonitor,
              ) => {
                console.log(
                  '!!!!!!! openAddTransactionModal !!!!!!!',
                  'predefinedMonitor',
                  predefinedMonitor,
                );
                setSelectedPredefinedMonitor(predefinedMonitor);
                setOpenAddTransactionModal(true);
              }}
            />
          </Grid>
          <Grid item xs={11}>
            <Fab
              color="secondary"
              aria-label="add"
              onClick={() => {
                setSelectedPredefinedMonitor(undefined);
                setOpenAddTransactionModal(true);
              }}
            >
              <AddIcon />
            </Fab>
          </Grid>
        </Grid>
      </Box>
      <AddTransactionModal
        open={openAddTransactionModal}
        handleClose={() => {
          setSelectedPredefinedMonitor(undefined);
          setOpenAddTransactionModal(false);
          loadSnapData();
        }}
        predefinedMonitor={selectedPredefinedMonitor}
        handleAddMonitor={(monitor: Monitor) => {
          addMonitor(monitor).then(() => {
            setSelectedPredefinedMonitor(undefined);
            setOpenAddTransactionModal(false);
            loadSnapData();
          });
        }}
      />
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
