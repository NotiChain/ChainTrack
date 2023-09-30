import { ReactNode } from 'react';
import styled from 'styled-components';

type CardProps = {
  content: {
    title?: string;
    description: ReactNode;
    button?: ReactNode;
  };
  disabled?: boolean;
  fullWidth?: boolean;
};

const CardWrapper = styled.div<{ fullWidth?: boolean; disabled: boolean }>`
  display: flex;
  flex-direction: column;
  width: ${({ fullWidth }) => (fullWidth ? '100%' : '250px')};
  //background-color: ${({ theme }) => theme.colors.card.default};
  margin-top: 2.4rem;
  margin-bottom: 2.4rem;
  padding: 2.4rem;
  //border: 1px solid ${({ theme }) => theme.colors.border.default};
  //border-radius: ${({ theme }) => theme.radii.default};
  //box-shadow: ${({ theme }) => theme.shadows.default};
  filter: opacity(${({ disabled }) => (disabled ? '.4' : '1')});
  align-self: stretch;
`;

const Title = styled.h2`
  //font-size: ${({ theme }) => theme.fontSizes.large};
  margin: 0;
`;

const Description = styled.div`
  margin-top: 2.4rem;
  margin-bottom: 2.4rem;
`;

export const Card = ({ content, disabled = false, fullWidth }: CardProps) => {
  const { title, description, button } = content;
  return (
    <CardWrapper fullWidth={fullWidth} disabled={disabled}>
      {title && <Title>{title}</Title>}
      <Description>{description}</Description>
      {button}
    </CardWrapper>
  );
};
