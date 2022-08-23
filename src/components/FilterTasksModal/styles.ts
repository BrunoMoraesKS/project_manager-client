import styled from 'styled-components';

export const FilterTasksModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;

  width: 80vw;
  max-width: 400px;
`;

export const FilterTasksTitle = styled.h5``;

export const FilterTasksTitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const FilterTasksCloseButton = styled.button`
  background: none;
  border: none;

  font-size: 2.3rem;

  cursor: pointer;
`;

export const FilterTasksContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const FilterTasksButton = styled.div``;
