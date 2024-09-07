import React, { useState, useEffect } from 'react';
import { Chart } from 'react-google-charts';
import { minuteToHour } from 'utils/utils';
import { Record } from 'types/types';
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

const makePlotData = (records: Record[], timeUnit: string, year: number, month: number): any[][] => {
    const data = formatData(records, timeUnit);
    const labels = Array.from({ length: 32 }, (_, i) => i);
    const values = transpose(Object.values(data));
    const keys = Object.keys(data);

    return [['', ...keys], ...labels.map((label, index) => [label, ...values[index]])];
};

const makePlotOptions = (plotData: any[][], timeUnit: string, year: number, month: number): any => {
    return {
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
            color: ym === `${year}/${month}` ? '#FF0000' : '#0000FF',
            visibleInLegend: ym === `${year}/${month}`
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
};

const RecordGraphMonthly: React.FC<Props> = ({ year, month, timeUnit }) => {
    const [data, setData] = useState<Record[]>([]);
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
    }, []);

    useEffect(() => {
        const pd = makePlotData(data, timeUnit, year, month);
        setPlotData(pd);
        setPlotOptions(makePlotOptions(pd, timeUnit, year, month));
        setTotal(getTotal(data, year, month));
    }, [data, timeUnit, year, month]);

    return (
        <div className="bg-white">
            <div className="table-responsive">
                <table className="table table-sm">
                    <thead>
                        <tr>
                            <th className="bg-dark text-white" style={{ fontSize: 20 }}>
                                {year}-{month} 合計： {
                                    timeUnit === "m" ? total :
                                    minuteToHour(total)}[{timeUnit}]
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <div style={{ position: "relative", margin: "auto", width: "95%" }}>
                                    <Chart
                                        chartType="LineChart"
                                        width="100%"
                                        height="400px"
                                        data={plotData}
                                        options={plotOptions}
                                    />
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export { RecordGraphMonthly };
