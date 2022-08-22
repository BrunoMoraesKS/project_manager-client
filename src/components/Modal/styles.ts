import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  position: fixed;
  top: 0;
  left: 0;

  width: 100vw;
  height: 100vh;

  background-color: ${({ theme }) => `${theme.background}50`};

  z-index: 999;
`;

export const InnerContainer = styled.div`
  padding: 16px;

  z-index: 1000;

  border-radius: 4px;

  -webkit-box-shadow: ${({ theme }) => `3px 3px 9px 4px ${theme.oposite}50`};
  box-shadow: ${({ theme }) => `3px 3px 9px 4px ${theme.oposite}50`};

  background-color: ${({ theme }) => theme.grey};
`;

export const Test = styled.div`
  width: 300px;
  height: 250px;
`;
