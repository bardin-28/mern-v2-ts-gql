import React, { lazy, Suspense, useEffect } from 'react';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import Private from './Private/Private';

import { useGlobalState } from 'app/store';
import Preloader from 'components/Preloader';
import { ROUTES, ROLE } from 'constants/constants';

const SignIn = lazy(() => import('pages/Auth/SignIn'));
const SignUp = lazy(() => import('pages/Auth/SignUp'));

const Header = lazy(() => import('components/Header'));

const Dashboard = lazy(() => import('pages/Dashboard'));
const CreateLink = lazy(() => import('pages/CreateLink'));
const DetailedLink = lazy(() => import('pages/DetailedLink'));

const AppRoutes = () => {
  const [state, dispatch] = useGlobalState();
  const auth = state.user.loggedIn;

  if (auth) {
    return (
      <Router>
        <Header />
        <main>
          <Suspense fallback={<Preloader />}>
            <Routes>
              <Route element={<Private route allowedRoles={[ROLE.ADMIN]} />}>
                <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
                <Route path={ROUTES.CREATE} element={<CreateLink />} />
                <Route path={ROUTES.DETAIL} element={<DetailedLink />} />
              </Route>
              <Route path={'*'} element={<Navigate to={ROUTES.DASHBOARD} />} />
            </Routes>
          </Suspense>
        </main>
        {/*<Footer />*/}
      </Router>
    );
  }

  return (
    <Router>
      {/*<PublicHeader />*/}
      <main>
        <Suspense fallback={<Preloader />}>
          <Routes>
            <Route path={ROUTES.AUTH.SIGN_IN} element={<SignIn />} />
            <Route path={ROUTES.AUTH.SIGN_UP} element={<SignUp />} />
            <Route
              path={'*'}
              element={<Navigate to={ROUTES.AUTH.SIGN_IN} replace />}
            />
          </Routes>
        </Suspense>
      </main>
      {/*<Footer />*/}
    </Router>
  );
};

export default AppRoutes;
