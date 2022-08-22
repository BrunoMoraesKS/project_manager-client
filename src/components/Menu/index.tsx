import React, { Fragment, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { read } from '../../services/projects/read';
import { setLoading } from '../../store/ducks/loading';
import * as S from './styles';
import { faXmark, faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import { useClickOutside } from '../../hooks/useClickOutside';
import Divider from '../Divider';
import { IProject } from '../../interfaces/project';
import { useTranslation } from 'react-i18next';
import NewProjectModal from '../NewProjectModal';
import MiniLoading from '../MiniLoading';
import Loading from '../Loading';
import useProjects from '../../services/hooks/projects/useProjects';

const Menu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // const [projects, setProjects] = useState<IProject[]>();
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);

  const { t } = useTranslation();
  const { data: projects, isLoading, isFetching, isError } = useProjects();

  const wrapperRef = useRef(null);
  const { width } = useWindowDimensions();
  const dispatch = useDispatch();

  useClickOutside(wrapperRef, () => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  });

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

      <S.Container
        ref={width < 768 ? wrapperRef : null}
        isMenuOpen={isMenuOpen}
        width={width}
      >
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
                <S.Project>{project.name}</S.Project>

                <Divider />
              </Fragment>
            );
          })}

          <S.NewProjectButton
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
    </>
  );
};

export default Menu;
