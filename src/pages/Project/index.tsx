/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import Loading from '../../components/Loading';
import NewTaskModal from '../../components/NewTaskModal';
import ProjectHeader from '../../components/ProjectHeader';
import Task from '../../components/Task';
import useProject from '../../services/hooks/projects/useProject';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as S from './styles';
import { dateCompare } from '../../utils/dateCompare';
import { ITask } from '../../interfaces/project';
import FilterTasksModal from '../../components/FilterTasksModal';

const Project = () => {
  const [showNewTaskModal, setShowNewTaskModal] = useState(false);
  const [showFilterTasksModal, setShowFilterTasksModal] = useState(false);
  const [taskFilter, setTaskFilter] = useState<
    'default' | 'done' | 'expired' | 'pending'
  >('expired');

  useEffect(() => {
    setTaskFilter('default');
  }, []);

  const { id } = useParams();
  const { t } = useTranslation();

  const projectId = id!.toString();

  const { data: project, refetch, isLoading } = useProject({ projectId });

  useEffect(() => {
    refetch();
  }, [id]);

  const handleNewTask = () => {
    setShowNewTaskModal(true);
  };

  const filterTasksBy = (
    filter: 'default' | 'done' | 'expired' | 'pending'
  ) => {
    // default filter is by order of priority (done, expired, pending)

    if (filter === 'default') {
      return project?.tasks.sort((a, b) => {
        if (a.isCompleted && !b.isCompleted) {
          return -1;
        } else if (!a.isCompleted && b.isCompleted) {
          return 1;
        } else {
          return 0;
        }
      });
    }

    if (filter === 'done') {
      return project?.tasks.filter((task) => task.isCompleted);
    }

    if (filter === 'expired') {
      return project?.tasks.filter(
        (task) => dateCompare(task.shouldBeCompletedAt) === 0
      );
    }

    if (filter === 'pending') {
      return project?.tasks.filter(
        (task) =>
          dateCompare(task.shouldBeCompletedAt) !== 0 && !task.isCompleted
      );
    }
  };

  return (
    <>
      {isLoading && <Loading />}

      {!isLoading && (
        <S.Container>
          {!id && <h1>id not found</h1>}

          {project && <ProjectHeader id={project.id} name={project.name} />}

          <S.FilterButton
            onClick={() => {
              setShowFilterTasksModal(true);
            }}
          >
            <FontAwesomeIcon icon={faFilter} />
          </S.FilterButton>

          <S.TasksContainer>
            {filterTasksBy(taskFilter)
              ?.sort((a, b) => {
                if (a.shouldBeCompletedAt > b.shouldBeCompletedAt) {
                  return 1;
                } else if (a.shouldBeCompletedAt < b.shouldBeCompletedAt) {
                  return -1;
                } else {
                  return 0;
                }
              })

              .map((task: ITask) => {
                return (
                  <Task
                    key={task.id}
                    id={task.id}
                    title={task.name}
                    user={task.user}
                    shouldBeCompletedAt={task.shouldBeCompletedAt}
                    isCompleted={task.isCompleted}
                  />
                );
              })}
          </S.TasksContainer>

          <S.NewTaskButton
            onClick={() => {
              handleNewTask();
            }}
          >
            + {t('newTaskModal.addTask')}
          </S.NewTaskButton>

          {showNewTaskModal && (
            <NewTaskModal
              projectId={id!}
              setShowNewTaskModal={setShowNewTaskModal}
            />
          )}

          {showFilterTasksModal && (
            <FilterTasksModal
              taskFilter={taskFilter}
              setTaskFilter={setTaskFilter}
              setShowFilterTasksModal={setShowFilterTasksModal}
            />
          )}
        </S.Container>
      )}
    </>
  );
};

export default Project;
