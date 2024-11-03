import { BASE_URL, HttpError } from './api';


export const signup = async (username: string, password: string): Promise<any> => {
    const response = await fetch(`${BASE_URL}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
        body: JSON.stringify({ username, password })
    });

    if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.access_token);
        window.location.replace('/calendar');
    } else {
        const errorData = await response.json();
        throw new HttpError(response.status, errorData.message);
    }
}


export const logout = async () => {
    localStorage.removeItem("token");
    window.location.replace('/login');
}