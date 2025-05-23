import React, { useState, useEffect } from 'react';
import { Alert } from 'react-bootstrap';
import { Chart } from 'react-google-charts';

import { minuteToHour } from 'utils/utils';
import { Record } from 'types/types';
import { api } from 'apis/api';

const compareDate = (a: { year: number; month: number; day: number }, b: { year: number; month: number; day: number }): number => {
    if (a.year < b.year) return -1;
    if (a.year > b.year) return 1;
    if (a.month < b.month) return -1;
    if (a.month > b.month) return 1;
    return a.day < b.day ? -1 : 1;
};

const makeDataMonthly = (data: Record[], timeUnit: string) => {
    let plotData = [[0]];
    let year = data.length ? data[0].year : 0;
    let month = year ? data[0].month : 0;
    let total = 0;

    for (let d of data) {
        if (year !== d.year || month !== d.month) {
            plotData.push([total]);
            year = d.year;
            month = d.month;
            total = 0;
        }
        total += timeUnit === 'm' ? d.minuteTime : minuteToHour(d.minuteTime)
    }

    plotData.push([total]);
    return plotData;
};

const makeDataCumulative = (data: Record[], timeUnit: string) => {
    let plotData = [[0]];
    let year = data.length ? data[0].year : 0;
    let month = year ? data[0].month : 0;
    let total = 0;

    for (let d of data) {
        if (year !== d.year || month !== d.month) {
            plotData.push([total]);
            year = d.year;
            month = d.month;
        }
        total += timeUnit === 'm' ? d.minuteTime : minuteToHour(d.minuteTime)
    }

    plotData.push([total]);
    return plotData;
};

const makeLabels = (data: Record[]) => {
    let labels = [''];
    let year = data.length ? data[0].year : 0;
    let month = year ? data[0].month : 0;

    for (let d of data) {
        if (year !== d.year || month !== d.month) {
            labels.push(`${year}/${month}`);
            year = d.year;
            month = d.month;
        }
    }

    labels.push(`${year}/${month}`);
    return labels;
};

type Props = {
    timeUnit: string;
};

const RecordGraphTotal: React.FC<Props> = ({ timeUnit }) => {
    const [data, setData] = useState<Record[]>([]);
    const [plotData, setPlotData] = useState<(string[] | [string, number, number])[]>([['Month', 'Monthly Time', 'Total Time']]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        (async () => {
            try {
                const records = await api.get('records');
                setTotal(records.reduce((sum: number, row: Record) => sum + row.minuteTime, 0));
                records.sort(compareDate);
                setData(records);
            } catch (error) {
                console.error('Error fetching records:', error);
            }
        })();
    }, []);

    useEffect(() => {
        const dataMonthly = makeDataMonthly(data, timeUnit);
        const dataCumulative = makeDataCumulative(data, timeUnit);
        const labels = makeLabels(data);

        const finalData: [string, number, number][] = labels.map((label, index) => [
            label,
            dataMonthly[index] ? dataMonthly[index][0] : 0,
            dataCumulative[index] ? dataCumulative[index][0] : 0,
        ]);
        setPlotData([['', '月合計', '累計'], ...finalData]);
    }, [data, timeUnit]);

    const options = {
        title: '全期間',
        vAxis: { title: `時間 [ ${timeUnit} ]` },
        seriesType: 'bars',
        series: { 1: { type: 'line' } },
        legend: { position: 'bottom' },
    };

    return (
        <>
            <Alert variant="white" className='fs-5 pt-2 pb-2 mb-1'>
                累計： {timeUnit === 'm' ? total : minuteToHour(total)} [{timeUnit}]
            </Alert>
            <Chart
                chartType="ComboChart"
                width="100%"
                height="450px"
                data={plotData}
                options={options}
            />
        </>
    );
};

export { RecordGraphTotal };
