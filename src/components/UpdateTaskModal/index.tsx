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
import { update } from '../../services/tasks/update';
import { useMutation, useQueryClient } from 'react-query';

interface IUpdateTaskModalProps {
  setShowUpdateTaskModal: (value: boolean) => void;
  id: string;
  name: string;
  user: string;
  shouldBeCompletedAt: Date;
}

interface IData {
  id: string;
  name: string;
  user: string;
  shouldBeCompletedAt: Date;
}

const UpdateTaskModal = ({
  setShowUpdateTaskModal,
  id,
  name,
  user,
  shouldBeCompletedAt,
}: IUpdateTaskModalProps) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const updateTask = useMutation(
    async ({ id, name, user, shouldBeCompletedAt }: IData) => {
      const { data } = await update({
        id,
        name,
        user,
        shouldBeCompletedAt,
      });

      return data;
    }
  );

  const schema = yup.object().shape({
    name: yup.string().default(name).required(t('newTaskModal.nameIsRequired')),
    user: yup.string().default(user).required(t('newTaskModal.userIsRequired')),
    shouldBeCompletedAt: yup
      .string()
      .default(new Date(shouldBeCompletedAt).toISOString().split('T')[0])
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

    await updateTask.mutateAsync(
      { id, name, user, shouldBeCompletedAt },
      {
        onSuccess: () => {
          queryClient.invalidateQueries('tasks');
        },

        onError: () => {
          console.log('error');
        },
      }
    );

    setShowUpdateTaskModal(false);
  };

  return (
    <Modal>
      <S.UpdateTaskModalContainer>
        <S.UpdateTaskTitleContainer>
          <S.UpdateTaskTitle>{t('newTaskModal.addTask')}</S.UpdateTaskTitle>
          <S.UpdateTaskCloseButton
            onClick={() => {
              setShowUpdateTaskModal(false);
            }}
          >
            <FontAwesomeIcon icon={faXmark} />
          </S.UpdateTaskCloseButton>
        </S.UpdateTaskTitleContainer>

        <S.UpdateTaskContent>
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
                defaultValue={name}
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
                defaultValue={user}
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
                defaultValue={
                  new Date(shouldBeCompletedAt).toISOString().split('T')[0]
                }
              />
            )}
          />
        </S.UpdateTaskContent>

        <S.UpdateTaskButtonsContainer>
          <Button
            disabled={updateTask.isLoading}
            onClick={() => {
              setShowUpdateTaskModal(false);
            }}
            fullWidth
            variant="secondary"
          >
            {t('common.cancel').toUpperCase()}
          </Button>
          <Button
            disabled={updateTask.isLoading}
            onClick={(e) => {
              e.preventDefault();
              handleSubmit(onSubmit)();
            }}
            fullWidth
          >
            {t('common.create').toUpperCase()}
          </Button>
        </S.UpdateTaskButtonsContainer>
      </S.UpdateTaskModalContainer>
    </Modal>
  );
};

export default UpdateTaskModal;
