import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

export const onInitialClientRender = () => {
  setTimeout(function () {
    const loader = document.getElementById('___loader');
    if (loader) {
      loader.style.display = 'none';
    }
  }, 1000);
};

const queryClient = new QueryClient();
export const wrapRootElement = ({ element }) => (
  <QueryClientProvider client={queryClient}>{element}</QueryClientProvider>
);
