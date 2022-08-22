import React from 'react';
import * as S from './styles';

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  fullWidth?: boolean;
}

const Button = ({
  children,
  variant = 'primary',
  fullWidth,
  ...props
}: IButtonProps) => {
  return (
    <S.Container variant={variant} fullWidth={fullWidth} {...props}>
      {children}
    </S.Container>
  );
};

export default Button;
