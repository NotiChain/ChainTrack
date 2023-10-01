import styled from 'styled-components';
import { AboutHero } from '../components/About/AboutHero';
import { AboutFeatureSection } from '../components/About/AboutFeatureSection';
import { AboutTestimonials } from '../components/About/AboutTestimonials';
import { AboutFaq } from '../components/About/AboutFAQ';
import { AboutCTA } from '../components/About/AboutCTA';
import { AboutFooter } from '../components/About/AboutFooter';

const LandingContainer = styled.div`
  // background: ${(props) => props.theme.colors.about.default};
  // color: ${(props) => props.theme.colors.about.inverse};
  background: linear-gradient(to top right, #2f2727, #1a82f7);
`;

type LandingPageProps = {
  handleConnectClick: () => void;
  isMetaMaskReady: boolean;
  handleDonateClick: () => void;
};

export const LandingPage = ({
  handleConnectClick,
  isMetaMaskReady,
  handleDonateClick,
}: LandingPageProps) => {
  return (
    <LandingContainer>
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
      <AboutFooter handleDonateClick={handleDonateClick} />
    </LandingContainer>
  );
};
