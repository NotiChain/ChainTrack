import React, { FC } from 'react';
import styled from 'styled-components';

const TestimonialCard = styled.div`
  padding: 32px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  max-width: 750px;

  display: flex;
  flex-direction: column;
  gap: 60px;
`;

const TestimonialPerson = styled.div`
  width: 40%;
`;

const Body2 = styled.p`
  font-weight: 400;
  font-size: 20px;
  margin: 0;
`;

const Body1 = styled.p`
  font-weight: 500;
  font-size: 32px;
  margin: 0;
`;

const Body2op = styled.p`
  font-weight: 400;
  font-size: 20px;
  opacity: 40%;
  margin: 0;
`;

const Container = styled.div`
  display: flex;
  gap: 20px;
  padding: 0 120px;
  margin-bottom: 180px;
`;

export const AboutTestimonials: FC = () => {
  return (
    <Container>
      <TestimonialCard>
        <Body1>
          "Simple, effective, and reliable. ChainTrack has made my MetaMask
          experience so much smoother"
        </Body1>
        <TestimonialPerson>
          <Body2>Taylor S.</Body2>
          <Body2op>Blockchain Analyst</Body2op>
        </TestimonialPerson>
      </TestimonialCard>
      <TestimonialCard>
        <Body1>
          "Simple, effective, and reliable. ChainTrack has made my MetaMask
          experience so much smoother"
        </Body1>
        <TestimonialPerson>
          <Body2>Taylor S.</Body2>
          <Body2op>Blockchain Analyst</Body2op>
        </TestimonialPerson>
      </TestimonialCard>
    </Container>
  );
};
