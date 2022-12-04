import { PropsWithChildren, createContext, useState } from "react";
import usePersistedState from './../hooks/usePersistedState';

export const ViewContext = createContext<TViewResponse | null>(null);

export const ViewProvider = ({ children }: PropsWithChildren) => {
  // const [view, setView] = useState<TView>("start");
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
