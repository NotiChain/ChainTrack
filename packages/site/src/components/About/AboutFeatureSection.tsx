import React, { FC } from 'react';
import styled from 'styled-components';
import { CodeIcon } from '../../assets/icons/CodeIcon';
import { MobileIcon } from '../../assets/icons/MobileIcon';
import { StarIcon } from '../../assets/icons/StarIcon';

const FeatureCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 24px;
  max-width: 544px;
  color: ${(props) => props.theme.colors.about.inverse};
  background: ${(props) => props.theme.colors.about.card};
`;

const SubHeading = styled.p`
  font-size: 32px;
  font-weight: 600;
  margin: 0;
`;

const SubHeading1 = styled.span`
  font-size: 40px;
  font-weight: 500;
`;

const Body2 = styled.p`
  font-weight: 400;
  font-size: 20px;
  opacity: 60%;
  margin: 0;
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 24px;
  row-gap: 24px;

  @media (max-width: 700px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const RightPart = styled.div`
  width: 60%;
  @media (max-width: 900px) {
    width: 100%;
  }
`;

const LeftPart = styled.div`
  width: 35%;
  @media (max-width: 900px) {
    display: none;
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 120px;
  margin-bottom: 180px;

  ${(props) => props.theme.mediaQueries.small} {
    padding: 0 20px;
  }
`;

const Heading4 = styled.h4`
  font-size: 50px;
  font-weight: 500;
  margin: 0;
`;

const BorderLine = styled.div`
  min-height: 25px;
  margin: 60px 0 40px 0;
  background: linear-gradient(
    90deg,
    #ffffff -1.56%,
    #61a1dd 24.89%,
    #3864d3 100%
  );
`;

export const AboutFeatureSection: FC = () => {
  return (
    <Container>
      <LeftPart>
        <SubHeading1>WHAT WE DO</SubHeading1>
      </LeftPart>
      <RightPart>
        <Heading4>
          Designed exclusively for MetaMask users, we ensure every recurring
          transaction is right at your fingertips.
        </Heading4>
        <BorderLine />
        <FeatureGrid>
          <FeatureCard>
            <CodeIcon />
            <SubHeading>Instant Alerts</SubHeading>
            <Body2>
              Stay informed with real-time notifications. With ChainTrack,
              missed recurring transactions are a thing of the past.
            </Body2>
          </FeatureCard>
          <FeatureCard>
            <MobileIcon />
            <SubHeading>User-Friendly Interface</SubHeading>
            <Body2>
              Navigate with ease. ChainTrack's intuitive design ensures you get
              the information you need without the hassle.
            </Body2>
          </FeatureCard>
          <FeatureCard>
            <StarIcon />
            <SubHeading>Top-Notch Security</SubHeading>
            <Body2>
              Your data's safety is paramount. ChainTrack operates with
              stringent security protocols, giving you peace of mind.
            </Body2>
          </FeatureCard>
          <FeatureCard>
            <CodeIcon />
            <SubHeading>Detailed Insights</SubHeading>
            <Body2>
              Understand your transactions better. Dive deep into analytics and
              gain clarity on your recurring transactions.
            </Body2>
          </FeatureCard>
        </FeatureGrid>
      </RightPart>
    </Container>
  );
};
