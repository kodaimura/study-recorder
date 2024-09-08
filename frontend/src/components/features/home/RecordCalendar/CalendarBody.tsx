import React from 'react';

import { Record } from 'types/types';
import CalendarCell from './CalendarCell';

type Props = {
    timeUnit: string;
    records: Record[][];
}

const CalendarBody: React.FC<Props> = ({ timeUnit, records }) => (
    <tbody>
        {records.map((weekRecord, rowIndex) => (
            <tr key={rowIndex}>
                {weekRecord.map((record, cellIndex) => (
                    <CalendarCell
                        key={cellIndex}
                        day={record.day}
                        minuteTime={record.minuteTime}
                        timeUnit={timeUnit}
                    />
                ))}
            </tr>
        ))}
    </tbody>
);

export default CalendarBody;
