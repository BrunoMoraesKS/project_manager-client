import React from 'react';
import * as S from './styles';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AnyObject } from 'yup/lib/types';
import { useTranslation } from 'react-i18next';
import Modal from '../Modal';
import Input from '../Input';
import Button from '../Button';
import { create } from '../../services/tasks/create';
import { useMutation, useQueryClient } from 'react-query';

interface INewTaskModalProps {
  setShowNewTaskModal: (value: boolean) => void;
  projectId: string;
}

interface IData {
  projectId: string;
  name: string;
  user: string;
  shouldBeCompletedAt: Date;
}

const NewTaskModal = ({
  setShowNewTaskModal,
  projectId,
}: INewTaskModalProps) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const createTask = useMutation(
    async ({ projectId, name, user, shouldBeCompletedAt }: IData) => {
      const { data } = await create({
        projectId,
        name,
        user,
        shouldBeCompletedAt,
      });

      return data;
    }
  );

  const schema = yup.object().shape({
    name: yup.string().required(t('newTaskModal.nameIsRequired')),
    user: yup.string().required(t('newTaskModal.userIsRequired')),
    shouldBeCompletedAt: yup
      .string()
      .required(t('newTaskModal.shouldBeCompletedAtIsRequired')),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: AnyObject) => {
    const { name, user, shouldBeCompletedAt } = data;

    console.log(data);

    await createTask.mutateAsync(
      { projectId, name, user, shouldBeCompletedAt },
      {
        onSuccess: () => {
          queryClient.invalidateQueries('tasks');
        },

        onError: () => {
          console.log('error');
        },
      }
    );

    setShowNewTaskModal(false);
  };

  return (
    <Modal>
      <S.NewTaskModalContainer>
        <S.NewTaskTitleContainer>
          <S.NewTaskTitle>{t('newTaskModal.addTask')}</S.NewTaskTitle>
          <S.NewTaskCloseButton
            onClick={() => {
              setShowNewTaskModal(false);
            }}
          >
            <FontAwesomeIcon icon={faXmark} />
          </S.NewTaskCloseButton>
        </S.NewTaskTitleContainer>

        <S.NewTaskContent>
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label={t('newTaskModal.name')}
                error={!!errors.name}
                helpertext={errors.name?.message?.toString()}
                onChange={onChange}
                value={value}
                onBlur={onBlur}
              />
            )}
          />
          <Controller
            control={control}
            name="user"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label={t('newTaskModal.user')}
                error={!!errors.user}
                helpertext={errors.user?.message?.toString()}
                onChange={onChange}
                value={value}
                onBlur={onBlur}
              />
            )}
          />
          <Controller
            control={control}
            name="shouldBeCompletedAt"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                type="date"
                label={t('newTaskModal.shouldBeCompletedAt')}
                error={!!errors.shouldBeCompletedAt}
                helpertext={errors.shouldBeCompletedAt?.message?.toString()}
                onChange={onChange}
                value={value}
                onBlur={onBlur}
              />
            )}
          />
        </S.NewTaskContent>

        <S.NewTaskButtonsContainer>
          <Button
            onClick={() => {
              setShowNewTaskModal(false);
            }}
            fullWidth
            variant="secondary"
          >
            {t('common.cancel').toUpperCase()}
          </Button>
          <Button
            onClick={(e) => {
              e.preventDefault();
              handleSubmit(onSubmit)();
            }}
            fullWidth
          >
            {t('common.create').toUpperCase()}
          </Button>
        </S.NewTaskButtonsContainer>
      </S.NewTaskModalContainer>
    </Modal>
  );
};

export default NewTaskModal;
