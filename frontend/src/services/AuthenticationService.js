import axios from 'axios';

const baseUrl = 'http://localhost:8889/api';

const USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser';
const AUTHENTICATION_TOKEN = 'authToken'

const executeBasicAuthenticationService = (username, password) => {
    return axios.get(`${baseUrl}/basicauth`,
        { 
            headers: { authorization: createBasicAuthToken(username, password) } 
        });
};

const createBasicAuthToken = (username, password) => {
    return 'Basic ' + window.btoa(username + ":" + password);
};

const registerSuccessLogin = (username, password) => {
    sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username);
    localStorage.setItem(AUTHENTICATION_TOKEN, createBasicAuthToken(username, password))
    setupAxiosInterceptors(createBasicAuthToken(username, password));
}

const setupAxiosInterceptors = (token) => {
    axios.interceptors.request.use(
        (config) => {
            if (isUserLoggedIn()) {
                config.headers.authorization = token
            }
            return config;
        }
    );
};

const getAuthenticationToken = () => {
    let authToken = localStorage.getItem(AUTHENTICATION_TOKEN);
    if (authToken === null) {
        return '';
    }
    return authToken;
}

const isUserLoggedIn = () => {
    let sessionUser = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
    if (sessionUser === null) {
        return false;
    }
    return true;
}

const getLoggedInUsername = () => {
    let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
    if (user === null) {
        return '';
    }
    let username = user.substring(0, user.indexOf("@"));
    return username;
}

const logout = () => {
    sessionStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
}

export default { executeBasicAuthenticationService, createBasicAuthToken, registerSuccessLogin, isUserLoggedIn, getLoggedInUsername, logout, getAuthenticationToken };