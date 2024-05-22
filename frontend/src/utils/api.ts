const BASE_URL = 'api';

const apiFetch = async (endpoint: string, method: string, body: any): Promise<any> => {
    try {
        let header: any = {
            method: method,
      	    headers: {
            	'Content-Type': 'application/json',
            	Authorization: `Bearer ${localStorage.token}`
      	    },
        };

        if (body) {
            header.body = JSON.stringify(body);
        }
        const response = await fetch(`${BASE_URL}/${endpoint}`, header);
        if (!response.ok) {
            const errorData = await response.json();
            const error = new Error(errorData.message || 'An error occurred') as any;
            error.status = response.status;
            throw error;
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
};

export const apiGet = async (endpoint: string) => {
    return apiFetch(endpoint, 'GET', {});
};

export const apiPost = async (endpoint: string, body: any) => {
    return apiFetch(endpoint, 'POST', body);
};

export const apiPut = async (endpoint: string, body: any) => {
    return apiFetch(endpoint, 'PUT', body);
};

export const apiDelete = async (endpoint: string) => {
    return apiFetch(endpoint, 'DELETE', {});
};