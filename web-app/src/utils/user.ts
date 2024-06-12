import { TLoggedInUser, TLoggedInUserOrganization } from "../api/types/User";
import { useSessionStorage, sessionStorageKeys } from "./sessionStorageItems";

export const useLoggedInUserData = (type: 'ownerOrganizationId') => {
  const { getSessionStorageItem } = useSessionStorage();
  switch(type) {
    case 'ownerOrganizationId':
      const thisUser = {
        ownerOrganization: getSessionStorageItem(sessionStorageKeys.ownerOrganization),
        user: getSessionStorageItem(sessionStorageKeys.user)
      };
      return !!thisUser.ownerOrganization
        ? ((thisUser.ownerOrganization || {}) as TLoggedInUserOrganization)?.id
        : ((thisUser.user || {}) as TLoggedInUser)?.role_and_permission?.role?.organization;
    default:
      return null;
  }
}