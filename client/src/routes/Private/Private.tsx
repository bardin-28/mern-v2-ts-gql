import React from 'react';

import { Outlet, Navigate, useLocation } from 'react-router-dom';

import { ROUTES } from '../../constants/constants';

import { useGlobalState } from 'app/store';

interface PrivateProps {
  allowedRoles: Array<string>;
  route?: boolean;
}

const Private = ({
  allowedRoles = [],
  route = false,
}: PrivateProps): React.ReactElement => {
  const location = useLocation();
  const [state] = useGlobalState();

  const authenticated = state.user.loggedIn;
  const userRole = 'admin'; // userState?.data?.role

  const checkRoute = () => {
    if (!authenticated && route) {
      return (
        <Navigate to={ROUTES.AUTH.SIGN_IN} state={{ from: location }} replace />
      );
    }

    return allowedRoles?.find((role) => role === userRole) ? (
      <>
        <Outlet />
      </>
    ) : (
      route && (
        <Navigate to={ROUTES.AUTH.SIGN_IN} state={{ from: location }} replace />
      )
    );
  };
  return checkRoute() as React.ReactElement<
    any,
    string | React.JSXElementConstructor<any>
  >;
};

export default Private;
