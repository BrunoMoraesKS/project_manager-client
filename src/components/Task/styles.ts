import styled from 'styled-components';

interface IContainerProps {
  status: string;
  isCompleted: boolean;
}

export const Container = styled.div<IContainerProps>`
  display: flex;
  align-items: center;
  gap: 8px;

  text-decoration: ${({ isCompleted }) =>
    isCompleted ? 'line-through' : 'none'};
  text-decoration-color: ${({ theme }) => theme.oposite};
  span {
    color: ${({ status, isCompleted, theme }) =>
      isCompleted ? theme.grey : status};
  }
`;

export const Span = styled.span`
  font-weight: 400;
`;

export const CheckBox = styled.div`
  position: relative;
  display: block;
  width: 32px;
  height: 32px;
  overflow: hidden;
`;

export const Check = styled.input`
  width: 32px;
  height: 32px;
  position: absolute;
  opacity: 0;

  &:checked + label svg g path {
    stroke-dashoffset: 0;
  }
`;

export const Label = styled.label`
  display: block;
`;

export const Path1 = styled.path`
  stroke-dasharray: 400;
  stroke-dashoffset: 400;
  transition: 0.5s all;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  gap: 12px;

  margin-left: 12px;
`;

export const TaskButton = styled.button`
  border: none;
  background: none;

  font-size: 1.7rem;

  cursor: pointer;

  transition: 0.1s all;
  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;
