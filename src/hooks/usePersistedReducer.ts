import { useReducer } from "react";

type Payload = {
  key: string,
  value: any
}

type Response<T> = {
  state: T,
  setState(key: keyof T | "ALL", value: any): void
}

const getLocalStorageValue = (label: string) => {
  const storageValue = localStorage.getItem(label);
  if (storageValue)
    return JSON.parse(storageValue);
}

const reducer = (state: any, { key, value }: Payload) => {
  if (key === "ALL") {
    state = value;
    return { ...state };
  }
  
  state[key] = value;
  return { ...state };
}

function usePersistedReducer<T>(label: string, initialState: T): Response<T> {
  const storageValue = getLocalStorageValue(label);
  if (storageValue) {
    initialState = storageValue;
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  const setState = (key: keyof T | "ALL", value: any) => {
    dispatch({ key, value } as {key: string, value: any});
  };

  localStorage.setItem(label, JSON.stringify(state));

  return {
    state,
    setState
  }
}

export default usePersistedReducer;
