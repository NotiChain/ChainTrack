import { useContext } from 'react';
import { Box } from '@mui/material';
import { MetamaskActions, MetaMaskContext } from '../hooks';
import { connectSnap, getThemePreference, getSnap } from '../utils';
import { HeaderButtons } from './Buttons';
import { SnapLogo } from './SnapLogo';
import { Toggle } from './Toggle';
import { SnapName } from './SnapName';

export const Header = ({
  handleToggleClick,
}: {
  handleToggleClick(): void;
}) => {
  const [state, dispatch] = useContext(MetaMaskContext);

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
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      padding="2.4rem"
    >
      <Box display="flex" alignItems="center">
        <SnapLogo color="black" size={36} />
        <SnapName />
      </Box>
      <Box display="flex" alignItems="center">
        <Toggle
          onToggle={handleToggleClick}
          defaultChecked={getThemePreference()}
        />
        <HeaderButtons state={state} onConnectClick={handleConnectClick} />
      </Box>
    </Box>
  );
};
