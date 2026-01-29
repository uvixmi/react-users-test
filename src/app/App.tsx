import React from 'react';
import { AppRouter } from './providers/router';
import { QueryProvider } from './providers/queryClient';

export const App = () => {
  return (
    <QueryProvider>
      <AppRouter />
    </QueryProvider>
  );
};
