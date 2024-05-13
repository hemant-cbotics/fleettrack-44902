export const sessionStorageKeys = {
  accessToken: 'accessToken',
  ownerOrganization: 'ownerOrganization',
  user: 'user'
}

export const useSessionStorage = () => {
  const setSessionStorageItem = (itemKey: string, itemValue: object | string) => {
    sessionStorage.setItem(itemKey, typeof itemValue == 'object' ? JSON.stringify(itemValue) : itemValue);
  }
  const getSessionStorageItem = (itemKey: string) => {
    const value = sessionStorage.getItem(itemKey)
    return ['{', '['].includes(`${value?.charAt(0)}`) || value === 'null'
      ? JSON.parse(`${value}`)
      : value
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