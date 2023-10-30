import { useContext } from 'react';
import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import { navigate, Link } from 'gatsby';
import { useTheme } from '@mui/material/styles';
import { MetamaskActions, MetaMaskContext } from '../hooks';
import { connectSnap, getSnap } from '../utils';
import { Toggle } from './Toggle';
import { SnapName } from './SnapName';
import { MyButton } from './Button';
import { MetamaskFoxLogo } from './MetamaskFoxLogo';
import { Logo } from './Logo';
// eslint-disable-next-line import/no-unassigned-import
import './styles.css';

export const Header = ({
  handleToggleClick,
}: {
  handleToggleClick(): void;
}) => {
  const [state, dispatch] = useContext(MetaMaskContext);
  const theme = useTheme();

  const handleConnectClick = async () => {
    try {
      await connectSnap();
      const installedSnap = await getSnap();

      dispatch({
        type: MetamaskActions.SetInstalled,
        payload: installedSnap,
      });
      navigate('/tracking');
    } catch (e) {
      console.error(e);
      dispatch({ type: MetamaskActions.SetError, payload: e });
      dispatch({
        type: MetamaskActions.SetInstalled,
        payload: null,
      });
    }
  };

  return (
    <Box padding="2.4rem" alignItems="center" className="header-component">
      <Toolbar>
        <Box display="flex" flexGrow="1" alignItems="center" gap="24px">
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Box display="flex" alignItems="center">
              <Logo size={54} />
              <SnapName />
            </Box>
          </Link>
          <Link
            to="/tracking"
            style={{ textDecoration: 'none' }}
            color={theme.palette.primary.main}
          >
            <Typography
              sx={{
                color: theme.palette.primary.main,
                fontWeight: 'bold',
                marginLeft: '1rem',
                flexGrow: 1,
              }}
              variant="h4"
            >
              Tracking
            </Typography>
          </Link>
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
                disabled
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
      </Toolbar>
    </Box>
  );
};
