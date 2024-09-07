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

const toCumulative = (ls: number[]) => {
    for (let i = 2; i < 32; i++) {
        ls[i] = ls[i - 1] + ls[i];
    }
    return ls;
};

const makeData = async (data: Record[]) => {
    let plotData: number[][] = [];
    let year = (data.length) ? data[0].year : 0;
    let month = (year) ? data[0].month : 0;

    let arr = await Array(32).fill(0);

    for (let d of data) {
        if (year !== d.year || month !== d.month) {
            plotData.push(toCumulative(arr));
            year = d.year;
            month = d.month;
            arr = await Array(32).fill(0);
        }
        arr[d.day] = d.minuteTime;
    }

    arr[0] = 1; // to differentiate months
    plotData.push(toCumulative(arr));

    return plotData;
};

const makePlotData = (data: number[][], timeUnit: string, year: number, month: number) => {
    const labels = [
        "Day", "Monthly Time", "Total Time"
    ];

    let formattedData = data.map((d, idx) => {
        return [
            idx.toString(),
            timeUnit === 'h' ? minuteToHour(d[idx]) : d[idx],
            timeUnit === 'h' ? minuteToHour(d[d.length - 1]) : d[d.length - 1]
        ];
    });

    // Add labels to the beginning
    return [labels, ...formattedData];
};

type Props = {
    timeUnit: string
};

const GraphMonthly: React.FC<Props> = (props) => {
    const timeUnit = props.timeUnit;
    const [data, setData] = useState([] as any[]);
    const [dataMonthly, setDataMonthly] = useState([[]] as any[][]);
    const [plotData, setPlotData] = useState([] as any[]);
    const [total, setTotal] = useState(0);
    const [year, setYear] = useState(0);
    const [month, setMonth] = useState(0);

    useEffect(() => {
        (async () => {
            const records = await api.get('records');
            records.sort(compareDate);
            setData(records);
        })();
    }, []);

    useEffect(() => {
        makeData(data).then(d => {
            setDataMonthly(d);
        });

        if (data.length !== 0) {
            setMonth(data.slice(-1)[0].month);
            setYear(data.slice(-1)[0].year);
        }
    }, [data]);

    useEffect(() => {
        setTotal(dataMonthly.slice(-1)[0].slice(-1)[0]);
    }, [dataMonthly]);

    useEffect(() => {
        setPlotData(makePlotData(dataMonthly, timeUnit, year, month));
    }, [dataMonthly, timeUnit, year, month]);

    return (
        <div className="bg-white">
            <div className="table-responsive">
                <table className="table table-sm">
                    <thead>
                        <tr>
                            <th className="bg-dark text-white" style={{ fontSize: 20 }}>
                                {year}-{month} Total: {
                                    (timeUnit === "m") ? total :
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
                                        options={{
                                            hAxis: {
                                                title: 'Day',
                                            },
                                            vAxis: {
                                                title: `Time (${timeUnit === 'm' ? 'Minutes' : 'Hours'})`,
                                                gridlines: { color: 'transparent' },
                                            },
                                            legend: { position: 'bottom' },
                                            series: {
                                                1: { curveType: 'function' }
                                            }
                                        }}
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
