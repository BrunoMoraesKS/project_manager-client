import React, { Fragment, useEffect, useState } from 'react';
import * as S from './styles';
import { faXmark, faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import Divider from '../Divider';
import { IProject } from '../../interfaces/project';
import { useTranslation } from 'react-i18next';
import NewProjectModal from '../NewProjectModal';
import MiniLoading from '../MiniLoading';
import useProjects from '../../services/hooks/projects/useProjects';
import { useNavigate } from 'react-router-dom';

const Menu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // const [projects, setProjects] = useState<IProject[]>();
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);

  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data: projects, isFetching } = useProjects();

  const { width } = useWindowDimensions();

  useEffect(() => {
    if (width > 768) {
      setIsMenuOpen(true);
    }
  }, [width]);

  const handleNewProject = () => {
    setShowNewProjectModal(true);
  };

  return (
    <>
      {!isMenuOpen && width < 768 && (
        <S.MenuButton onClick={() => setIsMenuOpen(true)}>
          <FontAwesomeIcon icon={faBars} />
        </S.MenuButton>
      )}

      <S.Container isMenuOpen={isMenuOpen} width={width}>
        {width < 768 && (
          <S.CloseButton
            onClick={() => {
              setIsMenuOpen(false);
            }}
          >
            <FontAwesomeIcon icon={faXmark} />
          </S.CloseButton>
        )}
        <S.Content>
          <S.Title>{t('menu.title')}</S.Title>

          <Divider />

          {isFetching && <MiniLoading />}

          {projects?.map((project: IProject) => {
            return (
              <Fragment key={project.id}>
                <S.Project
                  onClick={() => {
                    navigate(`project/${project.id}`);
                    width < 768 && setIsMenuOpen(false);
                  }}
                >
                  {project.name}
                </S.Project>

                <Divider />
              </Fragment>
            );
          })}

          <S.NewProjectButton
            data-cy="new-project-button"
            onClick={() => {
              handleNewProject();
            }}
          >
            + {t('menu.newProject')}
          </S.NewProjectButton>
        </S.Content>

        {showNewProjectModal && (
          <NewProjectModal setShowNewProjectModal={setShowNewProjectModal} />
        )}
      </S.Container>
      <S.OuterContainer
        onClick={() => {
          setIsMenuOpen(false);
        }}
        isMenuOpen={isMenuOpen}
        width={width}
      />
    </>
  );
};

export default Menu;
