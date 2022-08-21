import React from 'react';
import * as S from './styles';

interface IModalProps {
  children: React.ReactNode;
}

const Modal = ({ children }: IModalProps) => {
  return (
    <S.Container>
      <S.InnerContainer>{children}</S.InnerContainer>
    </S.Container>
  );
};

export default Modal;
