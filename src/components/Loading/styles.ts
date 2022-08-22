import styled, { keyframes } from 'styled-components';

const drawLine = keyframes`
    0%, 100% { width: 0px }
    45%, 55% { width: 200px }
  `;

const pencilRot = keyframes`
    0%, 45% {
      bottom: -6px;
      left: calc(100% + 14px);
      transform: rotate(25deg);
    }
    55%,
    100% {
      bottom: -12px;
      left: calc(100% + 16px);
      transform: rotate(220deg);
    }
  `;

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;

  top: 0;
  left: 0;

  width: 100vw;
  height: 100vh;

  background-color: ${({ theme }) => `${theme.background}99`};
`;

export const Loader = styled.span`
  position: relative;
  height: 200px;
  width: 200px;
  border-bottom: ${({ theme }) => `3px solid ${theme.grey}`};
  box-sizing: border-box;
  animation: ${drawLine} 4s linear infinite;

  &:before {
    content: '';
    position: absolute;
    left: calc(100% + 14px);
    bottom: -6px;
    width: 14px;
    height: 100px;
    border-radius: 20px 20px 50px 50px;
    background-repeat: no-repeat;
    background-image: linear-gradient(#dedede 6px, transparent 0),
      linear-gradient(45deg, rgba(0, 0, 0, 0.02) 49%, white 51%),
      linear-gradient(315deg, rgba(0, 0, 0, 0.02) 49%, white 51%),
      linear-gradient(
        to bottom,
        #ffffff 10%,
        #00a8e8 10%,
        #00a8e8 90%,
        #ffffff 90%
      );
    background-size: 3px 3px, 8px 8px, 8px 8px, 16px 88px;
    background-position: center bottom, left 88px, right 88px, left top;
    transform: rotate(25deg);
    animation: ${pencilRot} 4s linear infinite;
  }
`;
