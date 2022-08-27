import React from 'react';

import { ApolloProvider } from '@apollo/client';
import ReactDOM from 'react-dom/client';

import App from './app/App';

import { StoreProvider } from 'app/store';
import { apiClient } from 'graphql/main';

import 'styles/index.scss';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <ApolloProvider client={apiClient}>
    <StoreProvider>
      <App />
    </StoreProvider>
  </ApolloProvider>
);
