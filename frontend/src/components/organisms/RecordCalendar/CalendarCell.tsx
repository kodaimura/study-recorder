import React from 'react';

const CELL_WIDTH = '90px';
const CELL_HEIGHT = '80px';

const getCellColor = (minuteTime: number): string => {
    if (minuteTime > 599) return '#FFFF00';
    if (minuteTime > 539) return '#FFFF60';
    if (minuteTime > 479) return '#FFFF90';
    if (minuteTime > 419) return '#FFFFB0';
    if (minuteTime > 359) return '#BBBBBB';
    if (minuteTime > 299) return '#CCCCCC';
    if (minuteTime > 239) return '#DDDDDD';
    if (minuteTime > 179) return '#E2E2E2';
    if (minuteTime > 119) return '#DC954E';
    if (minuteTime > 59) return '#E2AA72';
    return '#FFF';
};


type Props = {
    day: number;
    minuteTime: number;
    timeUnit: string;
};

const CalendarCell: React.FC<Props> = (props) => {
    const displayTime = props.timeUnit === 'm' ? props.minuteTime : Math.round((props.minuteTime / 60) * 100) / 100;

    const cellStyle = {
        backgroundColor: getCellColor(props.minuteTime),
        width: CELL_WIDTH,
        height: CELL_HEIGHT,
        borderRight: '1px solid rgba(224, 224, 224, 1)',
        textAlign: 'center' as const,
        verticalAlign: 'middle' as const,
    };

    const dayCellStyle = {
        height: '20px',
        fontSize: '1em',
    };

    const dataCellStyle = {
        fontSize: '1.3em',
        height: '60px',
        lineHeight: '50px',
    };

    return (
        <td style={cellStyle}>
            {props.day !== 0 && (
                <>
                    <div style={dayCellStyle}>{props.day}</div>
                    <div style={dataCellStyle}>{displayTime}</div>
                </>
            )}
        </td>
    );
};

export { CalendarCell };
