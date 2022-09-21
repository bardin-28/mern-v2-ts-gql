import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { offsetLimitPagination } from '@apollo/client/utilities';

export const apolloCache = new InMemoryCache({
  addTypename: false,
  typePolicies: {
    Query: {
      fields: {
        links: offsetLimitPagination(),
      },
    },
  },
});
const mainAPI = process.env.REACT_APP_API;

const httpLink = createHttpLink({
  uri: mainAPI,
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

export const apiClient = new ApolloClient({
  cache: apolloCache,
  link: authLink.concat(httpLink),
  connectToDevTools: true,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'network-only',
    },
  },
});
