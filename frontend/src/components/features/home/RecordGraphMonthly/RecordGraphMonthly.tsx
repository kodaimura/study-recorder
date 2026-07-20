import React, { useState, useEffect } from 'react';
import { Chart } from 'react-google-charts';

import { minuteToHour } from 'utils/utils';
import { MonthlyGoal, Record } from 'types/types';
import { api } from 'apis/api';

const compareDate = (
    a: { year: number, month: number, day: number },
    b: { year: number, month: number, day: number }
): number => {
    return a.year !== b.year ? a.year - b.year :
        a.month !== b.month ? a.month - b.month :
            a.day - b.day;
};

const toCumulative = (arr: number[]): number[] => {
    return arr.reduce((acc, val, idx) => {
        acc.push(val + (acc[idx - 1] || 0));
        return acc;
    }, [] as number[]);
};

const formatData = (records: Record[], timeUnit: string): { [key: string]: number[] } => {
    const data: { [key: string]: number[] } = {};
    let year = records.length ? records[0].year : 0;
    let month = year ? records[0].month : 0;
    let arr = Array(32).fill(0);

    records.forEach(d => {
        if (year !== d.year || month !== d.month) {
            data[`${year}/${month}`] = toCumulative(arr);
            year = d.year;
            month = d.month;
            arr = Array(32).fill(0);
        }
        arr[d.day] = timeUnit === "m" ? d.minuteTime : minuteToHour(d.minuteTime);
    });

    data[`${year}/${month}`] = toCumulative(arr);
    return data;
};

const transpose = (matrix: number[][]): number[][] => {
    if (!matrix.length) return [];

    const numColumns = matrix[0].length;
    return Array.from({ length: numColumns }, (_, i) =>
        matrix.map(row => row[i])
    );
};

const makePlotData = (records: Record[], timeUnit: string, year: number, month: number, targetMinuteTime: number): any[][] => {
    const data = formatData(records, timeUnit);
    const labels = Array.from({ length: 32 }, (_, i) => i);
    const values = transpose(Object.values(data));
    const keys = Object.keys(data);
    const targetValue = timeUnit === 'm' ? targetMinuteTime : minuteToHour(targetMinuteTime);

    if (targetMinuteTime <= 0) {
        return [['', ...keys], ...labels.map((label, index) => [label, ...values[index]])];
    }

    return [['', ...keys, '月目標'], ...labels.map((label, index) => [label, ...values[index], targetValue])];
};

const makePlotOptions = (plotData: any[][], timeUnit: string, year: number, month: number): any => {
    return {
        title: `${year}年${month}月`,
        hAxis: {
            minValue: 0,
            maxValue: 31,
        },
        vAxis: {
            title: `時間 ${timeUnit === 'm' ? '[ m ]' : '[ h ]'}`,
            gridlines: { color: 'transparent' },
        },
        legend: { position: 'bottom' },
        series: plotData[0].slice(1).map((ym: string) => ({
            color: ym === '月目標' ? '#198754' : ym === `${year}/${month}` ? '#FF0000' : '#0000FF',
            lineDashStyle: ym === '月目標' ? [6, 4] : undefined,
            visibleInLegend: ym === `${year}/${month}` || ym === '月目標'
        }))
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
                records.sort(compareDate);
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
        const pd = makePlotData(data, timeUnit, year, month, targetMinuteTime);
        setPlotData(pd);
        setPlotOptions(makePlotOptions(pd, timeUnit, year, month));
        setTotal(getTotal(data, year, month));
    }, [data, goal, timeUnit, year, month]);

    const targetMinuteTime = goal?.targetMinuteTime || 0;
    const progress = targetMinuteTime > 0 ? Math.min(999, Math.round(total / targetMinuteTime * 100)) : 0;
    const totalValue = timeUnit === 'm' ? total : minuteToHour(total);
    const targetValue = timeUnit === 'm' ? targetMinuteTime : minuteToHour(targetMinuteTime);

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
                chartType="LineChart"
                width="100%"
                height="450px"
                data={plotData}
                options={plotOptions}
            />
        </div>
    );
};

export { RecordGraphMonthly };
