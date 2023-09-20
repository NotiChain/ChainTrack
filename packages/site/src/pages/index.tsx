import { useContext } from 'react';
import styled from 'styled-components';
import { MetamaskActions, MetaMaskContext } from '../hooks';
import {
  connectSnap,
  getSnap,
  isLocalSnap,
  sendAdd,
  sendReset,
  getAlerts,
  getMonitors,
  shouldDisplayReconnectButton,
} from '../utils';
import {
  ConnectButton,
  InstallMetamaskButton,
  ReconnectButton,
  Card,
  SendAddButton,
  ReloadButton,
  ResetButton,
  TransactionsTable,
  AlertsTable,
  DonateButton,
} from '../components';
import { defaultSnapOrigin } from '../config';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  margin-top: 7.6rem;
  margin-bottom: 7.6rem;
  ${({ theme }) => theme.mediaQueries.small} {
    padding-left: 2.4rem;
    padding-right: 2.4rem;
    margin-top: 2rem;
    margin-bottom: 2rem;
    width: auto;
  }
`;

const Heading = styled.h1`
  margin-top: 0;
  margin-bottom: 2.4rem;
  text-align: center;
`;

const Span = styled.span`
  color: ${(props) => props.theme.colors.primary.default};
`;

const Subtitle = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.large};
  font-weight: 500;
  margin-top: 0;
  margin-bottom: 0;
  ${({ theme }) => theme.mediaQueries.small} {
    font-size: ${({ theme }) => theme.fontSizes.text};
  }
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  max-width: 64.8rem;
  width: 100%;
  height: 100%;
  margin-top: 1.5rem;
`;

const Notice = styled.div`
  background-color: ${({ theme }) => theme.colors.background.alternative};
  border: 1px solid ${({ theme }) => theme.colors.border.default};
  color: ${({ theme }) => theme.colors.text.alternative};
  border-radius: ${({ theme }) => theme.radii.default};
  padding: 2.4rem;
  margin-top: 2.4rem;
  max-width: 60rem;
  width: 100%;

  & > * {
    margin: 0;
  }
  ${({ theme }) => theme.mediaQueries.small} {
    margin-top: 1.2rem;
    padding: 1.6rem;
  }
`;

const ErrorMessage = styled.div`
  background-color: ${({ theme }) => theme.colors.error.muted};
  border: 1px solid ${({ theme }) => theme.colors.error.default};
  color: ${({ theme }) => theme.colors.error.alternative};
  border-radius: ${({ theme }) => theme.radii.default};
  padding: 2.4rem;
  margin-bottom: 2.4rem;
  margin-top: 2.4rem;
  max-width: 60rem;
  width: 100%;
  ${({ theme }) => theme.mediaQueries.small} {
    padding: 1.6rem;
    margin-bottom: 1.2rem;
    margin-top: 1.2rem;
    max-width: 100%;
  }
`;

const Index = () => {
  let loadDataInterval: NodeJS.Timeout | null = null;
  const [state, dispatch] = useContext(MetaMaskContext);

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
      await sendAdd();
      await loadData();
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
    <Container>
      <Heading>
        Welcome to <Span>ChainTrack</Span>
      </Heading>
      <Subtitle>Get started by adding a new transaction to monitor!</Subtitle>
      <CardContainer>
        {state.error && (
          <ErrorMessage>
            <b>An error happened:</b> {state.error.message}
          </ErrorMessage>
        )}
        {!isMetaMaskReady && (
          <Card
            content={{
              title: 'Install',
              description:
                'Snaps is an extensions for MetaMask that allows you extend base functionality.',
              button: <InstallMetamaskButton />,
            }}
            fullWidth
          />
        )}
        {!state.installedSnap && (
          <Card
            content={{
              title: 'Connect',
              description:
                'Get started by connecting to and installing the example snap.',
              button: (
                <ConnectButton
                  onClick={handleConnectClick}
                  disabled={!isMetaMaskReady}
                />
              ),
            }}
            disabled={!isMetaMaskReady}
          />
        )}
        {shouldDisplayReconnectButton(state.installedSnap) && (
          <Card
            content={{
              title: 'Reconnect',
              description:
                'While connected to a local running snap this button will always be displayed in order to update the snap if a change is made.',
              button: (
                <ReconnectButton
                  onClick={handleConnectClick}
                  disabled={!state.installedSnap}
                  isFlask={state.isFlask}
                />
              ),
            }}
            disabled={!state.installedSnap}
          />
        )}
        <Card
          content={{
            title: 'Add transaction to monitor',
            description: 'Add new transaction to monitor right from the snap.',
            button: (
              <SendAddButton
                onClick={handleSendAddClick}
                disabled={!state.installedSnap}
              />
            ),
          }}
          disabled={!state.installedSnap}
          fullWidth={
            isMetaMaskReady &&
            Boolean(state.installedSnap) &&
            !shouldDisplayReconnectButton(state.installedSnap)
          }
        />
        <Card
          content={{
            title: 'Reset Snap',
            description: 'Remove all your tracks from the snap and start over.',
            button: (
              <ResetButton
                onClick={handleResetClick}
                disabled={!state.installedSnap}
              />
            ),
          }}
          disabled={!state.installedSnap}
          fullWidth={
            isMetaMaskReady &&
            Boolean(state.installedSnap) &&
            !shouldDisplayReconnectButton(state.installedSnap)
          }
        />
        <Card
          content={{
            title: 'Reload Data',
            description: 'Get up to date info from snap.',
            button: (
              <ReloadButton
                onClick={handleReloadClick}
                disabled={!state.installedSnap}
              />
            ),
          }}
          disabled={!state.installedSnap}
          fullWidth={
            isMetaMaskReady &&
            Boolean(state.installedSnap) &&
            !shouldDisplayReconnectButton(state.installedSnap)
          }
        />
        <TransactionsTable
          title={'Transactions to monitor'}
          disabled={!state.installedSnap}
          data={state?.monitors?.map((item, index) => {
            return {
              id: index + 1,
              from: item.from,
              to: item.to,
              intervalHours: item.intervalHours,
            };
          })}
        />
        <AlertsTable
          title={'Alerts'}
          disabled={!state.installedSnap}
          data={state?.alerts?.map((item, index) => ({
            id: index + 1,
            from: item.monitor.from,
            to: item.monitor.to,
            intervalHours: item.monitor.intervalHours,
            date: item.date,
          }))}
        />
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

export default Index;
