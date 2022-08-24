import React from 'react';
import * as S from './styles';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslation } from 'react-i18next';
import Modal from '../Modal';
import Button from '../Button';
import { useMutation, useQueryClient } from 'react-query';
import { deleteProject } from '../../services/projects/delete';

interface IDeleteProjectModalProps {
  setShowDeleteProjectModal: (value: boolean) => void;
  projectId: string;
}

interface IData {
  projectId: string;
}

const DeleteProjectModal = ({
  setShowDeleteProjectModal,
  projectId,
}: IDeleteProjectModalProps) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const deleteProjectMutation = useMutation(async ({ projectId }: IData) => {
    const { data } = await deleteProject({ projectId });

    return data;
  });

  const handleDeleteProject = async () => {
    await deleteProjectMutation.mutateAsync(
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

    setShowDeleteProjectModal(false);
  };

  return (
    <Modal>
      <S.DeleteProjectModalContainer>
        <S.DeleteProjectTitleContainer>
          <S.DeleteProjectTitle>
            {t('trashCan.areYouSure')}
          </S.DeleteProjectTitle>
          <S.DeleteProjectCloseButton
            onClick={() => {
              setShowDeleteProjectModal(false);
            }}
          >
            <FontAwesomeIcon icon={faXmark} />
          </S.DeleteProjectCloseButton>
        </S.DeleteProjectTitleContainer>

        <S.DeleteProjectButtonsContainer>
          <Button
            disabled={deleteProjectMutation.isLoading}
            onClick={() => {
              setShowDeleteProjectModal(false);
            }}
            fullWidth
            variant="secondary"
          >
            {t('common.cancel').toUpperCase()}
          </Button>
          <Button
            disabled={deleteProjectMutation.isLoading}
            onClick={(e) => {
              e.preventDefault();
              handleDeleteProject();
            }}
            fullWidth
          >
            {t('common.delete').toUpperCase()}
          </Button>
        </S.DeleteProjectButtonsContainer>
      </S.DeleteProjectModalContainer>
    </Modal>
  );
};

export default DeleteProjectModal;
