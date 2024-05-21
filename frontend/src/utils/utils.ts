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

export const msToHs = (
    minutes: number[]
) => {
    return minutes.map(m => m / 60)
}


export const hsToMs = (
    hours: number[]
) => {
    return hours.map(h => h * 60)
}


export const toHour = (
    minute: number
):number => {
    return Math.round(minute / 60 * 100) / 100;
} 


//data [{minuteTime: 20}, {minuteTime: 30}, {minuteTime: 10}] 
//getMinuteTotal -> 60
export const getMinuteTotal = (
	data: {
   		minuteTime: number,
	}[]
): number => {
	return data.reduce((sum, elem) => sum + elem.minuteTime, 0);
}


export const getTotal = (
	ls: number[]
): number => {
	return ls.reduce((sum, elem) => sum + elem);
}