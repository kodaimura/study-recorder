import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';

import { MonthlyGoal, Record } from 'types/types';
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
    recordsVersion: number;
    goalsVersion: number;
    themesVersion: number;
};

const RecordCalendar: React.FC<Props> = (props) => {
    const [data, setData] = useState<Record[][]>([]);
    const [total, setTotal] = useState(0);
    const [goal, setGoal] = useState<MonthlyGoal | null>(null);
    const [theme, setTheme] = useState('');

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
    }, [props.year, props.month, props.recordsVersion]);

    useEffect(() => {
        const fetchGoal = async () => {
            try {
                const monthlyGoal = await api.get(`goals/monthly?year=${props.year}&month=${props.month}`);
                setGoal(monthlyGoal);
            } catch (error) {
                console.error('Error fetching monthly goal:', error);
                setGoal(null);
            }
        };
        fetchGoal();
    }, [props.year, props.month, props.goalsVersion]);

    useEffect(() => {
        const fetchTheme = async () => {
            try {
                const themes = await api.get(`themes?year=${props.year}&month=${props.month}`);
                setTheme((themes && themes.length) ? themes[0].theme : '');
            } catch (error) {
                console.error('Error fetching monthly theme:', error);
                setTheme('');
            }
        };
        fetchTheme();
    }, [props.year, props.month, props.themesVersion]);

    const targetMinuteTime = goal?.targetMinuteTime || 0;
    const progress = targetMinuteTime > 0 ? Math.min(999, Math.round(total / targetMinuteTime * 100)) : 0;
    const totalValue = props.timeUnit === 'm' ? total : minuteToHour(total);
    const targetValue = props.timeUnit === 'm' ? targetMinuteTime : minuteToHour(targetMinuteTime);

    return (
        <div className="content-panel">
            <div className='summary-metrics'>
                <div className="summary-metric">
                    <span>合計</span>
                    <strong>{totalValue}<small>{props.timeUnit}</small></strong>
                </div>
                {targetMinuteTime > 0 && (
                    <>
                        <div className="summary-metric">
                            <span>目標</span>
                            <strong>{targetValue}<small>{props.timeUnit}</small></strong>
                        </div>
                        <div className="summary-metric">
                            <span>達成率</span>
                            <strong>{progress}<small>%</small></strong>
                        </div>
                    </>
                )}
                {theme && (
                    <div className="summary-theme">
                        <span>テーマ</span>
                        <strong>{theme}</strong>
                    </div>
                )}
            </div>
            <Table responsive="sm" className="calendar-table">
                <CalendarHeader />
                <CalendarBody timeUnit={props.timeUnit} records={data} />
            </Table>
        </div>
    );
};

export { RecordCalendar };
