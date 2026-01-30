import React from 'react';
import { AppRouter } from './providers/router';
import { QueryProvider } from './providers/queryClient';
import { ConfigProvider } from 'antd';
import { AuthProvider } from '../shared/lib/authContext';


export const App = () => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#246093'
        },
      }}
    >
      <AuthProvider>
        <QueryProvider>
          <AppRouter />
        </QueryProvider>
      </AuthProvider>
    </ConfigProvider>
  );
};
