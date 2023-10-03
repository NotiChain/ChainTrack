import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { useContext, useState } from 'react';
import { Button } from '@mui/material';
import purple from '@mui/material/colors/purple';
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
  handleDonateClick: () => void;
  loadSnapData: () => void;
  isMetaMaskReady: boolean;
};

export const AppPage = ({
  handleConnectClick,
  handleSendAddClick,
  handleResetClick,
  handleReloadClick,
  isMetaMaskReady,
  handleDonateClick,
  loadSnapData,
}: AppPageProps) => {
  const [state, dispatch] = useContext(MetaMaskContext);
  const [showAddWizzard, setShowAddWizzard] = useState(false);
  const [openAddTransactionModal, setOpenAddTransactionModal] = useState(false);
  const [selectedPredefinedMonitor, setSelectedPredefinedMonitor] =
    useState<PredefinedMonitor>();

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      flex="1"
      sx={{
        background: 'linear-gradient(to top right, #2f2727, #1a82f7)',
      }}
    >
      <Box display="flex" gap="6px">
        <Typography variant="h2" gutterBottom>
          Welcome to
        </Typography>
        <Typography
          sx={{
            color: purple[500],
            fontWeight: 'bold',
          }}
          variant="h2"
          gutterBottom
        >
          ChainTrack
        </Typography>
        <Typography variant="h2" gutterBottom>
          !
        </Typography>
      </Box>
      <Typography variant="h4" gutterBottom>
        Get started by adding a new transaction to monitor!
      </Typography>
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
        <Box
          padding="2.4rem"
          maxWidth="60rem"
          display="flex"
          flexDirection="column"
        >
          <Typography variant="h5">
            Support <b>ChainTrack</b>: If you've found value in our tool and
            wish to support our mission to enhance blockchain transparency,
            consider making a donation. Every contribution, big or small, helps
            us continue our work and serve you better. Thank you for believing
            in <b>ChainTrack</b>!
          </Typography>
          <Box alignSelf="center" marginTop="12px">
            <Button onClick={handleDonateClick} variant="outlined" size="large">
              Donate
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
