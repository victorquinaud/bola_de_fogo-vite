import { useCallback, useReducer } from "react";

type Payload = {
  key: string,
  value: any
}

type Response<T> = {
  state: T,
  setState(key: string, value: any): void
}

let lastKeyStatus = true;

const createDate = () => {
  return new Date().toLocaleDateString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

const getLocalStorageValue = (label: string) => {
  const storageValue = localStorage.getItem(label);
  if (storageValue)
    return JSON.parse(storageValue);
}

const includeStateKeyCheck = (state: any, key: string) => {
  const keys = Object.keys(state);
  if (keys.includes(key))
    return true;
  else
    return false;
}

const reducer = (state: any, { key, value }: Payload) => {
  if (!state.date)
    state.date = createDate();

  if (key === "ALL") {
    state = value;
    return state;
  }

  if (!includeStateKeyCheck(state, key))
    return state

  state[key] = value;
  return state;
}

function usePersistedReducer<T> (label: string, initialState: T): Response<T> {
  const storageValue = getLocalStorageValue(label);
  if (storageValue) {
    initialState = storageValue;
  }
  
  const [state, dispatch] = useReducer(reducer, initialState);

  const setState = useCallback((key: string, value: any) => {
    dispatch({ key, value });
  }, [dispatch]);

  if (lastKeyStatus)
    localStorage.setItem(label, JSON.stringify(state));

  return {
    state,
    setState
  }
}

export default usePersistedReducer;
