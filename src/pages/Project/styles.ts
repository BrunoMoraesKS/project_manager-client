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
