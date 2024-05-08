// ProtectedRoute.js
import React from 'react';
import { Navigate, Route } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ element, ...rest }) => {
  const { user } = useAuth();

  return user ? (
    <Route {...rest} element={element} />
  ) : (
    <Navigate to="/Login" replace />
  );
};

export default ProtectedRoute;