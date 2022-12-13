import { PropsWithChildren, createContext } from "react";
import usePersistedState from './../hooks/usePersistedState';

export const ViewContext = createContext<TViewResponse | null>(null);

export const ViewProvider = ({ children }: PropsWithChildren) => {
  const { state: view, setState: setView } = usePersistedState<TView>("VIEW", "start");

  return (
    <ViewContext.Provider value={{
      view,
      setView
    }}>
      {children}
    </ViewContext.Provider>
  );
};
