import { ComponentProps } from 'react';
import styled from 'styled-components';
import { MetamaskState } from '../hooks';
import { ReactComponent as MetamaskFlaskFox } from '../assets/flask_fox.svg';
import { ReactComponent as MetamaskFox } from '../assets/metamask_fox.svg';

const Link = styled.a`
  display: flex;
  align-self: flex-start;
  align-items: center;
  justify-content: center;
  //font-size: ${(props) => props.theme.fontSizes.small};
  //border-radius: ${(props) => props.theme.radii.button};
  // border: 1px solid ${(props) => props.theme.colors.background.inverse};
  // background-color: ${(props) => props.theme.colors.background.inverse};
  //color: ${(props) => props.theme.colors.text.inverse};
  text-decoration: none;
  font-weight: bold;
  padding: 1rem;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: transparent;
    //border: 1px solid ${(props) => props.theme.colors.background.inverse};
    //color: ${(props) => props.theme.colors.text.default};
  }
`;

const Button = styled.button`
  display: flex;
  align-self: flex-start;
  align-items: center;
  justify-content: center;
  margin-top: auto;
`;

const ButtonText = styled.span`
  margin-left: 1rem;
`;

const ConnectedContainer = styled.div`
  display: flex;
  align-self: flex-start;
  align-items: center;
  justify-content: center;
  //font-size: ${(props) => props.theme.fontSizes.small};
  //border-radius: ${(props) => props.theme.radii.button};
  // border: 1px solid ${(props) => props.theme.colors.background.inverse};
  // background-color: ${(props) => props.theme.colors.background.inverse};
  //color: ${(props) => props.theme.colors.text.inverse};
  font-weight: bold;
  padding: 1.2rem;
`;

const ConnectedIndicator = styled.div`
  content: ' ';
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: green;
`;

export const InstallMetamaskFlaskButton = () => (
  <Link href="https://metamask.io/flask/" target="_blank">
    <MetamaskFlaskFox />
    <ButtonText>Install MetaMask Flask</ButtonText>
  </Link>
);

export const InstallMetamaskButton = () => (
  <Link href="https://metamask.io/download/" target="_blank">
    <MetamaskFox />
    <ButtonText>Install MetaMask</ButtonText>
  </Link>
);

export const ConnectButton = (props: ComponentProps<typeof Button>) => {
  return (
    <Button {...props}>
      <MetamaskFox />
      <ButtonText>Connect</ButtonText>
    </Button>
  );
};

export const ReconnectButton = (props: ComponentProps<typeof Button>) => {
  return (
    <Button {...props}>
      {props.isFlask ? <MetamaskFlaskFox /> : <MetamaskFox />}
      <ButtonText>Reconnect</ButtonText>
    </Button>
  );
};

export const HeaderButtons = ({
  state,
  onConnectClick,
}: {
  state: MetamaskState;
  onConnectClick(): unknown;
}) => {
  if (!state.installedSnap) {
    return <ConnectButton onClick={onConnectClick} />;
  }

  return (
    <ConnectedContainer>
      <ConnectedIndicator />
      <ButtonText>Connected</ButtonText>
    </ConnectedContainer>
  );
};
