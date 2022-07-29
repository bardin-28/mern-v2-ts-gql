import React from 'react';

import { ApolloProvider } from '@apollo/client';
import ReactDOM from 'react-dom/client';

import { apiClient } from './api';
import App from './app/App';

import 'styles/index.scss';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <ApolloProvider client={apiClient}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);
