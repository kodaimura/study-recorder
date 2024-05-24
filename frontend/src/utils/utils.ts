export const minuteToHour = (minute: number):number => {
    return Math.round(minute / 60 * 100) / 100;
} 

export const hourToMinute = (hour: number):number => {
    return hour * 60;
} 