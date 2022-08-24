import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useMutation, useQueryClient } from 'react-query';
import DeleteAllInactiveProjectsModal from '../../components/DeleteAllInactiveProjectsModal';
import Divider from '../../components/Divider';
import ProjectCard from '../../components/ProjectCard';
import useProjectsSoftdeleted from '../../services/hooks/projects/useProjectsSoftdeleted';
import { restoreAll } from '../../services/projects/restoreAll';

import * as S from './styles';

const TrashCan = () => {
  const [
    showDeleteAllInactiveProjectsModal,
    setShowDeleteAllInactiveProjectsModal,
  ] = useState(false);

  const { t } = useTranslation();
  const { data: projects } = useProjectsSoftdeleted();
  const queryClient = useQueryClient();

  const restoreAllMutation = useMutation(async () => {
    const { data } = await restoreAll();

    return data;
  });

  const handleRestoreAll = async () => {
    await restoreAllMutation.mutateAsync(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      {} as any,

      {
        onSuccess: () => {
          toast.success(t('common.success'));

          queryClient.invalidateQueries('projects');
          queryClient.invalidateQueries('softdeleted-projects');
        },

        onError: () => {
          toast.error(t('common.error'));
        },
      }
    );
  };

  return (
    <S.Container>
      <S.Header>
        <S.HeaderTitleContainer>
          <S.Title>{t('trashCan.title')}</S.Title>

          <S.actionAllButtonsContainer>
            <S.actionAllButton
              onClick={() => {
                handleRestoreAll();
              }}
            >
              {t('trashCan.restoreAll')}
            </S.actionAllButton>
            <S.actionAllButton
              onClick={() => {
                setShowDeleteAllInactiveProjectsModal(true);
              }}
            >
              {t('trashCan.deleteAll')}
            </S.actionAllButton>
          </S.actionAllButtonsContainer>
        </S.HeaderTitleContainer>

        <Divider />
      </S.Header>

      <S.Content>
        {projects?.map((project) => {
          const { name, updatedAt, id } = project;
          return (
            <ProjectCard key={id} name={name} deletedAt={updatedAt} id={id} />
          );
        })}
      </S.Content>

      {showDeleteAllInactiveProjectsModal && (
        <DeleteAllInactiveProjectsModal
          setShowDeleteAllInactiveProjectsModal={
            setShowDeleteAllInactiveProjectsModal
          }
        />
      )}
    </S.Container>
  );
};

export default TrashCan;
