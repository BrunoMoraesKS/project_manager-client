import styled from 'styled-components';

interface IContainerProps {
  width: number;
}

export const Container = styled.div<IContainerProps>`
  display: flex;
  flex-direction: ${({ width }) => (width > 768 ? 'row' : 'column')};

  margin-top: ${({ width }) => (width > 768 ? 'auto' : '56px')};
`;

export const NotFound = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;

  font-size: 3rem;
`;

export const ConfigButton = styled.button`
  position: fixed;
  right: 16px;
  bottom: 16px;

  font-size: 4rem;

  border: none;
  background: none;

  cursor: pointer;

  color: ${({ theme }) => theme.heading};

  transition: 0.1s all;
  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;
