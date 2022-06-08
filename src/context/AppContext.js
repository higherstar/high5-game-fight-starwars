import React, { createContext, useReducer }  from "react";

export const SET_DATA = "SET_DATA";
export const LOADING_STATE = "LOADING_STATE";
export const SET_TRIP_DATA = "SET_TRIP_DATA";

export const initialState = {
  data: undefined,
  loadingState: "loading",
};

export const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_DATA:
      return {
        ...state,
        data: payload,
        loadingState: "success",
      };
    case LOADING_STATE:
      return {
        ...state,
        loadingState: payload,
      };
    case SET_TRIP_DATA:
      return {
        ...state,
        tripData: payload,
      };
    default:
      throw new Error(`Unhandled action type: ${type}`);
  }
};
export const AppContext = createContext({
  state: initialState,
  dispatch: () => {}
})

const AppContextProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  
  return (
    <AppContext.Provider value={{state, dispatch}}>
      {children}
    </AppContext.Provider>
  )
}

export default AppContextProvider;
