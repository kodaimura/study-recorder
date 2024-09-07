import React, { useState, useEffect } from 'react';
import { Chart } from 'react-google-charts';
import { minuteToHour } from '../../../utils/utils';
import { Record } from '../../../types/types';
import { api } from '../../../apis/api';

const compareDate = (
    a: { year: number, month: number, day: number }, 
    b: { year: number, month: number, day: number }
): number => {
    if (a.year < b.year) return -1;
    if (a.year > b.year) return 1;
    if (a.month < b.month) return -1;
    if (a.month > b.month) return 1;
    return (a.day < b.day) ? -1 : 1;
};

const toCumulative = (arr: number[]) => {
    for (let i = 1; i < arr.length; i++) {
        arr[i] += arr[i - 1];
    }
    return arr;
};

const formatData = (records: Record[], timeUnit: string) => {
    let data: { [key: string]: number[] } = {};
    let year = records.length ? records[0].year : 0;
    let month = year ? records[0].month : 0;

    let arr = Array(32).fill(0);

    for (let d of records) {
        if (year !== d.year || month !== d.month) {
            data[`${year}/${month}`] = toCumulative(arr);
            year = d.year;
            month = d.month;
            arr = Array(32).fill(0);
        }
        arr[d.day] = (timeUnit === "m") ? d.minuteTime : minuteToHour(d.minuteTime);
    }

    data[`${year}/${month}`] = toCumulative(arr);
    return data;
};

const transpose = (matrix: number[][]): number[][] => {
    if (matrix.length === 0) return [];

    const numRows = matrix.length;
    const numColumns = matrix[0].length;

    const result: number[][] = [];
    for (let i = 0; i < numColumns; i++) {
        const row: number[] = [];
        for (let j = 0; j < numRows; j++) {
            row.push(matrix[j][i]);
        }
        result.push(row);
    }

    return result;
};

const makePlotData = (records: Record[], timeUnit: string, year: number, month: number): any => {
    const data = formatData(records, timeUnit);
    const labels = Array.from({ length: 32 }, (_, i) => i);
    const values = transpose(Object.values(data));
    const keys = Object.keys(data);
    return [['', ...keys], ...labels.map((label, index) => [label, ...values[index]])];
};

const makePlotOptions = (plotData: any, timeUnit: string, year: number, month: number): any => {
    let options = {
        hAxis: {
            minValue: 0,
            maxValue: 31,
        },
        vAxis: {
            title: `時間 ${timeUnit === 'm' ? '[ m ]' : '[ h ]'}`,
            gridlines: { color: 'transparent' },
        },
        legend: { position: 'bottom' },
        series: plotData[0].slice(1).map((ym: string) => {
            if (ym === `${year}/${month}`) {
                return { color: '#FF0000', visibleInLegend: true };
            } else {
                return { color: '#0000FF', visibleInLegend: false };
            }
        })
    }

    return options;
};

const getTotal = (records: Record[], year: number, month: number): number => {
    records = records.filter((row: Record) => {
        return row['year'] == year && row['month'] == month;
    })
    let total = 0;
    for (let row of records) {
        total += row['minuteTime'];
    }

    return total;
};

type Props = {
    year: number,
    month: number,
    timeUnit: string
};

const GraphMonthly: React.FC<Props> = (props) => {
    const { timeUnit, year, month } = props;
    const [data, setData] = useState<Record[]>([]);
    const [plotData, setPlotData] = useState<any[][]>([]);
    const [plotOptions, setPlotOptions] = useState<any>({});
    const [total, setTotal] = useState(0);

    useEffect(() => {
        (async () => {
            const records = await api.get('records');
            records.sort(compareDate);
            setData(records);
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

export default GraphMonthly;
