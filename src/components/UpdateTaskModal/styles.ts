import styled from 'styled-components';

export const UpdateTaskModalContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 40px;

  width: 80vw;
  max-width: 400px;
`;

export const UpdateTaskTitle = styled.h5``;

export const UpdateTaskTitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const UpdateTaskCloseButton = styled.button`
  background: none;
  border: none;

  font-size: 2.3rem;

  cursor: pointer;
`;

export const UpdateTaskContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const UpdateTaskButtonsContainer = styled.div`
  display: flex;
  align-self: flex-end;
  gap: 8px;

  width: 80%;
`;
