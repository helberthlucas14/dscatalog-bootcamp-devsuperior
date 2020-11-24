import jwtDecode from "jwt-decode";
import history from './history';

export const CLIENT_ID = process.env.REACT_APP_CLIENT_ID ?? 'dscatalog';
export const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET ?? 'dscatalog123';
const dataName = 'authData';

type LoginResponse = {
    access_token: string;
    token_type: string;
    expires_in: number;
    scope: string;
    userFirstName: string;
    userId: number;
}

export type Role = 'ROLE_OPERATOR' | 'ROLE_ADMIN';

type AccesToken = {
    exp: number;
    user_name: string;
    authorities: Role[];
}

export const saveSessionData = (loginResponse: LoginResponse) => {
    console.log(loginResponse + 'save sessesion')
    localStorage.setItem(dataName, JSON.stringify(loginResponse));
}

export const getSessionData = () => {
    const sessionData = localStorage.getItem(dataName) ?? '{}'
    const parsedSessionData = JSON.parse(sessionData);

    return parsedSessionData as LoginResponse;
}

export const getAccesTokenDecoded = () => {
    const sessionData = getSessionData();
    try {
        const tokenDecoded = jwtDecode(sessionData.access_token);
        return tokenDecoded as AccesToken;
    } catch (error) {
        return {} as AccesToken;
    }

}

export const isTokenValid = () => {
    const { exp } = getAccesTokenDecoded();
    return Date.now() <= exp * 1000;
}

export const isAuthenticated = () => {
    const sessionData = getSessionData();
    return sessionData.access_token && isTokenValid();
}

export const isAllowedByRole = (routeRoles: Role[] = []) => {
    if (routeRoles.length === 0) {
        return true;
    }

    const { authorities } = getAccesTokenDecoded();

    return routeRoles.some((role) => authorities?.includes(role));
}

export const logout = () => {
    localStorage.removeItem(dataName);
    history.replace('/auth/login');
}