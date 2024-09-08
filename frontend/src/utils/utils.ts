export const minuteToHour = (minute: number): number => {
    return Math.round(minute / 60 * 100) / 100;
}

export const hourToMinute = (hour: number): number => {
    return hour * 60;
}

export const formatLocalDateTime = (date: Date): string => {
    return new Intl.DateTimeFormat(navigator.language, {
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    }).format(date);
}

export const formatLocalDateTimeISO = (date: Date): string => {
    const offset = -date.getTimezoneOffset();
    const offsetSign = offset >= 0 ? '+' : '-';
    const offsetHours = String(Math.floor(Math.abs(offset) / 60)).padStart(2, '0');
    const offsetMinutes = String(Math.abs(offset) % 60).padStart(2, '0');
    const offsetStr = `${offsetSign}${offsetHours}:${offsetMinutes}`;

    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}T${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}${offsetStr}`;
}