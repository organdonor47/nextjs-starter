import { useEffect, useState } from 'react';

type TValue = string | boolean | object;

/**
 * Custom hooks to get and set items in localstorage. useLocalStorage
 * returns a value and a setter that is synced with localstorage.
 */
export const useLocalStorage = (key: string, initialValue?: TValue) => {
  if (typeof window === undefined) {
    return [initialValue, undefined];
  }

  const [state, setState] = useState(() => {
    try {
      const local = localStorage.getItem(key);

      if (typeof local !== 'string') {
        localStorage.setItem(key, JSON.stringify(initialValue));

        return initialValue;
      } else {
        return JSON.parse(local);
      }
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch {
      // Noop
    }
  }, [state]);

  return [state, setState];
};
