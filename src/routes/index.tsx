import { lazy, Suspense } from 'react';
import * as S from './styles';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import Loading from '../components/Loading';
import useWindowDimensions from '../hooks/useWindowDimensions';

const Menu = lazy(async () => await import('../components/Menu'));
const Project = lazy(async () => await import('../pages/Project'));
const Home = lazy(async () => await import('../pages/Home'));

export const AppRoutes = () => {
  const { loading } = useSelector((store: RootState) => store.loading);
  const { width } = useWindowDimensions();

  return (
    <Suspense fallback={<Loading />}>
      <Router>
        <S.Container width={width}>
          {loading && <Loading />}

          <Menu />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/project/:id" element={<Project />} />

            <Route path="/*" element={<div>NOT FOUND 404</div>} />
          </Routes>
        </S.Container>
      </Router>
    </Suspense>
  );
};
