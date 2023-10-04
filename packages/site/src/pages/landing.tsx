import { Box, useTheme } from '@mui/material';
import { AboutHero } from '../components/About/AboutHero';
import { AboutFeatureSection } from '../components/About/AboutFeatureSection';
import { AboutTestimonials } from '../components/About/AboutTestimonials';
import { AboutFaq } from '../components/About/AboutFAQ';
import { AboutCTA } from '../components/About/AboutCTA';

type LandingPageProps = {
  handleConnectClick: () => void;
  isMetaMaskReady: boolean;
};

export const LandingPage = ({
  handleConnectClick,
  isMetaMaskReady,
}: LandingPageProps) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        background:
          theme?.palette?.mode === 'dark'
            ? 'linear-gradient(to top right, #2f2727, #1a82f7)'
            : '',
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
  );
};
