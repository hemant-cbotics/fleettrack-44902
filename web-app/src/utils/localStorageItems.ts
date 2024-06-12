export const localStorageKeys = {
  columns: {
    Users: 'columnsUsers',
    Roles: 'columnsRoles',
    Vehicles: 'columnsVehicles',
    Groups: 'columnsGroups',
    Fleettags: 'columnsFleettags',
    Drivers: 'columnsDrivers',
    Geozones: 'columnsGeozones',
  }
}

export const useLocalStorage = () => {
  const setLocalStorageItem = (itemKey: string, itemValue: object | string) => {
    localStorage.setItem(itemKey, typeof itemValue == 'object' ? JSON.stringify(itemValue) : itemValue);
  }
  const getLocalStorageItem = (itemKey: string) => {
    const value = localStorage.getItem(itemKey)
    return ['{', '['].includes(`${value?.charAt(0)}`) || value === 'null'
      ? JSON.parse(`${value}`)
      : value
  }
  const removeLocalStorageItem = (itemKey: string) => {
    localStorage.removeItem(itemKey)
  }

  return {
    setLocalStorageItem,
    getLocalStorageItem,
    removeLocalStorageItem
  }
}