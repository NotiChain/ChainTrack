import React, { FC } from 'react';
import styled from 'styled-components';

const HeroButton = styled.button`
  padding: 20px 40px;
  background: ${(props) => props.theme.colors.about.inverse};
  color: ${(props) => props.theme.colors.about.default};
  border-radius: 8px;

  font-size: 32px;
  font-weight: 500;

  &:hover {
    background-color: ${(props) => props.theme.colors.about.default};
    color: ${(props) => props.theme.colors.about.inverse};
  }
`;

const H1 = styled.h1`
  font-size: 60px;
  font-weight: bold;
  line-height: 108px;
  margin: 0 0 10px 0;
`;

const HeroBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

  padding: 0 120px;
  margin-bottom: 250px;

  ${(props) => props.theme.mediaQueries.small} {
    padding: 0 20px;
  }
`;

type AboutCTAProps = {
  handleConnectClick(): void;
  disabled: boolean;
};

export const AboutCTA: FC<AboutCTAProps> = ({
  handleConnectClick,
  disabled,
}) => {
  return (
    <HeroBox>
      <H1>Stay on top of your recurring transactions.</H1>
      <H1>Experience the ChainTrack difference today.</H1>
      <HeroButton disabled={disabled} onClick={handleConnectClick}>
        Get Started with ChainTrack
      </HeroButton>
    </HeroBox>
  );
};
