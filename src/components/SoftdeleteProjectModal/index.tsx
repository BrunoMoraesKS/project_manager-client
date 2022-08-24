import React from 'react';
import * as S from './styles';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslation } from 'react-i18next';
import Modal from '../Modal';
import Button from '../Button';
import { softdelete } from '../../services/projects/softdelete';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

interface ISoftdeleteProjectModalProps {
  setShowSoftdeleteProjectModal: (value: boolean) => void;
  projectId: string;
}

interface IData {
  projectId: string;
}

const SoftdeleteProjectModal = ({
  setShowSoftdeleteProjectModal,
  projectId,
}: ISoftdeleteProjectModalProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const softdeleteMutation = useMutation(async ({ projectId }: IData) => {
    const { data } = await softdelete({
      projectId,
    });

    return data;
  });

  const handleSubmit = async () => {
    await softdeleteMutation.mutateAsync(
      { projectId },
      {
        onSuccess: () => {
          toast.success(t('common.success'));

          queryClient.invalidateQueries('tasks');
          queryClient.invalidateQueries('projects');

          navigate('/');
        },

        onError: () => {
          toast.error(t('common.error'));
        },
      }
    );

    setShowSoftdeleteProjectModal(false);
  };

  return (
    <Modal>
      <S.SoftdeleteProjectModalContainer>
        <S.SoftdeleteProjectTitleContainer>
          <S.SoftdeleteProjectTitle>
            {t('softdeleteProjectModal.softdeleteProject')}
          </S.SoftdeleteProjectTitle>
          <S.SoftdeleteProjectCloseButton
            onClick={() => {
              setShowSoftdeleteProjectModal(false);
            }}
          >
            <FontAwesomeIcon icon={faXmark} />
          </S.SoftdeleteProjectCloseButton>
        </S.SoftdeleteProjectTitleContainer>

        <S.SoftdeleteProjectButtonsContainer>
          <Button
            disabled={softdeleteMutation.isLoading}
            onClick={() => {
              setShowSoftdeleteProjectModal(false);
            }}
            fullWidth
            variant="secondary"
          >
            {t('common.cancel').toUpperCase()}
          </Button>
          <Button
            disabled={softdeleteMutation.isLoading}
            onClick={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            fullWidth
          >
            {t('common.move').toUpperCase()}
          </Button>
        </S.SoftdeleteProjectButtonsContainer>
      </S.SoftdeleteProjectModalContainer>
    </Modal>
  );
};

export default SoftdeleteProjectModal;
