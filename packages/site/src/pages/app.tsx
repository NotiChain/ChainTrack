import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import styled from 'styled-components';
import { useContext, useState } from 'react';
import {
  AddMonitorActionCard,
  ConnectActionCard,
  StatsActionCard,
  DebugActionCard,
  DonateButton,
  TableTabs,
  AddTransactionModal,
} from '../components';
import { shouldDisplayReconnectButton, addMonitor } from '../utils';
import { AddWizzard } from '../components/AddWizzard/AddWizzard';
import { MetaMaskContext } from '../hooks';
import predefinedMonitors from '../../../shared/predefined-monitors';
import { Monitor, PredefinedMonitor } from '../../../shared/types';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
`;

const Span = styled.span`
  //color: ${(props) => props.theme.colors.primary.default};
`;

const Notice = styled.div`
  //background-color: ${({ theme }) => theme.colors.background.alternative};
  //border: 1px solid ${({ theme }) => theme.colors.border.default};
  //color: ${({ theme }) => theme.colors.text.alternative};
  //border-radius: ${({ theme }) => theme.radii.default};
  padding: 2.4rem;
  margin-top: 2.4rem;
  max-width: 60rem;
  width: 100%;

  & > * {
    margin: 0;
  }
`;

const ErrorMessage = styled.div`
  //background-color: ${({ theme }) => theme.colors.error.muted};
  //border: 1px solid ${({ theme }) => theme.colors.error.default};
  //color: ${({ theme }) => theme.colors.error.alternative};
  //border-radius: ${({ theme }) => theme.radii.default};
  padding: 2.4rem;
  margin-bottom: 2.4rem;
  margin-top: 2.4rem;
  max-width: 60rem;
  width: 100%;
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  max-width: 70.8rem;
  width: 100%;
  height: 100%;
  margin-top: 1.5rem;
`;

type AppPageProps = {
  handleConnectClick: () => void;
  handleSendAddClick: () => void;
  handleResetClick: () => void;
  handleReloadClick: () => void;
  handleDonateClick: () => void;
  isMetaMaskReady: boolean;
};

export const AppPage = ({
  handleConnectClick,
  handleSendAddClick,
  handleResetClick,
  handleReloadClick,
  isMetaMaskReady,
  handleDonateClick,
}: AppPageProps) => {
  const [state, dispatch] = useContext(MetaMaskContext);
  const [showAddWizzard, setShowAddWizzard] = useState(false);
  const [openAddTransactionModal, setOpenAddTransactionModal] = useState(false);
  const [selectedPredefinedMonitor, setSelectedPredefinedMonitor] =
    useState<PredefinedMonitor>();

  return (
    <Container>
      <Typography variant="h2" gutterBottom>
        Welcome to <Span>ChainTrack</Span>!
      </Typography>
      <Typography variant="h4" gutterBottom>
        Get started by adding a new transaction to monitor!
      </Typography>
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="flex-start"
          spacing={{ xs: 2, md: 4 }}
          columns={{ xs: 3, sm: 8, md: 12 }}
        >
          {state.error && (
            <Grid item xs={12}>
              <ErrorMessage>
                <b>An error happened:</b> {state.error.message}
              </ErrorMessage>
            </Grid>
          )}
          <Grid item xs={3}>
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
          <Grid item xs={3}>
            <AddMonitorActionCard
              installedSnap={state.installedSnap}
              handleSendAddClick={handleSendAddClick}
            />
          </Grid>
          {shouldDisplayReconnectButton(state.installedSnap) && (
            <Grid item xs={3}>
              <DebugActionCard
                handleResetClick={handleResetClick}
                handleReloadClick={handleReloadClick}
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
            <Fab color="secondary" aria-label="add">
              <AddIcon />
            </Fab>
          </Grid>
        </Grid>
      </Box>
      <AddTransactionModal
        open={openAddTransactionModal}
        handleClose={() => setOpenAddTransactionModal(false)}
        predefinedMonitor={selectedPredefinedMonitor}
        handleAddMonitor={(monitor: Monitor) => {
          addMonitor(monitor);
          setOpenAddTransactionModal(false);
        }}
      />
      <CardContainer>
        {showAddWizzard && (
          <AddWizzard
            onClose={() => setShowAddWizzard(false)}
            loadData={() => {}}
          />
        )}
        <Notice>
          <p>
            Support <b>ChainTrack</b>: If you've found value in our tool and
            wish to support our mission to enhance blockchain transparency,
            consider making a donation. Every contribution, big or small, helps
            us continue our work and serve you better. Thank you for believing
            in <b>ChainTrack</b>!
          </p>
          <DonateButton onClick={handleDonateClick} />
        </Notice>
      </CardContainer>
    </Container>
  );
};
