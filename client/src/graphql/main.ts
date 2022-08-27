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
  defaultOptions: {
    watchQuery: {
      nextFetchPolicy(currentFetchPolicy) {
        if (
          currentFetchPolicy === 'cache-first' ||
          currentFetchPolicy === 'cache-and-network'
        ) {
          // Demote the network policies (except "no-cache") to "cache-first"
          // after the first request.
          return 'network-only';
        }
        // Leave all other fetch policies unchanged.
        return currentFetchPolicy;
      },
    },
  },
});
