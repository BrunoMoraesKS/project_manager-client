import React from 'react';
import * as S from './styles';

interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  helpertext?: string;
  error?: boolean;
}

const Input = ({ label, helpertext, error, ...props }: IInputProps) => {
  return (
    <S.Container error={error}>
      <S.Label htmlFor={label}>{label}</S.Label>
      <S.Input type="text" id={label} {...props} />

      {helpertext && <S.HelperText>{helpertext}</S.HelperText>}
    </S.Container>
  );
};

export default Input;
