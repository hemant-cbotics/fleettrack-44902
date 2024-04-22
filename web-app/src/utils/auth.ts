import { useSessionStorage, sessionStorageKeys } from "./sessionStorageItems";

const useAuth = () => {
    const { getSessionStorageItem } = useSessionStorage();
    const accessToken = getSessionStorageItem(sessionStorageKeys.accessToken);

    const isUserLoggedIn = () => {
        console.log('access Token', accessToken);
        return accessToken !== null && accessToken !== undefined;
    };

    return { isUserLoggedIn };
};

export default useAuth