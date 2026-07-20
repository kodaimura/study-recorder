import React, { useState, useEffect } from 'react';
import { Chart } from 'react-google-charts';

import { minuteToHour } from 'utils/utils';
import { MonthlyGoal, Record } from 'types/types';
import { api } from 'apis/api';

const toDisplayValue = (minuteTime: number, timeUnit: string): number => {
    return timeUnit === 'm' ? minuteTime : minuteToHour(minuteTime);
};

const makeDailyValues = (records: Record[], year: number, month: number): number[] => {
    const lastDay = new Date(year, month, 0).getDate();
    const dailyMinutes = Array(lastDay + 1).fill(0);

    records
        .filter((record) => record.year === year && record.month === month)
        .forEach((record) => {
            dailyMinutes[record.day] = record.minuteTime;
        });

    return dailyMinutes.slice(1);
};

const makeDailyCumulative = (dailyMinutes: number[]): number[] => {
    let total = 0;
    return dailyMinutes.map((minuteTime) => {
        total += minuteTime;
        return total;
    });
};

const makePlotData = (records: Record[], timeUnit: string, year: number, month: number, targetMinuteTime: number): any[][] => {
    const dailyMinutes = makeDailyValues(records, year, month);
    const cumulativeMinutes = makeDailyCumulative(dailyMinutes);
    const lastDay = cumulativeMinutes.length;
    const hasTarget = targetMinuteTime > 0;
    const header = hasTarget ? ['日', '日別', '累計', '目標ペース'] : ['日', '日別', '累計'];

    return [
        header,
        ...cumulativeMinutes.map((minuteTime, index) => {
            const day = index + 1;
            const dailyValue = toDisplayValue(dailyMinutes[index], timeUnit);
            const actualValue = toDisplayValue(minuteTime, timeUnit);
            if (!hasTarget) return [day, dailyValue, actualValue];

            const targetPaceMinute = Math.round(targetMinuteTime * day / lastDay);
            return [day, dailyValue, actualValue, toDisplayValue(targetPaceMinute, timeUnit)];
        }),
    ];
};

const makePlotOptions = (timeUnit: string, year: number, month: number): any => {
    return {
        title: `${year}年${month}月`,
        hAxis: {
            title: '日',
            minValue: 1,
            gridlines: { color: '#eef0f2' },
        },
        vAxis: {
            title: `時間 [ ${timeUnit} ]`,
            minValue: 0,
            gridlines: { color: '#eef0f2' },
        },
        legend: { position: 'bottom' },
        chartArea: { left: 56, top: 48, width: '82%', height: '68%' },
        seriesType: 'bars',
        series: {
            0: { type: 'bars', color: '#cfe6c8' },
            1: { type: 'line', color: '#1f5fbf', lineWidth: 3 },
            2: { type: 'line', color: '#198754', lineDashStyle: [6, 4], lineWidth: 2 },
        },
    };
};

const getTotal = (records: Record[], year: number, month: number): number => {
    return records
        .filter(row => row.year === year && row.month === month)
        .reduce((total, row) => total + row.minuteTime, 0);
};

type Props = {
    year: number;
    month: number;
    timeUnit: string;
    recordsVersion: number;
    goalsVersion: number;
};

const RecordGraphMonthly: React.FC<Props> = ({ year, month, timeUnit, recordsVersion, goalsVersion }) => {
    const [data, setData] = useState<Record[]>([]);
    const [goal, setGoal] = useState<MonthlyGoal | null>(null);
    const [plotData, setPlotData] = useState<any[][]>([]);
    const [plotOptions, setPlotOptions] = useState<any>({});
    const [total, setTotal] = useState(0);

    useEffect(() => {
        (async () => {
            try {
                const records = await api.get('records');
                setData(records);
            } catch (error) {
                console.error('Error fetching records:', error);
            }
        })();
    }, [recordsVersion]);

    useEffect(() => {
        (async () => {
            try {
                const monthlyGoal = await api.get(`goals/monthly?year=${year}&month=${month}`);
                setGoal(monthlyGoal);
            } catch (error) {
                console.error('Error fetching monthly goal:', error);
                setGoal(null);
            }
        })();
    }, [year, month, goalsVersion]);

    useEffect(() => {
        const targetMinuteTime = goal?.targetMinuteTime || 0;
        setPlotData(makePlotData(data, timeUnit, year, month, targetMinuteTime));
        setPlotOptions(makePlotOptions(timeUnit, year, month));
        setTotal(getTotal(data, year, month));
    }, [data, goal, timeUnit, year, month]);

    const targetMinuteTime = goal?.targetMinuteTime || 0;
    const progress = targetMinuteTime > 0 ? Math.min(999, Math.round(total / targetMinuteTime * 100)) : 0;
    const totalValue = toDisplayValue(total, timeUnit);
    const targetValue = toDisplayValue(targetMinuteTime, timeUnit);

    return (
        <div className="content-panel">
            <div className='summary-metrics'>
                <div className="summary-metric">
                    <span>合計</span>
                    <strong>{totalValue}<small>{timeUnit}</small></strong>
                </div>
                {targetMinuteTime > 0 && (
                    <>
                        <div className="summary-metric">
                            <span>目標</span>
                            <strong>{targetValue}<small>{timeUnit}</small></strong>
                        </div>
                        <div className="summary-metric">
                            <span>達成率</span>
                            <strong>{progress}<small>%</small></strong>
                        </div>
                    </>
                )}
            </div>
            <Chart
                chartType="ComboChart"
                width="100%"
                height="450px"
                data={plotData}
                options={plotOptions}
            />
        </div>
    );
};

export { RecordGraphMonthly };
