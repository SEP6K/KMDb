export const useLocalStorage = () => {
  const localStorage = window.localStorage;

  const setItem = (key: string, item: any) =>
    localStorage.setItem(key, JSON.stringify(item));

  const getItem = (key: string) => JSON.parse(localStorage.getItem(key)!);

  const removeItem = (key: string) => localStorage.removeItem(key);

  return {
    setItem,
    getItem,
    removeItem,
  };
};
