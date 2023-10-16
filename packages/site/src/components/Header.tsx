import { useContext } from 'react';
import { Box } from '@mui/material';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';

import { MetamaskActions, MetaMaskContext } from '../hooks';
import { connectSnap, getSnap } from '../utils';
import { Toggle } from './Toggle';
import { SnapName } from './SnapName';
import { MyButton } from './Button';
import { MetamaskFoxLogo } from './MetamaskFoxLogo';
import { Logo } from './Logo';

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
        <Logo size={54} />
        <SnapName />
      </Box>
      <Box display="flex" alignItems="center">
        <Toggle onToggle={handleToggleClick} />
        {state.installedSnap ? (
          <Box
            display="flex"
            alignSelf="flex-start"
            alignItems="center"
            justifyContent="center"
            padding="1.2rem"
            fontWeight="bold"
          >
            <MyButton
              startIcon={<CheckCircleOutlineOutlinedIcon color="success" />}
            >
              Connected
            </MyButton>
          </Box>
        ) : (
          <Box marginLeft="12px">
            <MyButton
              startIcon={<MetamaskFoxLogo />}
              onClick={handleConnectClick}
            >
              Connect
            </MyButton>
          </Box>
        )}
      </Box>
    </Box>
  );
};
