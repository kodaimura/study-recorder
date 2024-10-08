const BASE_URL = '/api';

class HttpError extends Error {
    public status: number;

    constructor(status: number, message: string) {
        super(message);
        this.status = status;
    }
}

class Api {
    public url: string;

    constructor(url: string) {
        this.url = url;
    }

    /**
     * @throws { HttpError } If an API error occurs.
    */
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
            const response = await fetch(`${this.url}/${endpoint}`, header);

            if (!response.ok) {
                const errorData = await response.json();
                throw new HttpError(response.status, errorData.message);
            }

            let data;
            try {
                data = await response.json();
            } catch (error) {
                if (response.status !== 204 && response.status !== 200) {
                    throw new HttpError(response.status, 'Error parsing JSON');
                }
            }
            return data;
        } catch (error: any) {
            if (error instanceof HttpError) {
                this.handleHttpError(error);
            } else {
                console.error(error);
            }
        }
    };

    public get = async (endpoint: string): Promise<any> => {
        return this.apiFetch(endpoint, 'GET', null);
    };

    public post = async (endpoint: string, body: any): Promise<any> => {
        return this.apiFetch(endpoint, 'POST', body);
    };

    public put = async (endpoint: string, body: any): Promise<any> => {
        return this.apiFetch(endpoint, 'PUT', body);
    };

    public delete = async (endpoint: string): Promise<any> => {
        return this.apiFetch(endpoint, 'DELETE', null);
    };

    public handleHttpError = (error: HttpError): void => {
        console.error(error);
        throw error;
    };
}

const api = new Api(BASE_URL);
api.handleHttpError = (error: HttpError) => {
    if (error.status === 401) {
        window.location.replace('/login');
    } else {
        throw error;
    }
}

export { HttpError, Api, BASE_URL, api };