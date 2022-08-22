import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from '../../context/theme';
import { dateFormat } from '../../utils/dateFormat';
import * as S from './styles';

interface ITaskProps {
  title: string;
  user: string;
  shouldBeCompletedAt: string;
  isCompleted: boolean;
}

const Task = ({
  title,
  user,
  shouldBeCompletedAt,
  isCompleted,
}: ITaskProps) => {
  const { selectedTheme } = useContext(ThemeContext);
  const { t } = useTranslation();

  console.log(selectedTheme);

  const status = () => {
    const today = new Date();
    const shouldBeCompletedAtDate = new Date(shouldBeCompletedAt);

    if (shouldBeCompletedAtDate.getDate() < today.getDate()) {
      return 0;
    } else if (shouldBeCompletedAtDate.getDate() === today.getDate()) {
      return 1;
    } else if (shouldBeCompletedAtDate.getDate() === today.getDate() + 1) {
      return 2;
    } else {
      return 3;
    }
  };

  const dateCode = {
    0: dateFormat(new Date(shouldBeCompletedAt).toDateString()),
    1: t('shouldBeCompletedAt.today'),
    2: t('shouldBeCompletedAt.tomorrow'),
    3: dateFormat(new Date(shouldBeCompletedAt).toDateString()),
  };

  const checkboxColor = {
    0: '#FF0000',
    1: '#FFA500',
    2: selectedTheme === 'light' ? '#343A40' : '#E9ECEF',
    3: selectedTheme === 'light' ? '#343A40' : '#E9ECEF',
  };

  return (
    <S.Container isCompleted={isCompleted} status={checkboxColor[status()]}>
      <S.CheckBox>
        <S.Check type="checkbox" id={title} defaultChecked={isCompleted} />
        <S.Label htmlFor={title}>
          <svg width="50" height="50" viewBox="20 25 100 100">
            <rect
              x="25"
              y="25"
              width="45"
              height="45"
              stroke={
                isCompleted
                  ? selectedTheme === 'light'
                    ? '#dedede'
                    : '#6c757d'
                  : checkboxColor[status()]
              }
              fill="none"
            />
            <g transform="translate(0,-952.36218)">
              <S.Path1
                d="m 13,983 c 33,6 40,26 55,48 "
                stroke={selectedTheme === 'light' ? '#343A40' : '#E9ECEF'}
                stroke-width="3"
                fill="none"
              />
              <S.Path1
                d="M 75,970 C 51,981 34,1014 25,1031 "
                stroke={selectedTheme === 'light' ? '#343A40' : '#E9ECEF'}
                strokeWidth="3"
                fill="none"
              />
            </g>
          </svg>
        </S.Label>
      </S.CheckBox>

      <S.Span>{`${title} @${user} ${dateCode[status()]}`}</S.Span>
    </S.Container>
  );
};

export default Task;
