import React, { useContext, createContext, useReducer } from 'react';

import { STORE_ACTIONS } from 'app/store/constants';

const token = localStorage.getItem('token');

const initialState: any = {
  user: {
    loggedIn: !!token,
    role: 'admin',
  },
};

const reducer = (state, action) => {
  switch (action.type) {
    case STORE_ACTIONS.USER_LOGIN: {
      return {
        ...state,
        user: { ...state.user, loggedIn: true },
      };
    }

    case STORE_ACTIONS.USER_LOGOUT: {
      return {
        ...state,
        user: { ...state.user, loggedIn: false },
      };
    }

    default:
      return state;
  }
};

export const StoreProviderContext = createContext([initialState, () => {}]);

StoreProviderContext.displayName = 'StoreProvider';

export const useGlobalState = () => useContext(StoreProviderContext);

export const StoreProvider = ({ children }) => {
  const [store, dispatch] = useReducer(reducer, null, () => initialState);

  return (
    <StoreProviderContext.Provider value={[store, dispatch]}>
      {children ? children : ''}
    </StoreProviderContext.Provider>
  );
};
