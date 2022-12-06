import { storageAvailable } from "./localStorage";

export const useLocalStorage = () => {
  const localStorage = window.localStorage;
  const hasLocalStorage = storageAvailable();

  const setItem = (key: string, item: any) => {
    if (hasLocalStorage) localStorage.setItem(key, JSON.stringify(item));
  };

  const getItem = (key: string) => {
    if (hasLocalStorage) return JSON.parse(localStorage.getItem(key)!);
  };

  const removeItem = (key: string) => {
    if (hasLocalStorage) localStorage.removeItem(key);
  };

  return {
    setItem,
    getItem,
    removeItem,
  };
};
