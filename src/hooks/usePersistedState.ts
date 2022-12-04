import { useEffect, useState } from 'react';

type Response<T> = {
  state: T,
  setState: React.Dispatch<React.SetStateAction<T>>
}

function usePersistedState<T> (label: string, initialState: T | (() => T)): Response<T> {
  const [state, setState] = useState<T>(() => {
    const storageValue = localStorage.getItem(label);
    if (storageValue) {
      return JSON.parse(storageValue);
    } else {
      return initialState;
    }
  });

  useEffect(() => {
    localStorage.setItem(label, JSON.stringify(state));
  }, [state]);

  return {
    state,
    setState
  };
}

export default usePersistedState;