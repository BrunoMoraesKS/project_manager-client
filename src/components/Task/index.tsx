import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from '../../context/theme';
import { complete } from '../../services/tasks/complete';
import { uncomplete } from '../../services/tasks/uncomplete';
import { faTrash, faPencil } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as S from './styles';
import UpdateTaskModal from '../UpdateTaskModal';
import DeleteTaskModal from '../DeleteTaskModal';
import { dateCompare } from '../../utils/dateCompare';

interface ITaskProps {
  id: string;
  title: string;
  user: string;
  shouldBeCompletedAt: Date;
  isCompleted: boolean;
}

const Task = ({
  id,
  title,
  user,
  shouldBeCompletedAt,
  isCompleted,
}: ITaskProps) => {
  const [isTaskCompleted, setIsTaskCompleted] = useState(isCompleted);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const { selectedTheme } = useContext(ThemeContext);
  const { t } = useTranslation();

  const shouldBeCompletedAtDate = new Date(shouldBeCompletedAt);
  shouldBeCompletedAtDate.setDate(shouldBeCompletedAtDate.getDate() + 1);

  const dateCode = {
    0: shouldBeCompletedAtDate.toLocaleDateString(),
    1: t('shouldBeCompletedAt.today'),
    2: t('shouldBeCompletedAt.tomorrow'),
    3: shouldBeCompletedAtDate.toLocaleDateString(),
  };

  const checkboxColor = {
    0: '#FF0000',
    1: '#FFA500',
    2: selectedTheme === 'light' ? '#343A40' : '#E9ECEF',
    3: selectedTheme === 'light' ? '#343A40' : '#E9ECEF',
  };

  const completeTask = async () => {
    const { data } = await complete({ taskId: id });

    return data;
  };

  const uncompleteTask = async () => {
    const { data } = await uncomplete({ taskId: id });

    return data;
  };

  return (
    <S.Container
      isCompleted={isTaskCompleted}
      status={checkboxColor[dateCompare(shouldBeCompletedAt)]}
    >
      <S.CheckBox>
        <S.Check
          type="checkbox"
          id={title}
          defaultChecked={isTaskCompleted}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.checked) {
              setIsTaskCompleted(true);
              completeTask();
            } else {
              setIsTaskCompleted(false);
              uncompleteTask();
            }
          }}
        />
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
                  : checkboxColor[dateCompare(shouldBeCompletedAt)]
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

      <S.Span>{`${title} @${user} ${
        dateCode[dateCompare(shouldBeCompletedAt)]
      }`}</S.Span>

      <S.ButtonsContainer>
        <S.TaskButton
          onClick={() => {
            setShowUpdateModal(true);
          }}
        >
          <FontAwesomeIcon icon={faPencil} />
        </S.TaskButton>
        <S.TaskButton
          onClick={() => {
            setShowDeleteModal(true);
          }}
        >
          <FontAwesomeIcon icon={faTrash} />
        </S.TaskButton>
      </S.ButtonsContainer>

      {showUpdateModal && (
        <UpdateTaskModal
          id={id}
          name={title}
          user={user}
          shouldBeCompletedAt={shouldBeCompletedAt}
          setShowUpdateTaskModal={setShowUpdateModal}
        />
      )}

      {showDeleteModal && (
        <DeleteTaskModal
          taskId={id}
          setShowDeleteTaskModal={setShowDeleteModal}
        />
      )}
    </S.Container>
  );
};

export default Task;
