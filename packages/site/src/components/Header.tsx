import { useContext, useState } from 'react';
import {
  Box,
  IconButton,
  Menu,
  Toolbar,
  Typography,
  useMediaQuery,
} from '@mui/material';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import { navigate, Link } from 'gatsby';
import { useTheme } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import { MetamaskActions, MetaMaskContext } from '../hooks';
import { connectSnap, getSnap } from '../utils';
import Analytics, { Action } from '../utils/analytics';
import { HOME_ROUTE, TRACKING_ROUTE } from '../routes';
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
  const theme = useTheme();
  const screenLessThanMedium = useMediaQuery(theme.breakpoints.down('md'));
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleConnectClick = async () => {
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

  const InstalledSnapComponent = () => (
    <>
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
    </>
  );

  return (
    <Box padding="2.4rem" alignItems="center" className="header-component">
      <Toolbar>
        <Box display="flex" flexGrow="1" alignItems="center" gap="24px">
          <Link to={HOME_ROUTE} style={{ textDecoration: 'none' }}>
            <Box display="flex" alignItems="center">
              <Logo size={54} />
              <SnapName />
            </Box>
          </Link>
          {!screenLessThanMedium && (
            <Link
              to={TRACKING_ROUTE}
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
          )}
        </Box>
        <Box display="flex" alignItems="center">
          {screenLessThanMedium ? (
            <>
              <IconButton
                size="large"
                onClick={(event) => setAnchorEl(event?.currentTarget)}
              >
                <MenuIcon fontSize="large" />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={() => setAnchorEl(null)}
              >
                <MenuItem
                  onClick={() => {
                    navigate(HOME_ROUTE);
                    setAnchorEl(null);
                  }}
                  divider
                  sx={{ fontSize: '2rem' }}
                >
                  Home
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    navigate(TRACKING_ROUTE);
                    setAnchorEl(null);
                  }}
                  divider
                  sx={{ fontSize: '2rem' }}
                >
                  Tracking
                </MenuItem>
                <MenuItem
                  sx={{
                    justifyContent: 'center',
                    '&:hover': {
                      cursor: 'default',
                      backgroundColor: 'inherit',
                    },
                  }}
                >
                  <Toggle onToggle={handleToggleClick} />
                  <InstalledSnapComponent />
                </MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <Toggle onToggle={handleToggleClick} />
              <InstalledSnapComponent />
            </>
          )}
        </Box>
      </Toolbar>
    </Box>
  );
};
