import React from 'react';

const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const CalendarHeader: React.FC = () => (
    <thead>
        <tr>
            {DAYS_OF_WEEK.map((day, index) => (
                <th key={index} style={{ backgroundColor: 'black', color: 'white', padding: '10px' }}>
                    {day}
                </th>
            ))}
        </tr>
    </thead>
);

export { CalendarHeader };
