import React, { ReactElement, useContext, useEffect } from 'react';
import { navigate } from 'gatsby';
import { MetamaskActions, MetaMaskContext } from '../hooks';
import {
  connectSnap,
  getAlerts,
  getMonitors,
  getUserStats,
  getSnap,
  isLocalSnap,
  resetData,
  sendAdd,
} from '../utils';
import { defaultSnapOrigin } from '../config';
import Analytics, { Action } from '../utils/analytics';
import { ChainIdToNameEnum } from '../../../shared/types';
import { TRACKING_ROUTE } from '../routes';
import ErrorHandler from './ErrorHandler';

export type LayoutChildrenProps = {
  handleConnectClick: () => void;
  handleResetClick: () => void;
  handleReloadClick: () => void;
  handleAddClick: () => void;
  loadSnapData: () => void;
  isMetaMaskReady: boolean;
};

type LayoutProps = {
  children: (props: LayoutChildrenProps) => ReactElement;
};

const Layout = ({ children }: LayoutProps) => {
  let loadDataInterval: NodeJS.Timeout | null = null;
  const [state, dispatch] = useContext(MetaMaskContext);
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

  const loadUserStats = async () => {
    try {
      const data = await getUserStats();
      dispatch({ type: MetamaskActions.SetUserStats, payload: data });
    } catch (e) {
      console.error(e);
      dispatch({ type: MetamaskActions.SetError, payload: e });
    }
  };

  async function loadSnapData() {
    dispatch({ type: MetamaskActions.SetLoading, payload: true });
    await Promise.all([
      getWallets(),
      getChain(),
      loadMonitors(),
      loadAlerts(),
      loadUserStats(),
    ]);
    dispatch({ type: MetamaskActions.SetLoading, payload: false });
  }

  async function startLoadingSnapData() {
    if (!loadDataInterval) {
      await loadSnapData();
      // eslint-disable-next-line require-atomic-updates
      loadDataInterval = setInterval(loadSnapData, 5 * 60 * 1000);
    }
  }

  const handleConnectClick = async () => {
    if (loadDataInterval) {
      clearInterval(loadDataInterval);
      loadDataInterval = null;
    }

    Analytics.trackUserEvent({
      action: Action.snapConnectClick,
    });

    try {
      await connectSnap();
      const installedSnap = await getSnap();

      dispatch({
        type: MetamaskActions.SetInstalled,
        payload: installedSnap,
      });

      await startLoadingSnapData();
      navigate(TRACKING_ROUTE);
    } catch (e) {
      console.error(e);
      dispatch({ type: MetamaskActions.SetError, payload: e });
      dispatch({
        type: MetamaskActions.SetInstalled,
        payload: null,
      });
    }
  };

  const handleResetClick = async () => {
    try {
      await resetData();
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

  const handleAddClick = async () => {
    try {
      await sendAdd();
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
    <ErrorHandler>
      {children({
        handleConnectClick,
        handleReloadClick,
        handleResetClick,
        handleAddClick,
        isMetaMaskReady,
        loadSnapData,
      })}
    </ErrorHandler>
  );
};

export default Layout;
