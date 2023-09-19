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
  InstallFlaskButton,
  ReconnectButton,
  Card,
  SendAddButton,
  ReloadButton,
  ResetButton,
  TransactionsTable,
  AlertsTable,
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
  const [state, dispatch] = useContext(MetaMaskContext);

  const isMetaMaskReady = isLocalSnap(defaultSnapOrigin)
    ? state.isFlask
    : state.snapsDetected;

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
    try {
      await connectSnap();
      const installedSnap = await getSnap();

      dispatch({
        type: MetamaskActions.SetInstalled,
        payload: installedSnap,
      });
    } catch (e) {
      console.error(e);
      dispatch({ type: MetamaskActions.SetError, payload: e });
    }
    await loadData();
  };

  const handleSendAddClick = async () => {
    try {
      await sendAdd();
    } catch (e) {
      console.error(e);
      dispatch({ type: MetamaskActions.SetError, payload: e });
    }
  };

  const handleResetClick = async () => {
    try {
      await sendReset();
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
        Welcome to <Span>template-snap</Span>
      </Heading>
      <Subtitle>
        Get started by editing <code>src/index.ts</code>
      </Subtitle>
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
                'Snaps is pre-release software only available in MetaMask Flask, a canary distribution for developers with access to upcoming features.',
              button: <InstallFlaskButton />,
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
                />
              ),
            }}
            disabled={!state.installedSnap}
          />
        )}
        <Card
          content={{
            title: 'Add monitor',
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
          data={
            state?.monitors?.length
              ? state.monitors.map((item, index) => {
                  return {
                    id: index + 1,
                    from: item.from,
                    to: item.to,
                    intervalHours: item.intervalHours,
                  };
                })
              : [
                  {
                    id: 1,
                    from: '0xC8CD462620feA7CBc2D237DC966655B02FeA5b21',
                    to: '0x6Cc9397c3B38739daCbfaA68EaD5F5D77Ba5F455',
                    intervalHours: '24',
                  },
                  {
                    id: 2,
                    from: '0x6Cc9397c3B38739daCbfaA68EaD5F5D77Ba5F455',
                    to: '0xC8CD462620feA7CBc2D237DC966655B02FeA5b21',
                    intervalHours: '24',
                  },
                ]
          }
        />
        <AlertsTable
          title={'Alerts'}
          data={
            state?.alerts?.length
              ? state.alerts.map((item, index) => ({
                  id: index + 1,
                  from: item.from,
                  to: item.to,
                  intervalHours: item.intervalHours,
                  date: item.date,
                }))
              : [
                  {
                    id: 1,
                    from: '0xC8CD462620feA7CBc2D237DC966655B02FeA5b21',
                    to: '0x6Cc9397c3B38739daCbfaA68EaD5F5D77Ba5F455',
                    intervalHours: '24',
                    date: new Date(),
                  },
                  {
                    id: 2,
                    from: '0x6Cc9397c3B38739daCbfaA68EaD5F5D77Ba5F455',
                    to: '0xC8CD462620feA7CBc2D237DC966655B02FeA5b21',
                    intervalHours: '24',
                    date: new Date(),
                  },
                ]
          }
        />
        <Notice>
          <p>
            Please note that the <b>snap.manifest.json</b> and{' '}
            <b>package.json</b> must be located in the server root directory and
            the bundle must be hosted at the location specified by the location
            field.
          </p>
        </Notice>
      </CardContainer>
    </Container>
  );
};

export default Index;
