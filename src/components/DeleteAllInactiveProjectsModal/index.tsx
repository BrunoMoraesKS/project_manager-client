import React from 'react';
import * as S from './styles';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslation } from 'react-i18next';
import Modal from '../Modal';
import Button from '../Button';
import { useMutation, useQueryClient } from 'react-query';
import { deleteAllInactive } from '../../services/projects/deleteAllInactive';

interface IDeleteAllInactiveProjectsModalProps {
  setShowDeleteAllInactiveProjectsModal: (value: boolean) => void;
}

const DeleteAllInactiveProjectsModal = ({
  setShowDeleteAllInactiveProjectsModal,
}: IDeleteAllInactiveProjectsModalProps) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const deleteAllInactiveProjectsMutation = useMutation(async () => {
    const { data } = await deleteAllInactive();

    return data;
  });

  const handleDeleteAllInactive = async () => {
    await deleteAllInactiveProjectsMutation.mutateAsync(
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

    setShowDeleteAllInactiveProjectsModal(false);
  };

  return (
    <Modal>
      <S.DeleteAllInactiveProjectsModalContainer>
        <S.DeleteAllInactiveProjectsTitleContainer>
          <S.DeleteAllInactiveProjectsTitle>
            {t('trashCan.areYouSure')}
          </S.DeleteAllInactiveProjectsTitle>
          <S.DeleteAllInactiveProjectsCloseButton
            onClick={() => {
              setShowDeleteAllInactiveProjectsModal(false);
            }}
          >
            <FontAwesomeIcon icon={faXmark} />
          </S.DeleteAllInactiveProjectsCloseButton>
        </S.DeleteAllInactiveProjectsTitleContainer>

        <S.DeleteAllInactiveProjectsButtonsContainer>
          <Button
            disabled={deleteAllInactiveProjectsMutation.isLoading}
            onClick={() => {
              setShowDeleteAllInactiveProjectsModal(false);
            }}
            fullWidth
            variant="secondary"
          >
            {t('common.cancel').toUpperCase()}
          </Button>
          <Button
            disabled={deleteAllInactiveProjectsMutation.isLoading}
            onClick={(e) => {
              e.preventDefault();
              handleDeleteAllInactive();
            }}
            fullWidth
          >
            {t('common.delete').toUpperCase()}
          </Button>
        </S.DeleteAllInactiveProjectsButtonsContainer>
      </S.DeleteAllInactiveProjectsModalContainer>
    </Modal>
  );
};

export default DeleteAllInactiveProjectsModal;
