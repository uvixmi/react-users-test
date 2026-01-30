import React from 'react';
import { Button, Input, Typography, notification } from 'antd';
import { useMutation } from '@tanstack/react-query';
import { loginRequest } from '../../features/auth/api/login';
import { setToken, isAuth } from '../../shared/lib/auth';
import { Navigate, useNavigate } from 'react-router-dom';

export const LoginPage = () => {
  const navigate = useNavigate();

  const [login, setLogin] = React.useState('');
  const [password, setPassword] = React.useState('');

  const { mutate, isLoading } = useMutation<string, Error>({
    mutationFn: () => loginRequest(login, password),
    onSuccess: (token) => {
      setToken(token);
      navigate('/users');
    },
    onError: (error) => {
      notification.error({
        message: 'Ошибка авторизации',
        description: error.message,
      });
    },
  });


  if (isAuth()) {
    return <Navigate to="/users" replace />;
  }

  return (
    <div style={{ width: 320, margin: '120px auto' }}>
      <Typography.Title level={3}>Авторизация</Typography.Title>

      <Input
        placeholder="Логин"
        value={login}
        onChange={(e) => setLogin(e.target.value)}
        style={{ marginBottom: 16 }}
      />

      <Input.Password
        placeholder="Пароль"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ marginBottom: 16 }}
      />

      <Button
        type="primary"
        block
        loading={isLoading}
        onClick={() => mutate()}
      >
        Войти
      </Button>
    </div>
  );
};
