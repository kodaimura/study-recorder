import React from 'react';

import { Record } from 'types/types';

const getCellBackground = (minuteTime: number): string => {
    if (minuteTime <= 0) return '#fff';
    if (minuteTime < 60) return '#fbf1e5';
    if (minuteTime < 120) return '#f1d3b5';
    if (minuteTime < 180) return '#e4b07a';
    if (minuteTime < 240) return '#f3f5f7';
    if (minuteTime < 300) return '#dde2e7';
    if (minuteTime < 360) return '#c8ced6';
    if (minuteTime < 480) return '#fff3b8';
    if (minuteTime < 600) return '#f3d56b';
    return '#e5bf3d';
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
            style={{ background: getCellBackground(minuteTime) }}
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
