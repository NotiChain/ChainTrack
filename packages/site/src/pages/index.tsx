import { useContext, useEffect } from 'react';

import { MetamaskActions, MetaMaskContext } from '../hooks';
import {
  connectSnap,
  getAlerts,
  getMonitors,
  getSnap,
  isLocalSnap,
  sendAdd,
  sendReset,
} from '../utils';
import { defaultSnapOrigin } from '../config';

import { ChainIdToNameEnum } from '../../../shared/types';
import { LandingPage } from './landing';
import { AppPage } from './app';

const Index = () => {
  let loadDataInterval: NodeJS.Timeout | null = null;
  const [state, dispatch] = useContext(MetaMaskContext);
  // const isMetaMaskReady = isLocalSnap(defaultSnapOrigin)
  //   ? state.isFlask
  //   : state.snapsDetected;

  const isMetaMaskReady = isLocalSnap(defaultSnapOrigin) && state.snapsDetected;

  const getWallets = async () => {
    try {
      const data = await window.ethereum.request<string[]>({
        method: 'eth_requestAccounts',
      });
      dispatch({ type: MetamaskActions.SetWallets, payload: data });
    } catch (e) {
      console.error(e);
      dispatch({ type: MetamaskActions.SetError, payload: e });
    }
  };

  const getChain = async () => {
    try {
      const data = await window.ethereum.request<
        keyof typeof ChainIdToNameEnum
      >({
        method: 'eth_chainId',
      });
      dispatch({ type: MetamaskActions.SetChain, payload: data });
    } catch (e) {
      console.error(e);
      dispatch({ type: MetamaskActions.SetError, payload: e });
    }
  };

  const loadMonitors = async () => {
    try {
      const data = await getMonitors();
      dispatch({ type: MetamaskActions.SetMonitors, payload: data });
    } catch (e) {
      console.error(e);
      dispatch({ type: MetamaskActions.SetError, payload: e });
    }
  };

  const loadAlerts = async () => {
    try {
      const data = await getAlerts();
      dispatch({ type: MetamaskActions.SetAlerts, payload: data });
    } catch (e) {
      console.error(e);
      dispatch({ type: MetamaskActions.SetError, payload: e });
    }
  };

  async function loadSnapData() {
    await Promise.all([getWallets(), getChain(), loadMonitors(), loadAlerts()]);
  }

  async function startLoadingSnapData() {
    if (!loadDataInterval) {
      await loadSnapData();
      loadDataInterval = setInterval(loadSnapData, 5 * 60 * 1000);
    }
  }

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

      await startLoadingSnapData();
    } catch (e) {
      console.error(e);
      dispatch({ type: MetamaskActions.SetError, payload: e });
    }
  };

  const handleSendAddClick = async () => {
    try {
      await sendAdd();
      await loadSnapData();
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
      await loadSnapData();
    } catch (e) {
      console.error(e);
      dispatch({ type: MetamaskActions.SetError, payload: e });
    }
  };

  const handleReloadClick = async () => {
    try {
      await loadSnapData();
    } catch (e) {
      console.error(e);
      dispatch({ type: MetamaskActions.SetError, payload: e });
    }
  };

  useEffect(() => {
    if (state.installedSnap) {
      loadSnapData();
    }
  }, [state.installedSnap]);

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
          loadSnapData={loadSnapData}
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
