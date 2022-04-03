export const getLocalStorageValue = (key: string) => {
  if (typeof localStorage !== "undefined") {
    const storageValue = localStorage.getItem(key);

    return storageValue ? JSON.parse(storageValue) : null;
  }

  return null;
};
