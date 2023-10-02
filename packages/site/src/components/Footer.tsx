import styled from 'styled-components';
import { SnapLogo } from './SnapLogo';
import { SnapName } from './SnapName';

const FooterWrapper = styled.footer`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: 2.4rem;
  //border-top: 1px solid ${(props) => props.theme.colors.border.default};
`;

const LogoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const Footer = () => {
  return (
    <FooterWrapper>
      <LogoWrapper>
        <SnapLogo color="black" size={36} />
        <SnapName />
      </LogoWrapper>
    </FooterWrapper>
  );
};
