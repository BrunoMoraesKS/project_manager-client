import React from 'react';
import * as S from './styles';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslation } from 'react-i18next';
import Modal from '../Modal';
import Button from '../Button';

interface IFilterTasksModalProps {
  taskFilter: 'default' | 'done' | 'expired' | 'pending';
  setTaskFilter: (filter: 'default' | 'done' | 'expired' | 'pending') => void;
  setShowFilterTasksModal: (value: boolean) => void;
}

const FilterTasksModal = ({
  taskFilter,
  setTaskFilter,
  setShowFilterTasksModal,
}: IFilterTasksModalProps) => {
  const { t } = useTranslation();

  return (
    <Modal>
      <S.FilterTasksModalContainer>
        <S.FilterTasksTitleContainer>
          <S.FilterTasksTitle>
            {t('filterTasksModal.filterTasks')}
          </S.FilterTasksTitle>
          <S.FilterTasksCloseButton
            onClick={() => {
              setShowFilterTasksModal(false);
            }}
          >
            <FontAwesomeIcon icon={faXmark} />
          </S.FilterTasksCloseButton>
        </S.FilterTasksTitleContainer>

        <S.FilterTasksContent>
          <Button
            variant={taskFilter === 'default' ? 'primary' : 'secondary'}
            fullWidth
            onClick={() => {
              setTaskFilter('default');
              setShowFilterTasksModal(false);
            }}
          >
            {t('filterTasksModal.default')}
          </Button>
          <Button
            variant={taskFilter === 'done' ? 'primary' : 'secondary'}
            fullWidth
            onClick={() => {
              setTaskFilter('done');
              setShowFilterTasksModal(false);
            }}
          >
            {t('filterTasksModal.done')}
          </Button>
          <Button
            variant={taskFilter === 'expired' ? 'primary' : 'secondary'}
            fullWidth
            onClick={() => {
              setTaskFilter('expired');
              setShowFilterTasksModal(false);
            }}
          >
            {t('filterTasksModal.expired')}
          </Button>
          <Button
            variant={taskFilter === 'pending' ? 'primary' : 'secondary'}
            fullWidth
            onClick={() => {
              setTaskFilter('pending');
              setShowFilterTasksModal(false);
            }}
          >
            {t('filterTasksModal.pending')}
          </Button>
        </S.FilterTasksContent>
      </S.FilterTasksModalContainer>
    </Modal>
  );
};

export default FilterTasksModal;
