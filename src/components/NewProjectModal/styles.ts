import styled from 'styled-components';

export const NewProjectModalContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 40px;

  width: 80vw;
  max-width: 400px;
`;

export const NewProjectTitle = styled.h5``;

export const NewProjectTitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const NewProjectCloseButton = styled.button`
  background: none;
  border: none;

  font-size: 2.3rem;
`;

export const NewProjectContent = styled.div``;

export const NewProjectButtonsContainer = styled.div`
  display: flex;
  align-self: flex-end;
  gap: 8px;

  width: 80%;
`;
