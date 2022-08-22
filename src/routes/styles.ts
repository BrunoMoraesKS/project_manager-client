import styled from 'styled-components';

interface IContainerProps {
  width: number;
}

export const Container = styled.div<IContainerProps>`
  display: flex;
  flex-direction: ${({ width }) => (width > 768 ? 'row' : 'column')};

  margin-top: ${({ width }) => (width > 768 ? 'auto' : '56px')};
`;
