import styled from 'styled-components';

export const NewTaskModalContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 40px;

  width: 80vw;
  max-width: 400px;
`;

export const NewTaskTitle = styled.h5``;

export const NewTaskTitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const NewTaskCloseButton = styled.button`
  background: none;
  border: none;

  font-size: 2.3rem;
`;

export const NewTaskContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const NewTaskButtonsContainer = styled.div`
  display: flex;
  align-self: flex-end;
  gap: 8px;

  width: 80%;
`;
