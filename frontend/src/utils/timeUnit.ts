export type TimeUnit = 'h' | 'm';

export const TIME_UNIT_STORAGE_KEY = 'study-recorder-time-unit';

export const isTimeUnit = (value: string | null): value is TimeUnit => {
    return value === 'h' || value === 'm';
};

export const getStoredTimeUnit = (): TimeUnit => {
    const savedTimeUnit = window.localStorage.getItem(TIME_UNIT_STORAGE_KEY);
    return isTimeUnit(savedTimeUnit) ? savedTimeUnit : 'h';
};

export const saveTimeUnit = (timeUnit: TimeUnit): void => {
    window.localStorage.setItem(TIME_UNIT_STORAGE_KEY, timeUnit);
    window.dispatchEvent(new StorageEvent('storage', { key: TIME_UNIT_STORAGE_KEY, newValue: timeUnit }));
};
