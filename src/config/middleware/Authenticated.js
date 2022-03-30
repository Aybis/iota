import Cookies from 'js-cookie';
import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const Authenticated = () => {
  const location = useLocation();
  const isAuth = Cookies.get('session');
  Cookies.set('redirect', location.pathname);

  return isAuth ? (
    <Outlet />
  ) : (
    <Navigate to={'/login'} state={{ from: location }} replace />
  );
};

export default Authenticated;
