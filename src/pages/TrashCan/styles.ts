import styled from 'styled-components';
import { breakpoints } from '../../global/styles/globals';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;

  width: 100%;

  padding: 16px 32px;
`;

export const Title = styled.h2`
  color: ${({ theme }) => theme.heading};
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
  flex-wrap: wrap;

  width: 100%;

  @media (min-width: ${breakpoints.lg}) {
    justify-content: flex-start;
  }
`;

export const Header = styled.header`
  display: flex;
  flex-direction: column;
  gap: 16px;

  width: 100%;
`;

export const HeaderTitleContainer = styled.div`
  display: flex;

  align-items: center;
  justify-content: space-between;
`;

export const actionAllButton = styled.button`
  border: none;
  background: none;

  font-size: 2rem;

  color: ${({ theme }) => theme.paragraph};

  text-decoration: underline;
`;

export const actionAllButtonsContainer = styled.div`
  display: flex;
  gap: 24px;
`;
