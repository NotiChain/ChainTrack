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

const HeroBox = styled.div`
  display: flex;
  justify-content: center;
  border-top: 1px dotted rgba(255, 255, 255, 0.6);
  align-items: center;
  text-align: center;
  flex-wrap: wrap;
  gap: 40px;
  padding: 20px 0;
`;

const Body2 = styled.p`
  width: 60%;
  text-align: left;
  font-weight: 500;
  font-size: 30px;
  margin: 0;
`;

export const AboutFooter: FC = () => {
  return (
    <HeroBox>
      <Body2>
        If ChainTrack has streamlined your tracking experience, consider
        supporting our mission to enhance transparency in recurring
        transactions.
      </Body2>
      <HeroButton>Donate</HeroButton>
    </HeroBox>
  );
};
