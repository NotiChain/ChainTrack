import styled, { useTheme } from 'styled-components';
import { SnapLogo } from './SnapLogo';

const FooterWrapper = styled.footer`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: 2.4rem;
  border-top: 1px solid ${(props) => props.theme.colors.border.default};
`;

const LogoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Title = styled.p`
  font-size: ${(props) => props.theme.fontSizes.title};
  font-weight: bold;
  margin: 0;
  margin-left: 1.2rem;
  ${({ theme }) => theme.mediaQueries.small} {
    display: none;
  }
`;

export const Footer = () => {
  const theme = useTheme();

  return (
    <FooterWrapper>
      <LogoWrapper>
        <SnapLogo color={theme.colors.icon.default} size={36} />
        <Title>ChainTrack</Title>
      </LogoWrapper>
    </FooterWrapper>
  );
};
