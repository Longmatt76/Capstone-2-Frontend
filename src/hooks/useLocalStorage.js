import {useState, useEffect} from "react";

const useLocalStorage = (key, identifier, defaultValue = null) => {
  const LOCAL_STORAGE_KEY = `${key}-${identifier}`;
  const INITIAL_STATE = localStorage.getItem(LOCAL_STORAGE_KEY) || defaultValue;
  const [state, setState] = useState(INITIAL_STATE);

  useEffect(() => {
    if (state === null) {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    } else {
      localStorage.setItem(LOCAL_STORAGE_KEY, state);
    }
  }, [LOCAL_STORAGE_KEY, state]);

  return [state, setState];
};


export default useLocalStorage; 