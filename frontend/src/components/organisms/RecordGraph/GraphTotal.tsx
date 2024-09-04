import React, { useState, useEffect } from 'react';
import { Chart } from 'react-chartjs-2';
import { minuteToHour } from '../../../utils/utils';
import { Record } from '../../../types/types';
import { api } from '../../../apis/api';


const compareDate = (a: { year: number, month: number, day: number }, b: { year: number, month: number, day: number }): number => {
    if (a.year < b.year) return -1;
    if (a.year > b.year) return 1;
    if (a.month < b.month) return -1;
    if (a.month > b.month) return 1;
    return (a.day < b.day) ? -1 : 1;
}

const makeDataMonthly = (data: Record[]) => {
    let plotData = [0];
    let year = (data.length) ? data[0].year : 0;
    let month = (year) ? data[0].month : 0;
    let total = 0;

    for (let d of data) {
        if (year !== d.year || month !== d.month) {
            plotData.push(total);
            year = d.year;
            month = d.month;
            total = 0;
        }
        total += d.minuteTime;
    }

    plotData.push(total);

    return plotData;
}

const makeDataCumulative = (data: Record[]) => {
    let plotData = [0];
    let year = (data.length) ? data[0].year : 0;
    let month = (year) ? data[0].month : 0;
    let total = 0;

    for (let d of data) {
        if (year !== d.year || month !== d.month) {
            plotData.push(total);
            year = d.year;
            month = d.month;
        }
        total += d.minuteTime;
    }

    plotData.push(total);

    return plotData;
}

const makeLabels = (data: Record[]) => {
    let labels = [""];
    let year = (data.length) ? data[0].year : 0;
    let month = (year) ? data[0].month : 0;

    for (let d of data) {
        if (year !== d.year || month !== d.month) {
            labels.push(String(year) + "/" + String(month));
            year = d.year;
            month = d.month;
        }
    }

    labels.push(String(year) + "/" + String(month));

    return labels;
}

const makeDatasets = (dataMonthly: number[], dataCumulative: number[]) => {
    return [{
        label: "Total Time",
        type: 'line' as any,
        data: dataCumulative,
        backgroundColor: 'rgba(255, 80, 100, 0.4)',
        borderColor: 'rgb(255, 80, 100)',
        borderWidth: 5,
    }, {
        label: "Monthly Time",
        type: 'bar' as any,
        data: dataMonthly,
        backgroundColor: 'rgba(0, 204, 255, 0.4)',
        borderColor: 'rgb(0, 204, 255)',
        borderWidth: 5,
    }];
}

const makePlotData = (
    dataMonthly: number[],
    dataCumulative: number[],
    labels: string[],
    timeUnit: string
) => {
    if (timeUnit === "h") {
        dataMonthly = dataMonthly.map(minuteToHour);
        dataCumulative = dataCumulative.map(minuteToHour);
    }

    return {
        labels: labels,
        datasets: makeDatasets(dataMonthly, dataCumulative)
    };
}

const makePlotOptions = (stepSize: number) => {
    return {
        scales: {
            y: {
                grid: {
                    color: "rgba(0, 0, 255, 0.2)",
                    zeroLineColor: "black"
                },
                ticks: {
                    stepSize: stepSize,
                    color: "blue",
                }
            }
        }
    };
}

type Props = {
    timeUnit: string
}

const GraphTotal: React.FC<Props> = (props) => {
    const timeUnit = props.timeUnit;
    const [data, setData] = useState([]);
    const [dataMonthly, setDataMonthly] = useState(makeDataMonthly([]));
    const [dataCumulative, setDataCumulative] = useState(makeDataCumulative([]));
    const [labels, setLabels] = useState(makeLabels([]));
    const [plotData, setPlotData] = useState(makePlotData([], [], [], timeUnit));
    const [plotOptions, setPlotOptions] = useState(makePlotOptions(6000));
    const [total, setTotal] = useState(0);

    useEffect(() => {
        (async () => {
            const records = await api.get('records');
            setTotal(records.reduce((sum: number, row: Record) => sum + row.minuteTime, 0));
            records.sort(compareDate);
            setData(records);
        })();
    }, []);

    useEffect(() => {
        setDataMonthly(makeDataMonthly(data));
        setDataCumulative(makeDataCumulative(data));
        setLabels(makeLabels(data));
    }, [data]);

    useEffect(() => {
        setPlotData(makePlotData(dataMonthly, dataCumulative, labels, timeUnit));
    }, [dataMonthly, dataCumulative, labels, timeUnit]);

    useEffect(() => {
        setPlotOptions(makePlotOptions((timeUnit === "m") ? 6000 : 100));
    }, [timeUnit]);

    return (
        <div className="bg-white">
            <div className="table-responsive">
                <table className="table table-sm">
                <thead>
                    <tr>
                        <th style={{ backgroundColor: "black", color: "white", fontSize: "20px" }}>
                            Total: {(timeUnit === "m") ? total : minuteToHour(total)}[{timeUnit}]
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <div style={{ position: "relative", margin: "auto", width: "95%" }}>
                                <Chart type='line' data={plotData} options={plotOptions} />
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        </div>
    );
}

export default GraphTotal;
