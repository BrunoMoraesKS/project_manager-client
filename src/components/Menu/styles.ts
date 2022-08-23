import styled, { keyframes } from 'styled-components';

interface IContainerProps {
  isMenuOpen: boolean;
  width: number;
}

const menuAnimation = keyframes`
    from {
        transform: translateX(-100%);
    }

    to {
        transform: translateX(0);
    }
`;

export const Container = styled.nav<IContainerProps>`
  display: ${({ isMenuOpen }) => (isMenuOpen ? 'flex' : 'none')};
  flex-direction: column;
  position: ${({ width }) => (width > 768 ? 'auto' : 'absolute')};

  padding-top: ${({ width }) => (width > 768 ? '24px' : 'auto')};

  top: 0;
  left: 0;

  width: 80%;
  max-width: 400px;
  min-height: 100vh;

  background-color: ${({ theme }) => theme.menu};

  animation: ${menuAnimation} 0.3s ease-in-out;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;

  padding: 0 16px;
`;

export const CloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: flex-end;

  width: 50px;
  height: 50px;

  font-size: 3rem;
  color: ${({ theme }) => theme.white};

  background: none;
  border: none;

  cursor: pointer;
`;

export const MenuButton = styled.button`
  position: absolute;

  top: 0;
  left: 0;

  width: 50px;
  height: 50px;

  font-size: 3rem;
  color: ${({ theme }) => theme.heading};

  background: none;
  border: none;
`;

export const Title = styled.h2`
  color: ${({ theme }) => theme.white};
`;

export const Project = styled.h4`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  color: ${({ theme }) => theme.white};

  cursor: pointer;
`;

export const NewProjectButton = styled.button`
  display: flex;
  align-self: flex-start;

  background: none;
  border: none;
  text-decoration: underline;
  color: ${({ theme }) => `${theme.white}99`};

  margin-bottom: 24px;

  font-size: 1.6rem;

  cursor: pointer;
`;
