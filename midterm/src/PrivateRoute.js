import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';

const PrivateRoute = ({ element }) => {
  const [token] = useLocalStorage('token', '');

  return token ? element : <Navigate to="/login" />;
};

export default PrivateRoute;