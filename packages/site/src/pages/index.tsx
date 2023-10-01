import { useContext, useState } from 'react';
import styled from 'styled-components';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { MetamaskActions, MetaMaskContext } from '../hooks';
import {
  connectSnap,
  getSnap,
  isLocalSnap,
  sendReset,
  getAlerts,
  getMonitors,
  shouldDisplayReconnectButton,
} from '../utils';
import {
  ConnectButton,
  InstallMetamaskButton,
  ReconnectButton,
  ActionCard,
  SendAddButton,
  ReloadButton,
  ResetButton,
  TransactionsTable,
  AlertsTable,
  DonateButton,
  ConnectActionCard,
  AddMonitorActionCard,
  DebugActionCard,
  TableTabs,
} from '../components';
import { defaultSnapOrigin } from '../config';
import { AddWizzard } from '../components/AddWizzard/AddWizzard';
import { TestTransactionTable } from '../components/testTransactionTable';
import { AboutFooter } from '../components/About/AboutFooter';
import { AboutHero } from '../components/About/AboutHero';
import { AboutFeatureSection } from '../components/About/AboutFeatureSection';
import { AboutTestimonials } from '../components/About/AboutTestimonials';
import { AboutCTA } from '../components/About/AboutCTA';
import { AboutFaq } from '../components/About/AboutFAQ';
import TransactionTable from '../components/TransactionTable';
import TransactionTableMaterialUi from '../components/TransactionTableMaterialUi';
import { MonitorsTable } from '../components/MonitorsTable';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
`;

const LandingContainer = styled.div`
  // background: ${(props) => props.theme.colors.about.default};
  // color: ${(props) => props.theme.colors.about.inverse};
  background: linear-gradient(to top right, #2f2727, #1a82f7);
`;

const Span = styled.span`
  //color: ${(props) => props.theme.colors.primary.default};
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

const Index = () => {
  let loadDataInterval: NodeJS.Timeout | null = null;
  const [state, dispatch] = useContext(MetaMaskContext);
  const [showAddWizzard, setShowAddWizzard] = useState(false);
  // const isMetaMaskReady = isLocalSnap(defaultSnapOrigin)
  //   ? state.isFlask
  //   : state.snapsDetected;

  const isMetaMaskReady = isLocalSnap(defaultSnapOrigin) && state.snapsDetected;

  const handleGetMonitors = async () => {
    try {
      const data = await getMonitors();
      console.log('!!!! Monitors', data);
      dispatch({ type: MetamaskActions.SetMonitors, payload: data });
    } catch (e) {
      console.error(e);
      dispatch({ type: MetamaskActions.SetError, payload: e });
    }
  };

  const handleGetAlerts = async () => {
    try {
      const data = await getAlerts();
      console.log('!!!! Alerts', data);
      dispatch({ type: MetamaskActions.SetAlerts, payload: data });
    } catch (e) {
      console.error(e);
      dispatch({ type: MetamaskActions.SetError, payload: e });
    }
  };

  const loadData = async () => {
    await Promise.all([handleGetMonitors(), handleGetAlerts()]);
  };

  const handleConnectClick = async () => {
    if (loadDataInterval) {
      clearInterval(loadDataInterval);
      loadDataInterval = null;
    }

    try {
      await connectSnap();
      const installedSnap = await getSnap();

      dispatch({
        type: MetamaskActions.SetInstalled,
        payload: installedSnap,
      });

      if (!loadDataInterval) {
        loadDataInterval = setInterval(loadData, 10000);
      }
    } catch (e) {
      console.error(e);
      dispatch({ type: MetamaskActions.SetError, payload: e });
    }
  };

  const handleSendAddClick = async () => {
    try {
      setShowAddWizzard(true);
      // await sendAdd();
      // await loadData();
    } catch (e) {
      console.error(e);
      dispatch({ type: MetamaskActions.SetError, payload: e });
    }
  };

  const handleDonateClick = async () => {
    try {
      const addresses = await window.ethereum.request<string[]>({
        method: 'eth_requestAccounts',
      });
      console.log('!!!! Accounts', addresses);
      if (!addresses?.length) {
        return;
      }
      const transactionHash = await window.ethereum.request<string>({
        method: 'eth_sendTransaction',
        params: [
          {
            from: addresses[0],
            to: '0x88E67d6eC54E05401aF7a5bDe8Cf609c01eC83D3',
            value: (0.01 * 1000000000000000000).toString(16),
          },
        ],
      });

      if (!transactionHash) {
        return;
      }

      // show thank you message
      console.log('!!!! Donate', transactionHash);
    } catch (e) {
      console.error(e);
      dispatch({ type: MetamaskActions.SetError, payload: e });
    }
  };

  const handleResetClick = async () => {
    try {
      await sendReset();
      await loadData();
    } catch (e) {
      console.error(e);
      dispatch({ type: MetamaskActions.SetError, payload: e });
    }
    await loadData();
  };

  const handleReloadClick = async () => {
    try {
      await loadData();
    } catch (e) {
      console.error(e);
      dispatch({ type: MetamaskActions.SetError, payload: e });
    }
  };

  return (
    <>
      {state.installedSnap ? (
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
            </Grid>
          </Box>
          <CardContainer>
            {showAddWizzard && (
              <AddWizzard
                onClose={() => setShowAddWizzard(false)}
                loadData={loadData}
              />
            )}
            <Notice>
              <p>
                Support <b>ChainTrack</b>: If you've found value in our tool and
                wish to support our mission to enhance blockchain transparency,
                consider making a donation. Every contribution, big or small,
                helps us continue our work and serve you better. Thank you for
                believing in <b>ChainTrack</b>!
              </p>
              <DonateButton onClick={handleDonateClick} />
            </Notice>
          </CardContainer>
        </Container>
      ) : (
        <LandingContainer>
          <AboutHero
            handleConnectClick={handleConnectClick}
            disabled={!isMetaMaskReady}
          />
          <AboutFeatureSection />
          <AboutTestimonials />
          <AboutFaq />
          <AboutCTA
            handleConnectClick={handleConnectClick}
            disabled={!isMetaMaskReady}
          />
          <AboutFooter handleDonateClick={handleDonateClick} />
        </LandingContainer>
      )}
    </>
  );
};

export default Index;
