import { APP_CONFIG } from "../constants/constants";
import { useSessionStorage, sessionStorageKeys } from "./sessionStorageItems";

const useAuth = () => {
    const { getSessionStorageItem } = useSessionStorage();
    const accessToken = getSessionStorageItem(sessionStorageKeys.accessToken);

    const isUserLoggedIn = () => {
        // if (APP_CONFIG.DEBUG.ALL) console.log('access Token', accessToken);
        return accessToken !== null && accessToken !== undefined;
    };

    return { isUserLoggedIn };
};

export default useAuth