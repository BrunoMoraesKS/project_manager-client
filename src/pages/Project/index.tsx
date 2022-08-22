/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import Loading from '../../components/Loading';
import MiniLoading from '../../components/MiniLoading';
import NewTaskModal from '../../components/NewTaskModal';
import Task from '../../components/Task';
import useProject from '../../services/hooks/projects/useProject';

import * as S from './styles';

const Project = () => {
  const [showNewTaskModal, setShowNewTaskModal] = useState(false);

  const { id } = useParams();
  const { t } = useTranslation();

  const projectId = id!.toString();

  const {
    data: project,
    refetch,
    isFetching,
    isLoading,
  } = useProject({ projectId });

  useEffect(() => {
    refetch();
  }, [id]);

  const handleNewTask = () => {
    setShowNewTaskModal(true);
  };

  return (
    <>
      {isLoading && <Loading />}

      {!isFetching && (
        <S.Container>
          {!id && <h1>id not found</h1>}

          {project && <h1>{project.name}</h1>}

          <S.TasksContainer>
            {isFetching && <MiniLoading />}

            {project?.tasks.map((task) => {
              return (
                <Task
                  key={task.id}
                  title={task.name}
                  user={task.user}
                  shouldBeCompletedAt={task.shouldBeCompletedAt}
                  isCompleted={task.isCompleted}
                />
              );
            })}
          </S.TasksContainer>

          <S.NewProjectButton
            onClick={() => {
              handleNewTask();
            }}
          >
            + {t('newTaskModal.addTask')}
          </S.NewProjectButton>

          {showNewTaskModal && (
            <NewTaskModal
              projectId={id!}
              setShowNewTaskModal={setShowNewTaskModal}
            />
          )}
        </S.Container>
      )}
    </>
  );
};

export default Project;
