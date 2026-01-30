import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from '../../pages/login/LoginPage';
import { isAuth } from '../../shared/lib/auth';
import { UsersPage } from '../../pages/users/UsersPage';
import { NotFoundPage } from '../../pages/not-found/NotFoundPage';
import { useAuth } from '../../shared/lib/authContext';

export const AppRouter = () => {
  const { isAuthenticated } = useAuth()
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={isAuth() ? <Navigate to="/users" /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/users" /> : <LoginPage />}
        />
        <Route
          path="/users"
          element={isAuthenticated ? <UsersPage /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}




