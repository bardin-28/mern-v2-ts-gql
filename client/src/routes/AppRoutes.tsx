import React, { Suspense } from 'react';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import Private from './Private/Private';

import Preloader from 'components/Preloader';
import { ROUTES, ROLE } from 'constants/constants';
import SignIn from 'pages/Auth/SignIn';

const AppRoutes = () => {
  const authenticated = false;

  if (authenticated) {
    return (
      <Router>
        {/*<Header />*/}
        <main>
          <Suspense fallback={<Preloader />}>
            <Routes>
              <Route element={<Private route allowedRoles={[ROLE.ADMIN]} />}>
                <Route path={ROUTES.DASHBOARD} element={<>dashboard</>} />
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
