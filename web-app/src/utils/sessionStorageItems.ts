export const sessionStorageKeys = {
  accessToken: 'accessToken',
  user: 'user'
}

export const useSessionStorage = () => {
  const setSessionStorageItem = (itemKey: string, itemValue: string) => {
    sessionStorage.setItem(itemKey, itemValue);
  }
  const getSessionStorageItem = (itemKey: string) => {
    return sessionStorage.getItem(itemKey)
  }
  const removeSessionStorageItem = (itemKey: string) => {
    sessionStorage.removeItem(itemKey)
  }

  return {
    setSessionStorageItem,
    getSessionStorageItem,
    removeSessionStorageItem
  }
}