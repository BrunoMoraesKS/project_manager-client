import styled from 'styled-components';

export const SoftdeleteProjectModalContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 40px;

  width: 80vw;
  max-width: 400px;
`;

export const SoftdeleteProjectTitle = styled.h5``;

export const SoftdeleteProjectTitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const SoftdeleteProjectCloseButton = styled.button`
  background: none;
  border: none;

  font-size: 2.3rem;

  cursor: pointer;
`;

export const SoftdeleteProjectButtonsContainer = styled.div`
  display: flex;
  align-self: flex-end;
  gap: 8px;

  width: 80%;
`;
