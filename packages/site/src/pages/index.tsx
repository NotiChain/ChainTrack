import { Box, useMediaQuery, useTheme } from '@mui/material';
import { useContext } from 'react';
import { AboutHero } from '../components/About/AboutHero';
import { AboutFeatureSection } from '../components/About/AboutFeatureSection';
import { AboutTestimonials } from '../components/About/AboutTestimonials';
import { AboutFaq } from '../components/About/AboutFAQ';
import { AboutCTA } from '../components/About/AboutCTA';
import Layout from '../components/Layout';
import { MetaMaskContext } from '../hooks';
// eslint-disable-next-line import/no-unassigned-import
import './styles.css';

const HomePage = () => {
  const theme = useTheme();
  const [state] = useContext(MetaMaskContext);
  const screenLessThanMedium = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Layout>
      {({ handleConnectClick, isMetaMaskReady }) => (
        <Box
          sx={{
            padding: screenLessThanMedium ? '20px' : '0 120px',
          }}
        >
          <AboutHero
            handleConnectClick={handleConnectClick}
            disabled={!isMetaMaskReady || Boolean(state.installedSnap)}
          />
          <AboutFeatureSection />
          <AboutTestimonials />
          <AboutFaq />
          <AboutCTA
            handleConnectClick={handleConnectClick}
            disabled={!isMetaMaskReady || Boolean(state.installedSnap)}
          />
        </Box>
      )}
    </Layout>
  );
};

export default HomePage;
