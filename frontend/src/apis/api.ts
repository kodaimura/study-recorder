export const BASE_URL = 'api';

class Api {
    private apiFetch = async (endpoint: string, method: string, body: any): Promise<any> => {
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
    
            let data;
            try {
                data = await response.json();
            } catch (error) {
                if (response.status !== 204 && response.status !== 200) {
                    const error = new Error('Error parsing JSON') as any;
                    error.status = response.status;
                    throw error;
                }
            }
            return data;
        } catch (error: any) {
            if (error.status === 401) {
                document.location.href = "/login";
            } else {
                throw error;
            }
        }
    };

    public get = async (endpoint: string) => {
        return this.apiFetch(endpoint, 'GET', null);
    };
    
    public post = async (endpoint: string, body: any) => {
        return this.apiFetch(endpoint, 'POST', body);
    };
    
    public put = async (endpoint: string, body: any) => {
        return this.apiFetch(endpoint, 'PUT', body);
    };
    
    public delete = async (endpoint: string) => {
        return this.apiFetch(endpoint, 'DELETE', null);
    };
}

export const api = new Api();