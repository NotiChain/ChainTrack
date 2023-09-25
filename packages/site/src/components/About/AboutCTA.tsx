import React, { FC } from 'react';
import styled from 'styled-components';

const HeroButton = styled.button`
  padding: 30px 40px;
  background-color: white;
  color: black;
  border-radius: 0px;

  font-size: 32px;
  font-weight: 500;
`;

const H1 = styled.h1`
  font-size: 80px;
  font-weight: bold;
  line-height: 108px;
`;

const HeroBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

  padding: 0 120px;
  margin-bottom: 250px;
`;

export const AboutCTA: FC = () => {
  return (
    <HeroBox>
      <H1>Stay on top of your recurring transactions.</H1>
      <H1>Experience the ChainTrack difference today.</H1>
      <HeroButton>Get Started with ChainTrack</HeroButton>
    </HeroBox>
  );
};
