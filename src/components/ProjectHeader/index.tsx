import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import SoftDeleteProjectModal from '../SoftdeleteProjectModal';
import Divider from '../Divider';
import UpdateProjectModal from '../UpdateProjectModal';
import * as S from './styles';

interface IProjectHeaderProps {
  id: string;
  name: string;
}

const ProjectHeader = ({ id, name }: IProjectHeaderProps) => {
  const [showUpdateModal, setShowUpdateModal] = React.useState(false);
  const [showSoftdeleteModal, setShowSoftdeleteModal] = React.useState(false);

  return (
    <S.Container>
      <S.TitleContainer>
        <S.Title>{name}</S.Title>

        <S.ButtonsContainer>
          <S.ProjectButton
            data-cy="update-project-button"
            onClick={() => {
              setShowUpdateModal(true);
            }}
          >
            <FontAwesomeIcon icon={faPencil} />
          </S.ProjectButton>
          <S.ProjectButton
            data-cy="softdelete-project-button"
            onClick={() => {
              setShowSoftdeleteModal(true);
            }}
          >
            <FontAwesomeIcon icon={faTrash} />
          </S.ProjectButton>
        </S.ButtonsContainer>
      </S.TitleContainer>

      <Divider />

      {showUpdateModal && (
        <UpdateProjectModal
          name={name}
          projectId={id}
          setShowUpdateProjectModal={setShowUpdateModal}
        />
      )}

      {showSoftdeleteModal && (
        <SoftDeleteProjectModal
          projectId={id}
          setShowSoftdeleteProjectModal={setShowSoftdeleteModal}
        />
      )}
    </S.Container>
  );
};

export default ProjectHeader;
