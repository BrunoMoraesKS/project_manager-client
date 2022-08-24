import React from 'react';
import { useTranslation } from 'react-i18next';
import Divider from '../../components/Divider';

import * as S from './styles';

const Home = () => {
  const { t } = useTranslation();

  return (
    <S.Container>
      <S.Title>{t('home.title')}</S.Title>
      <Divider />
      <S.Content>
        <S.Paragraph>{t('home.paragraph1')}</S.Paragraph>
        <S.Paragraph>{t('home.paragraph2')}</S.Paragraph>
        <S.Paragraph>{t('home.paragraph3')}</S.Paragraph>
        <S.Paragraph>{t('home.paragraph4')}</S.Paragraph>
        <S.Paragraph>{t('home.paragraph5')}</S.Paragraph>
      </S.Content>
    </S.Container>
  );
};

export default Home;
