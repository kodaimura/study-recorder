export const BASE_URL = 'api';

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
    } catch (error) {
        throw error;
    }
};

export const apiGet = async (endpoint: string) => {
    return apiFetch(endpoint, 'GET', null);
};

export const apiPost = async (endpoint: string, body: any) => {
    return apiFetch(endpoint, 'POST', body);
};

export const apiPut = async (endpoint: string, body: any) => {
    return apiFetch(endpoint, 'PUT', body);
};

export const apiDelete = async (endpoint: string) => {
    return apiFetch(endpoint, 'DELETE', null);
};

export const getErrorStatus = (error: any) => {
    const match = error.message.match(/HTTP Status: (\d+)/);
    const status = match? match[1] : "0";
    return parseInt(status);
}

export const handleResponse = (response: Response) => {
    if (!response.ok) {
        throw new Error(`HTTP Status: ${response.status}`);
    } else {
        return response.json();
    }
}

export const handleError = (error: any) => {
    const status = getErrorStatus(error);
    if (status === 0) {
        console.error(error);
    }

	if (status === 401) {
		document.location.href = "/login";
	}
    throw error;
}