import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation, useQueryClient } from 'react-query';
import { restoreOne } from '../../services/projects/restoreOne';
import Button from '../Button';
import DeleteProjectModal from '../DeleteProjectModal';
import * as S from './styles';

interface IProjectCardProps {
  name: string;
  deletedAt: Date;
  id: string;
}

interface IData {
  projectId: string;
}

const ProjectCard = ({ name, deletedAt, id }: IProjectCardProps) => {
  const [showDeleteProjectModal, setShowDeleteProjectModal] = useState(false);
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const restoreOneMutation = useMutation(async ({ projectId }: IData) => {
    const { data } = await restoreOne({
      projectId,
    });

    return data;
  });

  const handleRestoreOne = async (projectId: string) => {
    await restoreOneMutation.mutateAsync(
      { projectId },
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

  const deletedAtDate = new Date(deletedAt);

  return (
    <S.Container>
      <S.Name> {name}</S.Name>
      <S.DeletedAt>
        {t('trashCan.deletedAt')}: {deletedAtDate.toLocaleDateString()}
      </S.DeletedAt>

      <S.ButtonsContainer>
        <Button
          disabled={restoreOneMutation.isLoading}
          fullWidth
          onClick={() => {
            handleRestoreOne(id);
            console.log('restore');
          }}
        >
          {t('trashCan.restore')}
        </Button>
        <Button
          disabled={restoreOneMutation.isLoading}
          fullWidth
          onClick={() => {
            setShowDeleteProjectModal(true);
            console.log('delete');
          }}
          variant="secondary"
        >
          {t('trashCan.delete')}
        </Button>
      </S.ButtonsContainer>

      {showDeleteProjectModal && (
        <DeleteProjectModal
          projectId={id}
          setShowDeleteProjectModal={setShowDeleteProjectModal}
        />
      )}
    </S.Container>
  );
};

export default ProjectCard;
