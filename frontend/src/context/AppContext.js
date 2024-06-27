import React, { createContext, useReducer } from 'react';

const initialState = {
  // Define initial state
};

const AppContext = createContext(initialState);

const reducer = (state, action) => {
  switch (action.type) {
    // Define cases
    default:
      return state;
  }
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
