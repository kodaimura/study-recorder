import React from 'react';

const getCellColor = (minuteTime: number): string => {
    if (minuteTime >= 480) return '#8fbc8f';
    if (minuteTime >= 360) return '#afd4aa';
    if (minuteTime >= 240) return '#cfe6c8';
    if (minuteTime >= 120) return '#e5f2df';
    if (minuteTime > 0) return '#f3f8ef';
    return '#fff';
};

type Props = {
    day: number;
    minuteTime: number;
    timeUnit: string;
};

const CalendarCell: React.FC<Props> = ({ day, minuteTime, timeUnit }) => {
    const displayTime = timeUnit === 'm' ? minuteTime : Math.round((minuteTime / 60) * 100) / 100;

    return (
        <td className="calendar-cell" style={{ backgroundColor: getCellColor(minuteTime) }}>
            {day !== 0 && (
                <>
                    <div className="calendar-day">{day}</div>
                    <div className="calendar-time">{displayTime}</div>
                </>
            )}
        </td>
    );
};

export default CalendarCell;
