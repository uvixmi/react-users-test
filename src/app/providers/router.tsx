import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from '../../pages/login/LoginPage';
import { isAuth } from '../../shared/lib/auth';
import { UsersPage } from '../../pages/users/UsersPage';
import { NotFoundPage } from '../../pages/not-found/NotFoundPage';


export const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<LoginPage />} />


      <Route
        path="/users"
        element={isAuth() ? <UsersPage /> : <Navigate to="/login" />}
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </BrowserRouter>
);
