import { BASE_URL, HttpError } from './api';


export const signup = async (username: string, password: string): Promise<any> => {
    const response = await fetch(`${BASE_URL}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: 'include',
        body: JSON.stringify({ username, password })
    });

    if (response.ok) {
        window.location.replace('/login');
    } else {
        const errorData = await response.json();
        throw new HttpError(response.status, errorData.message);
    }
}


export const login = async (username: string, password: string): Promise<any> => {
    const response = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: 'include',
        body: JSON.stringify({ username, password })
    });

    if (response.ok) {
        window.location.replace('/');
    } else {
        const errorData = await response.json();
        throw new HttpError(response.status, errorData.message);
    }
}


export const logout = async () => {
    await fetch(`${BASE_URL}/logout`, {
        method: "POST",
        credentials: 'include',
    });
    window.location.replace('/login');
}
