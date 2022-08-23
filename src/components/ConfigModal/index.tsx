import React, { useContext } from 'react';
import * as S from './styles';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslation } from 'react-i18next';
import Modal from '../Modal';
import Button from '../Button';
import i18n from '../../i18n';
import { ThemeContext } from '../../context/theme';
import { useNavigate } from 'react-router-dom';

interface IMenuConfigModalProps {
  setShowMenuConfigModal: (value: boolean) => void;
}

const MenuConfigModal = ({ setShowMenuConfigModal }: IMenuConfigModalProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { selectedTheme, setSelectedTheme } = useContext(ThemeContext);

  const handleLanguage = () => {
    const language = i18n.language;

    i18n.changeLanguage(language === 'pt-BR' ? 'en-US' : 'pt-BR');
  };

  const handleTheme = () => {
    setSelectedTheme(selectedTheme === 'light' ? 'dark' : 'light');

    localStorage.setItem(
      'selectedTheme',
      selectedTheme === 'light' ? 'dark' : 'light'
    );
  };

  return (
    <Modal>
      <S.MenuConfigModalContainer>
        <S.MenuConfigTitleContainer>
          <S.MenuConfigTitle>{t('configModal.settings')}</S.MenuConfigTitle>
          <S.MenuConfigCloseButton
            onClick={() => {
              setShowMenuConfigModal(false);
            }}
          >
            <FontAwesomeIcon icon={faXmark} />
          </S.MenuConfigCloseButton>
        </S.MenuConfigTitleContainer>

        <S.MenuConfigContent>
          <Button
            fullWidth
            onClick={() => {
              navigate('/trashcan');
              setShowMenuConfigModal(false);
            }}
          >
            {t('configModal.trashCan')}
          </Button>
          <Button
            fullWidth
            onClick={() => {
              handleTheme();
              setShowMenuConfigModal(false);
            }}
          >
            {t('configModal.theme')}
          </Button>
          <Button
            fullWidth
            onClick={() => {
              handleLanguage();
              setShowMenuConfigModal(false);
            }}
          >
            {t('configModal.language')}
          </Button>
        </S.MenuConfigContent>
      </S.MenuConfigModalContainer>
    </Modal>
  );
};

export default MenuConfigModal;
