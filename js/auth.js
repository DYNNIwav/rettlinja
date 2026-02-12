import { apiRequest } from './api.js';

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_username';

function saveToken(token) {
    localStorage.setItem(TOKEN_KEY, token);
}

function saveUsername(username) {
    localStorage.setItem(USER_KEY, username);
}

export function getToken() {
    return localStorage.getItem(TOKEN_KEY);
}

export function getUsername() {
    return localStorage.getItem(USER_KEY);
}

export function isLoggedIn() {
    return getToken() !== null;
}

function clearToken() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
}

export async function register(username, email, password) {
    const response = await apiRequest('/auth/register', {
        method: 'POST',
        body: JSON.stringify({ name: username, email, password}),
    });
    return response;
}

export async function login(email, password) {
    const response = await apiRequest('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
    });

    saveToken(response.data.accessToken);
    saveUsername(response.data.name);
    return response;
}

export function logout() {
    clearToken();
}