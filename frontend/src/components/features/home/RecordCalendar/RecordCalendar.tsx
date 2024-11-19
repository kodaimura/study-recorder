import React, { useState, useEffect } from 'react';
import { Table, Alert } from 'react-bootstrap';

import { Record } from 'types/types';
import { minuteToHour } from 'utils/utils';
import CalendarBody from './CalendarBody';
import CalendarHeader from './CalendarHeader';

import { api } from 'apis/api';

const compareDate = (a: { day: number }, b: { day: number }): number => (a.day < b.day ? -1 : 1);

const fillUpData = (year: number, month: number, data: Record[]): Record[] => {
    data.sort(compareDate);
    const lastDay = new Date(year, month, 0).getDate();
    const filledData = [];

    for (let i = 1; i <= lastDay; i++) {
        const dayRecord = data.find((record) => record.day === i);
        filledData.push(dayRecord || { year, month, day: i, minuteTime: 0, comment: '' });
    }
    return filledData;
};

const fillUpCalendarFirstWeek = (year: number, month: number, data: Record[]): Record[] => {
    const firstDayOfWeek = new Date(year, month - 1, 1).getDay();
    return [...Array(firstDayOfWeek).fill({ year, month, day: 0, minuteTime: 0, comment: '' }), ...data];
};

const splitArray = <T,>(array: T[], chunkSize: number): T[][] =>
    Array.from({ length: Math.ceil(array.length / chunkSize) }, (_, i) =>
        array.slice(i * chunkSize, (i + 1) * chunkSize)
    );

const makeCalendarData = (year: number, month: number, data: Record[]): Record[][] =>
    splitArray(fillUpCalendarFirstWeek(year, month, fillUpData(year, month, data)), 7);

type Props = {
    year: number;
    month: number;
    timeUnit: string;
};

const RecordCalendar: React.FC<Props> = (props) => {
    const [data, setData] = useState<Record[][]>([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const fetchRecords = async () => {
            try {
                const records = await api.get(`records?year=${props.year}&month=${props.month}`);
                if (records) {
                    setTotal(records.reduce((sum: number, record: Record) => sum + record.minuteTime, 0));
                    setData(makeCalendarData(props.year, props.month, records));
                } else {
                    setTotal(0);
                    setData([]);
                }
            } catch (error) {
                console.error('Error fetching records:', error);
                setTotal(0);
                setData([]);
            }
        };
        fetchRecords();
    }, [props.year, props.month]);

    return (
        <>
            <Alert variant="white" className='fs-5 pt-2 pb-2 mb-1'>
                合計： {props.timeUnit === 'm' ? total : minuteToHour(total)} [{props.timeUnit}]
            </Alert>
            <Table bordered hover responsive="sm">
                <CalendarHeader />
                <CalendarBody timeUnit={props.timeUnit} records={data} />
            </Table>
        </>
    );
};

export { RecordCalendar };
