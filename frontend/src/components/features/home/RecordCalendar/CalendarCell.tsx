import React from 'react';

import { Record } from 'types/types';

const getCellColor = (minuteTime: number): string => {
    if (minuteTime >= 480) return '#8fbc8f';
    if (minuteTime >= 360) return '#afd4aa';
    if (minuteTime >= 240) return '#cfe6c8';
    if (minuteTime >= 120) return '#e5f2df';
    if (minuteTime > 0) return '#f3f8ef';
    return '#fff';
};

type Props = {
    record: Record;
    timeUnit: string;
    onEdit: (record: Record) => void;
};

const CalendarCell: React.FC<Props> = ({ record, timeUnit, onEdit }) => {
    const { day, minuteTime, comment } = record;
    const displayTime = timeUnit === 'm' ? minuteTime : Math.round((minuteTime / 60) * 100) / 100;
    const hasComment = comment.trim().length > 0;

    return (
        <td
            className={`calendar-cell editable ${hasComment ? 'has-comment' : ''}`}
            style={{ backgroundColor: getCellColor(minuteTime) }}
        >
            {day !== 0 && (
                <button
                    type="button"
                    className="calendar-cell-button"
                    onClick={() => onEdit(record)}
                >
                    <div className="calendar-day">
                        {day}
                        {hasComment && <span className="comment-dot" aria-label="メモあり"></span>}
                    </div>
                    <div className="calendar-time">{displayTime}</div>
                    {hasComment && (
                        <span className="calendar-comment-popover">
                            {comment}
                        </span>
                    )}
                </button>
            )}
        </td>
    );
};

export default CalendarCell;
