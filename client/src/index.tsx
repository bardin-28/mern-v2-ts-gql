import React from 'react';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from '@apollo/client';
import ReactDOM from 'react-dom/client';

import App from './app/App';
import reportWebVitals from './reportWebVitals';

import './styles/index.scss';

export const apolloCache = new InMemoryCache({});
const mainAPI = process.env.REACT_APP_API;

const client = new ApolloClient({
  uri: mainAPI,
  cache: apolloCache,
  headers: {
    authorization: localStorage.getItem('token') || '',
  },
  connectToDevTools: true,
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);

reportWebVitals();
