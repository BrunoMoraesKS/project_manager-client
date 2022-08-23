import React from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation, useQueryClient } from 'react-query';
import Divider from '../../components/Divider';
import ProjectCard from '../../components/ProjectCard';
import useProjectsSoftdeleted from '../../services/hooks/projects/useProjectsSoftdeleted';
import { deleteAllUnactive } from '../../services/projects/deleteAllUnactive';
import { restoreAll } from '../../services/projects/restoreAll';

import * as S from './styles';

const TrashCan = () => {
  const { t } = useTranslation();
  const { data: projects, isFetching } = useProjectsSoftdeleted();
  const queryClient = useQueryClient();

  const restoreAllMutation = useMutation(async () => {
    const { data } = await restoreAll();

    return data;
  });

  const deleteAllUnactiveMutation = useMutation(async () => {
    const { data } = await deleteAllUnactive();

    return data;
  });

  const handleRestoreAll = async () => {
    await restoreAllMutation.mutateAsync(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      {} as any,

      {
        onSuccess: () => {
          queryClient.invalidateQueries('projects');
          queryClient.invalidateQueries('softdeleted-projects');
        },

        onError: () => {
          console.log('error');
        },
      }
    );
  };
  const handleDeleteAllUnactive = async () => {
    await deleteAllUnactiveMutation.mutateAsync(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      {} as any,

      {
        onSuccess: () => {
          queryClient.invalidateQueries('projects');
          queryClient.invalidateQueries('softdeleted-projects');
        },

        onError: () => {
          console.log('error');
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
                console.log('restored all');
              }}
            >
              {t('trashCan.restoreAll')}
            </S.actionAllButton>
            <S.actionAllButton
              onClick={() => {
                handleDeleteAllUnactive();
                console.log('deleted all');
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
    </S.Container>
  );
};

export default TrashCan;
