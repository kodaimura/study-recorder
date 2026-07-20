import React from 'react';

import { Record } from 'types/types';
import CalendarCell from './CalendarCell';

type Props = {
    timeUnit: string;
    records: Record[][];
    onEditRecord: (record: Record) => void;
}

const CalendarBody: React.FC<Props> = ({ timeUnit, records, onEditRecord }) => (
    <tbody>
        {records.map((weekRecord, rowIndex) => (
            <tr key={rowIndex}>
                {weekRecord.map((record, cellIndex) => (
                    <CalendarCell
                        key={cellIndex}
                        record={record}
                        timeUnit={timeUnit}
                        onEdit={onEditRecord}
                    />
                ))}
            </tr>
        ))}
    </tbody>
);

export default CalendarBody;
