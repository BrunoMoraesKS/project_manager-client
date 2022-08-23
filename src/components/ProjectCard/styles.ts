import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;

  padding: 8px;
  width: 300px;

  border: ${({ theme }) => `1px solid ${theme.oposite}`};
  border-radius: 4px;
`;

export const Name = styled.h4``;

export const DeletedAt = styled.span``;

export const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;

  gap: 8px;
`;
