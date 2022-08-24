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
import { update } from '../../services/projects/update';
import { useMutation, useQueryClient } from 'react-query';

interface IUpdateProjectModalProps {
  projectId: string;
  name: string;
  setShowUpdateProjectModal: (value: boolean) => void;
}

interface IData {
  name: string;
  projectId: string;
}

const UpdateProjectModal = ({
  name,
  projectId,
  setShowUpdateProjectModal,
}: IUpdateProjectModalProps) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const updateProject = useMutation(async ({ name, projectId }: IData) => {
    const { data } = await update({ name, projectId });

    return data;
  });

  const schema = yup.object().shape({
    name: yup
      .string()
      .default(name)
      .required(t('newProjectModal.nameIsRequired')),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: AnyObject) => {
    const { name } = data;

    await updateProject.mutateAsync(
      { name, projectId },
      {
        onSuccess: () => {
          queryClient.invalidateQueries('projects');
          queryClient.invalidateQueries('tasks');
        },

        onError: () => {
          console.log('error');
        },
      }
    );

    setShowUpdateProjectModal(false);
  };

  return (
    <Modal>
      <S.UpdateProjectModalContainer
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            handleSubmit(onSubmit)();
          }
        }}
      >
        <S.UpdateProjectTitleContainer>
          <S.UpdateProjectTitle>
            {t('updateProjectModal.updateProject')}
          </S.UpdateProjectTitle>
          <S.UpdateProjectCloseButton
            onClick={() => {
              setShowUpdateProjectModal(false);
            }}
          >
            <FontAwesomeIcon icon={faXmark} />
          </S.UpdateProjectCloseButton>
        </S.UpdateProjectTitleContainer>

        <S.UpdateProjectContent>
          <>
            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label={t('newProjectModal.name')}
                  error={!!errors.name}
                  helpertext={errors.name?.message?.toString()}
                  onChange={onChange}
                  value={value}
                  onBlur={onBlur}
                  defaultValue={name}
                />
              )}
            />
          </>
        </S.UpdateProjectContent>

        <S.UpdateProjectButtonsContainer>
          <Button
            disabled={updateProject.isLoading}
            onClick={() => {
              setShowUpdateProjectModal(false);
            }}
            fullWidth
            variant="secondary"
          >
            {t('common.cancel').toUpperCase()}
          </Button>
          <Button
            disabled={updateProject.isLoading}
            onClick={(e) => {
              e.preventDefault();
              handleSubmit(onSubmit)();
            }}
            fullWidth
          >
            {t('common.update').toUpperCase()}
          </Button>
        </S.UpdateProjectButtonsContainer>
      </S.UpdateProjectModalContainer>
    </Modal>
  );
};

export default UpdateProjectModal;
