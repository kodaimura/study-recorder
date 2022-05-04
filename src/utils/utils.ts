//status Unauthorized -> redirect to /login
//status in the range 200-299 ->  response.json()
//else -> throw Error
export const responseFilter = (response: Response) => {
	if (!response.ok){
   		if (response.status === 401) {
      		document.location.href = "/";
    	}
    	throw new Error(response.statusText);
  	}
  	return response.json();
}


//data [{minuteTime: 20}, {minuteTime: 30}, {minuteTime: 10}] 
//getMinuteTotal -> 60
export const getMinuteTotal = (
	data: {
   		minuteTime: number,
	}[],
	timeUnit: string = "m"
): number => {
	return data.reduce((sum, elem) => sum + elem.minuteTime, 0);
}


export const toHour = (
	minute: number
):number => {
	return Math.round(minute / 60 * 100) / 100;
} 