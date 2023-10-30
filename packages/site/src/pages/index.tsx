import { Box, useTheme } from '@mui/material';
import { AboutHero } from '../components/About/AboutHero';
import { AboutFeatureSection } from '../components/About/AboutFeatureSection';
import { AboutTestimonials } from '../components/About/AboutTestimonials';
import { AboutFaq } from '../components/About/AboutFAQ';
import { AboutCTA } from '../components/About/AboutCTA';
import Layout from '../components/Layout';

const HomePage = () => {
  const theme = useTheme();

  return (
    <Layout>
      {({ handleConnectClick, isMetaMaskReady }) => (
        <Box
          sx={{
            [theme?.custom?.mediaQueries?.small]: {
              padding: '0 20px',
            },
            padding: '0 120px',
          }}
        >
          <AboutHero
            handleConnectClick={handleConnectClick}
            disabled={!isMetaMaskReady}
          />
          <AboutFeatureSection />
          <AboutTestimonials />
          <AboutFaq />
          <AboutCTA
            handleConnectClick={handleConnectClick}
            disabled={!isMetaMaskReady}
          />
        </Box>
      )}
    </Layout>
  );
};

export default HomePage;
