import styled from 'styled-components';

export const MenuConfigModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;

  width: 80vw;
  max-width: 400px;
`;

export const MenuConfigTitle = styled.h5``;

export const MenuConfigTitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const MenuConfigCloseButton = styled.button`
  background: none;
  border: none;

  font-size: 2.3rem;

  cursor: pointer;
`;

export const MenuConfigContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const MenuConfigButton = styled.div``;
