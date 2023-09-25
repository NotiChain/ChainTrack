import React, { FC } from 'react';
import styled from 'styled-components';

const HeroButton = styled.button`
  padding: 30px 40px;
  background-color: white;
  color: black;
  border-radius: 0px;

  margin-top: 100px;

  font-size: 32px;
  font-weight: 500;
`;

const H1 = styled.h1`
  font-size: 80px;
  font-weight: bold;
  line-height: 108px;
  margin: 0;
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

export const AboutHero: FC = () => {
  return (
    <HeroBox>
      <H1>ChainTrack</H1>
      <H1>Never Miss a Transaction Again.</H1>
      <HeroButton>GET IN TOUCH</HeroButton>
    </HeroBox>
  );
};
