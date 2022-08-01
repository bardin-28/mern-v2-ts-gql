import { ApolloClient, InMemoryCache } from '@apollo/client';

export const apolloCache = new InMemoryCache({});
const mainAPI = process.env.REACT_APP_API;

export const apiClient = new ApolloClient({
  uri: mainAPI,
  cache: apolloCache,
  headers: {
    authorization: localStorage.getItem('token') || '',
  },
  connectToDevTools: true,
});
