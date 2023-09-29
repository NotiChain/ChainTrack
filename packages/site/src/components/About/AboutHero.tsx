import React, { FC } from 'react';
import styled from 'styled-components';

const HeroButton = styled.button`
  padding: 20px 40px;
  background: ${(props) => props.theme.colors.about.inverse};
  color: ${(props) => props.theme.colors.about.default};

  margin-top: 20px;
  border-radius: 8px;

  font-size: 32px;
  font-weight: 500;

  &:hover {
    background-color: ${(props) => props.theme.colors.about.default};
    color: ${(props) => props.theme.colors.about.inverse};
  }
`;

const H1 = styled.h1`
  font-size: 80px;
  font-weight: bold;
  margin: 0;
  color: ${(props) => props.theme.colors.primary.default};
`;

const H2 = styled.h2`
  font-size: 50px;
  font-weight: bold;
  margin-top: 20px;
`;

const HeroBox = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

  padding: 0 120px;

  //background: linear-gradient(
  //  97.05deg,
  //  #00237d 20.07%,
  //  rgba(0, 35, 125, 0) 105.63%
  //);

  /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */ ;
`;

type AboutHeroProps = {
  handleConnectClick(): void;
  disabled: boolean;
};

export const AboutHero: FC<AboutHeroProps> = ({
  handleConnectClick,
  disabled,
}) => {
  return (
    <HeroBox>
      <H1>ChainTrack</H1>
      <H2>Never Miss a Transaction Again.</H2>
      <HeroButton disabled={disabled} onClick={handleConnectClick}>
        GET IN TOUCH
      </HeroButton>
    </HeroBox>
  );
};
