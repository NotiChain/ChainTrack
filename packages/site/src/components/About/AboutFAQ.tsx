import React, { FC } from 'react';
import styled from 'styled-components';

const FaqContainer = styled.div`
  padding: 20px 0;
  border-bottom: 1px dotted #ccc;
`;

const FaqContent = styled.div`
  font-size: 20px;
  font-weight: 300;
  padding: 0px 14px;
  margin: 0 40px;
  height: 0;
  overflow: hidden;
  position: relative;
  opacity: 0;
  color: white;
  -webkit-transition: 0.4s ease;
  -moz-transition: 0.4s ease;
  -o-transition: 0.4s ease;
  transition: 0.4s ease;
`;

const Plus = styled.div`
  position: absolute;
  margin-left: 20px;
  margin-top: 4px;
  z-index: 5;
  font-size: 42px;
  line-height: 100%;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -o-user-select: none;
  user-select: none;
  -webkit-transition: 0.2s ease;
  -moz-transition: 0.2s ease;
  -o-transition: 0.2s ease;
  transition: 0.2s ease;
`;

const Checkbox = styled.input`
  display: none;
  &:checked ~ ${FaqContent} {
    height: auto;
    opacity: 1;
    padding: 14px;
    color: white;
  }
  &:checked ~ ${Plus} {
    -webkit-transform: rotate(45deg);
    -moz-transform: rotate(45deg);
    -o-transform: rotate(45deg);
    transform: rotate(45deg);
  }
`;

const Label = styled.label`
  font-size: 24px;
  //width: 100%;
  position: relative;
  margin: 0;
  padding: 10px 10px 0 48px;
  display: block;
  cursor: pointer;
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

const SubHeading1 = styled.span`
  font-size: 40px;
  font-weight: 500;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 120px;
  margin-bottom: 200px;
`;

export const AboutFaq: FC = () => {
  return (
    <Container>
      <LeftPart>
        <SubHeading1>FAQ</SubHeading1>
      </LeftPart>
      <RightPart>
        <FaqContainer>
          <Checkbox id="q2" type="checkbox" />
          <Plus className="plus">+</Plus>
          <Label htmlFor="q2">
            How does ChainTrack integrate with MetaMask?
          </Label>
          <FaqContent>
            ChainTrack integrates seamlessly with MetaMask using secure
            protocols, ensuring your data remains private and safe.
          </FaqContent>
        </FaqContainer>
        <FaqContainer>
          <Checkbox id="q3" type="checkbox" />
          <Plus className="plus">+</Plus>
          <Label htmlFor="q3">Can I customize my alert preferences?</Label>
          <FaqContent>
            Yes! ChainTrack offers customizable alert settings tailored to your
            tracking needs.
          </FaqContent>
        </FaqContainer>
      </RightPart>
    </Container>
  );
};
