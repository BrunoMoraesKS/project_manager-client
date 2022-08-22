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
import { create } from '../../services/projects/create';
import { useMutation, useQueryClient } from 'react-query';

interface INewProjectModalProps {
  setShowNewProjectModal: (value: boolean) => void;
}

interface IData {
  name: string;
}

const NewProjectModal = ({ setShowNewProjectModal }: INewProjectModalProps) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const createProject = useMutation(async ({ name }: IData) => {
    const { data } = await create({ name });

    return data;
  });

  const schema = yup.object().shape({
    name: yup.string().required(t('newProjectModal.nameIsRequired')),
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

    await createProject.mutateAsync(
      { name },
      {
        onSuccess: () => {
          queryClient.invalidateQueries('projects');
        },

        onError: () => {
          console.log('error');
        },
      }
    );

    setShowNewProjectModal(false);
  };

  return (
    <Modal>
      <S.NewProjectModalContainer>
        <S.NewProjectTitleContainer>
          <S.NewProjectTitle>{t('menu.newProject')}</S.NewProjectTitle>
          <S.NewProjectCloseButton
            onClick={() => {
              setShowNewProjectModal(false);
            }}
          >
            <FontAwesomeIcon icon={faXmark} />
          </S.NewProjectCloseButton>
        </S.NewProjectTitleContainer>

        <S.NewProjectContent>
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
                />
              )}
            />
          </>
        </S.NewProjectContent>

        <S.NewProjectButtonsContainer>
          <Button
            onClick={() => {
              setShowNewProjectModal(false);
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
        </S.NewProjectButtonsContainer>
      </S.NewProjectModalContainer>
    </Modal>
  );
};

export default NewProjectModal;
