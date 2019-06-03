import { UserModel } from '../models/user-model';

export class LocalStorageHandler {
    public static nameKey = 'name';
    public static userNameKey = 'userName';
    public static tokenKey = 'token';
    public static userIdKey = 'userId';
    public static userRowguidKey = 'userRowguid';

    public static removeUserInfos() {
        localStorage.removeItem(LocalStorageHandler.nameKey);
        localStorage.removeItem(LocalStorageHandler.userNameKey);
        localStorage.removeItem(LocalStorageHandler.tokenKey);
        localStorage.removeItem(LocalStorageHandler.userIdKey);
        localStorage.removeItem(LocalStorageHandler.userRowguidKey);
    }

    public static setUser(user: UserModel) {
        if (user !== undefined) {
            const token = user.token;
            localStorage.setItem(LocalStorageHandler.nameKey, user.name);
            localStorage.setItem(LocalStorageHandler.userNameKey, user.userName);
            localStorage.setItem(LocalStorageHandler.tokenKey, token);
            localStorage.setItem(LocalStorageHandler.userIdKey, user.id.toString());
            localStorage.setItem(LocalStorageHandler.userRowguidKey, user.rowguid.toString());
        }
    }

    private static getStringForKey(key: string, defaultValue: string = null) {
        if (localStorage === undefined)
            return defaultValue;

        const value = localStorage.getItem(key);

        if (value === undefined || value === null)
            return defaultValue;

        return value;
    }

    static getToken(): string {
        return LocalStorageHandler.getStringForKey(LocalStorageHandler.tokenKey);
    }

    static getName(): string {
        return LocalStorageHandler.getStringForKey(LocalStorageHandler.nameKey);
    }

    static getUserName(): string {
        return LocalStorageHandler.getStringForKey(LocalStorageHandler.userNameKey);
    }

    static getUserID(): string {
        return LocalStorageHandler.getStringForKey(LocalStorageHandler.userIdKey);
    }

    static getUserFullName(): string {
        return LocalStorageHandler.getStringForKey(
            LocalStorageHandler.userNameKey
        );
    }

}