import styled from 'styled-components';

interface IContainerProps {
  fullWidth?: boolean;
  variant?: 'primary' | 'secondary';
}

export const Container = styled.button<IContainerProps>`
  padding: 8px 16px;

  width: ${({ fullWidth }) => (fullWidth === true ? '100% ' : 'auto')};
  height: ${({ fullWidth }) => (fullWidth === true ? '100% ' : 'auto')};

  background-color: ${({ theme, variant }) =>
    variant === 'primary' ? theme.primary : 'transparent'};
  color: ${({ theme, variant }) =>
    variant === 'primary' ? theme.heading : theme.primary};

  border: ${({ theme }) => `1px solid ${theme.primary}`};

  border-radius: 4px;

  cursor: pointer;

  transition: 0.2s all;

  &:hover {
    box-shadow: ${({ theme }) => `0px 0px 5px 1px ${theme.oposite}50`};

    background-color: ${({ theme, variant }) =>
      variant === 'primary' ? 'auto' : theme.primary};
    color: ${({ theme, variant }) =>
      variant === 'primary' ? 'auto' : theme.heading};
  }
`;
