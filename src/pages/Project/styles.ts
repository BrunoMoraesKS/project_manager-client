import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  font-size: 5rem;

  width: 100%;

  padding: 16px 32px;
`;

export const TasksContainer = styled.div``;

export const FilterButton = styled.button`
  display: flex;
  align-self: flex-end;

  font-size: 3rem;

  border: none;
  background: none;

  cursor: pointer;

  transition: 0.1s all;
  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

export const FilterMenu = styled.button`
  position: absolute;
  display: flex;
  align-self: flex-end;

  border: 1px solid red;
`;

export const NewProjectButton = styled.button`
  display: flex;
  align-self: flex-start;

  background: none;
  border: none;
  text-decoration: underline;

  margin-top: 24px;

  font-size: 1.6rem;

  cursor: pointer;
`;
