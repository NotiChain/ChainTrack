import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import styled from 'styled-components';
import { useContext, useState } from 'react';
import {
  AddMonitorActionCard,
  ConnectActionCard,
  DebugActionCard,
  DonateButton,
  TableTabs,
  PredefinedMonitorsTable,
  AlertsTable,
} from '../components';
import { shouldDisplayReconnectButton } from '../utils';
import { MonitorsTable } from '../components/MonitorsTable';
import { AddWizzard } from '../components/AddWizzard/AddWizzard';
import { MetaMaskContext } from '../hooks';
import predefinedMonitors from '../../../shared/predefined-monitors';

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

  return (
    <Container>
      <Typography variant="h2" gutterBottom>
        Welcome to <Span>ChainTrack</Span>
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
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 3, sm: 8, md: 12 }}
        >
          {state.error && (
            <Grid item xs={12}>
              <ErrorMessage>
                <b>An error happened:</b> {state.error.message}
              </ErrorMessage>
            </Grid>
          )}
          <Grid item xs={2} sm={4} md={4}>
            <ConnectActionCard
              installedSnap={state.installedSnap}
              handleConnectClick={handleConnectClick}
              isMetaMaskReady={isMetaMaskReady}
            />
          </Grid>
          <Grid item xs={2} sm={4} md={4}>
            <AddMonitorActionCard
              installedSnap={state.installedSnap}
              handleSendAddClick={handleSendAddClick}
            />
          </Grid>
          {shouldDisplayReconnectButton(state.installedSnap) && (
            <Grid item xs={2} sm={4} md={4}>
              <DebugActionCard
                handleResetClick={handleResetClick}
                handleReloadClick={handleReloadClick}
              />
            </Grid>
          )}
          <Grid item xs={11}>
            <TableTabs />
          </Grid>
          <Grid item xs={11}>
            <MonitorsTable
              monitors={
                state?.monitors?.map((item, index) => {
                  return {
                    id: index + 1,
                    ...item,
                  };
                }) || []
              }
            />
          </Grid>
          <Grid item xs={11}>
            <AlertsTable
              alerts={
                state?.alerts?.map((item, index) => {
                  return {
                    id: index + 1,
                    ...item,
                  };
                }) || []
              }
            />
          </Grid>
          <Grid item xs={11}>
            <PredefinedMonitorsTable
              predefinedMonitors={predefinedMonitors.map((item, index) => {
                return {
                  id: index + 1,
                  ...item,
                };
              })}
            />
          </Grid>
        </Grid>
      </Box>
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
