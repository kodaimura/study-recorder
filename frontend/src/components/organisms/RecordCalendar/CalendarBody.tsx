import React from 'react';
import { Record } from '../../../types/types';
import { CalendarCell } from './CalendarCell';

type Props = {
    timeUnit: string;
    records: Record[][];
}

const CalendarBody: React.FC<Props> = (props) => (
    <tbody>
        {props.records.map((weekRecord, index) => (
            <tr key={index}>
                {weekRecord.map((record, i) => (
                    <CalendarCell key={i} day={record.day} minuteTime={record.minuteTime} timeUnit={props.timeUnit} />
                ))}
            </tr>
        ))}
    </tbody>
);

export { CalendarBody };
