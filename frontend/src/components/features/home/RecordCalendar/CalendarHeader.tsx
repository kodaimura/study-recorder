import React from 'react';

const DAYS_OF_WEEK = ['日', '月', '火', '水', '木', '金', '土'];

const CalendarHeader: React.FC = () => (
    <thead>
        <tr>
            {DAYS_OF_WEEK.map((day, index) => (
                <th className={`calendar-head-cell ${index === 0 ? 'sunday' : index === 6 ? 'saturday' : ''}`} key={index}>
                    {day}
                </th>
            ))}
        </tr>
    </thead>
);

export default CalendarHeader;
