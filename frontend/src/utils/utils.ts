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