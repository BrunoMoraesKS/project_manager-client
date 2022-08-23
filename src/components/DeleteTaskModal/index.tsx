import React from 'react';
import * as S from './styles';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslation } from 'react-i18next';
import Modal from '../Modal';
import Button from '../Button';
import { deleteTask } from '../../services/tasks/delete';
import { useMutation, useQueryClient } from 'react-query';

interface IDeleteTaskModalProps {
  setShowDeleteTaskModal: (value: boolean) => void;
  taskId: string;
}

interface IData {
  taskId: string;
}

const DeleteTaskModal = ({
  setShowDeleteTaskModal,
  taskId,
}: IDeleteTaskModalProps) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const deleteTaskMutation = useMutation(async ({ taskId }: IData) => {
    const { data } = await deleteTask({
      taskId,
    });

    return data;
  });

  const handleSubmit = async () => {
    await deleteTaskMutation.mutateAsync(
      { taskId },
      {
        onSuccess: () => {
          queryClient.invalidateQueries('tasks');
        },

        onError: () => {
          console.log('error');
        },
      }
    );

    setShowDeleteTaskModal(false);
  };

  return (
    <Modal>
      <S.DeleteTaskModalContainer>
        <S.DeleteTaskTitleContainer>
          <S.DeleteTaskTitle>
            {t('deleteTaskModal.areYouSure')}
          </S.DeleteTaskTitle>
          <S.DeleteTaskCloseButton
            onClick={() => {
              setShowDeleteTaskModal(false);
            }}
          >
            <FontAwesomeIcon icon={faXmark} />
          </S.DeleteTaskCloseButton>
        </S.DeleteTaskTitleContainer>

        <S.DeleteTaskButtonsContainer>
          <Button
            disabled={deleteTaskMutation.isLoading}
            onClick={() => {
              setShowDeleteTaskModal(false);
            }}
            fullWidth
            variant="secondary"
          >
            {t('common.cancel').toUpperCase()}
          </Button>
          <Button
            disabled={deleteTaskMutation.isLoading}
            onClick={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            fullWidth
          >
            {t('common.delete').toUpperCase()}
          </Button>
        </S.DeleteTaskButtonsContainer>
      </S.DeleteTaskModalContainer>
    </Modal>
  );
};

export default DeleteTaskModal;
