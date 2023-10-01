import { useContext } from 'react';

import { MetamaskActions, MetaMaskContext } from '../hooks';
import {
  connectSnap,
  getSnap,
  isLocalSnap,
  sendAdd,
  sendReset,
  getAlerts,
  getMonitors,
} from '../utils';
import { defaultSnapOrigin } from '../config';

import { LandingPage } from './landing';
import { AppPage } from './app';

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
        await loadData();
        loadDataInterval = setInterval(loadData, 5 * 60 * 1000);
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
    <>
      {state.installedSnap ? (
        <AppPage
          handleConnectClick={handleConnectClick}
          handleReloadClick={handleReloadClick}
          handleDonateClick={handleDonateClick}
          handleResetClick={handleResetClick}
          handleSendAddClick={handleSendAddClick}
          isMetaMaskReady={isMetaMaskReady}
        />
      ) : (
        <LandingPage
          handleConnectClick={handleConnectClick}
          handleDonateClick={handleDonateClick}
          isMetaMaskReady={isMetaMaskReady}
        />
      )}
    </>
  );
};

export default Index;
