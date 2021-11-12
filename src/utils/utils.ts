//status Unauthorized -> redirect to /login
//status in the range 200-299 ->  response.json()
//else -> throw Error
export const parseResponse = (response: Response) => {
	if (!response.ok){
   		if (response.status === 401) {
      		document.location.href = "/";
    	}
    	throw new Error(response.statusText);
  	}
  	return response.json();
}


//data [{minuteTime: 20}, {minuteTime: 30}, {minuteTime: 10}] 
//timeUnit : "m" -> getTotal -> 60
//timeUnit : "h" -> getTotal -> 1
export const getTotal = (
	data: {
   		minuteTime: number,
	}[],
	timeUnit: string = "m"
) => {
	const sum = data.reduce((sum, elem) => sum + elem.minuteTime, 0);

	return (timeUnit === "m")? sum : Math.round(sum / 60 * 100) / 100;
}