import styled from 'styled-components';

export const Container = styled.header`
  display: flex;
  flex-direction: column;
  gap: 16px;

  width: 100%;
`;

export const Title = styled.h2``;

export const TitleContainer = styled.div`
  display: flex;

  align-items: center;
  justify-content: space-between;
`;

export const ButtonsContainer = styled.div`
  display: flex;

  gap: 24px;
`;

export const ProjectButton = styled.button`
  border: none;
  background: none;

  font-size: 2rem;

  cursor: pointer;

  transition: 0.1s all;
  &:hover {
    color: ${({ theme }) => theme.primary};
  }

  color: ${({ theme }) => theme.heading};
`;
