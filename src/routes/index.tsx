import { lazy, Suspense, useState } from 'react';
import * as S from './styles';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import Loading from '../components/Loading';
import useWindowDimensions from '../hooks/useWindowDimensions';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MenuConfigModal from '../components/ConfigModal';

const Menu = lazy(async () => await import('../components/Menu'));
const Home = lazy(async () => await import('../pages/Home'));
const Project = lazy(async () => await import('../pages/Project'));
const TrashCan = lazy(async () => await import('../pages/TrashCan'));

export const AppRoutes = () => {
  const [showConfigModal, setShowMenuConfigModal] = useState(false);
  const { loading } = useSelector((store: RootState) => store.loading);
  const { width } = useWindowDimensions();

  return (
    <Suspense fallback={<Loading />}>
      <Router>
        <S.Container width={width}>
          {loading && <Loading />}

          <Menu />

          <S.ConfigButton
            onClick={() => {
              setShowMenuConfigModal(true);
            }}
          >
            <FontAwesomeIcon icon={faGear} />
          </S.ConfigButton>

          {showConfigModal && (
            <MenuConfigModal setShowMenuConfigModal={setShowMenuConfigModal} />
          )}

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/project/:id" element={<Project />} />
            <Route path="/trashcan" element={<TrashCan />} />

            <Route path="/*" element={<div>NOT FOUND 404</div>} />
          </Routes>
        </S.Container>
      </Router>
    </Suspense>
  );
};
