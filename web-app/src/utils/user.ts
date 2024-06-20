import { LegacyOrganizationAccount } from "../api/types/Account";
import { LegacyVerifyEmailOtpResponseWithAccount } from "../api/types/Onboarding";
import { sessionStorageKeys, useSessionStorage } from "./sessionStorageItems";

export const useLoggedInUserData = (type: 'ownerOrganizationId') => {
  const { getSessionStorageItem } = useSessionStorage();
  switch(type) {
    case 'ownerOrganizationId':
      const thisUser = {
        ownerOrganization: getSessionStorageItem(sessionStorageKeys.ownerOrganization) as LegacyOrganizationAccount,
        user: getSessionStorageItem(sessionStorageKeys.user) as LegacyVerifyEmailOtpResponseWithAccount,
      };
      return !!thisUser.ownerOrganization
        ? ((thisUser.ownerOrganization || {}) as LegacyOrganizationAccount)?.accountid
        : ((thisUser.user || {}) as LegacyVerifyEmailOtpResponseWithAccount)?.account?.accountid || null;
    default:
      return null;
  }
}