import React, { FC } from 'react';
import styled from 'styled-components';
import { AboutHero } from '../components/About/AboutHero';
import { AboutFeatureSection } from '../components/About/AboutFeatureSection';
import { AboutTestimonials } from '../components/About/AboutTestimonials';
import { AboutFaq } from '../components/About/AboutFAQ';
import { AboutCTA } from '../components/About/AboutCTA';
import { AboutFooter } from '../components/About/AboutFooter';

const Container = styled.div`
  background: black;
  color: white;
`;

export const About: FC = () => {
  return (
    <Container>
      <AboutHero />
      <AboutFeatureSection />
      <AboutTestimonials />
      <AboutFaq />
      <AboutCTA />
      <AboutFooter />
    </Container>
  );
};
