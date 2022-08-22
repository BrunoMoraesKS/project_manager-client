import styled from 'styled-components';

interface IContainerProps {
  error?: boolean;
}

export const Container = styled.div<IContainerProps>`
  display: flex;
  flex-direction: column;
  gap: 4px;

  input,
  label,
  span {
    outline-color: ${({ error, theme }) => (error ? theme.red : 'auto')};
    color: ${({ error, theme }) => (error ? theme.red : 'auto')};
  }
`;

export const Input = styled.input`
  padding: 8px;

  font-size: 1.8rem;
  border-radius: 4px;
  border: none;

  outline-color: ${({ theme }) => theme.tertiary};
`;

export const Label = styled.label`
  font-size: 2rem;

  font-weight: 500;
`;

export const HelperText = styled.span`
  font-size: 1.25rem;

  font-weight: 400;
`;
