// PrivateRoute.js

import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ element, isAuth, isAdmin, ...rest }) => {
  if (!isAuth) {
    return <Navigate to="/login" />;
  }

  if (rest.adminOnly && !isAdmin) {
    return <Navigate to="/" />;
  }

  return <Route {...rest} element={element} />;
};

export default PrivateRoute;
