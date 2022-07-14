import { useContext, createContext, useReducer } from "react";
import { AppProviderProps, Dispatch, State } from "./contexts.types";
import reducer, { initialState } from "./reducer";

const AppContext = createContext<
  { state: State; dispatch: Dispatch } | undefined
>(undefined);

export const AppContextProvider = ({ children }: AppProviderProps) => {
  const [state, dispatch]: any = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

const useAppContext = () => {
  const context = useContext(AppContext);

  if (context === undefined) {
    throw new Error("useApp must be used within a AppProvider");
  }
  return context;
};

export default useAppContext;
