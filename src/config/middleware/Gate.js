import Cookies from 'js-cookie';
import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const Gate = () => {
  const location = useLocation();
  const isAuth = Cookies.get('session');
  const redirect = Cookies.set('redirect', location.pathname);
  // const path = params.find((item) => item.indexOf('path') > -1);
  // const redirects = path?.split('=')?.[1];

  if (!isAuth && redirect) localStorage.setItem('redirect', redirect);

  return isAuth ? (
    <Navigate to={'/'} state={{ from: location }} replace />
  ) : (
    <Outlet />
  );
};

export default Gate;

// import Cookies from 'js-cookie';
// import React from 'react';
// import { Route, Redirect, withRouter } from 'react-router-dom';

// const Gate = ({ component: Component, location, ...rest }) => {
//   const ok = Cookies.get('session');
//   const params = location?.search.substring(1).split('&');
//   const path = params.find((item) => item.indexOf('path') > -1);
//   const redirect = path?.split('=')?.[1];

//   if (!ok && redirect) localStorage.setItem('redirect', redirect);

//   return (
//     <Route
//       {...rest}
//       render={(props) => (ok ? <Redirect to="/" /> : <Component {...props} />)}
//     />
//   );
// };

// export default withRouter(Gate);
