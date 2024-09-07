import React, { useState, useEffect } from 'react';
import { Chart } from 'react-google-charts';
import { minuteToHour } from '../../../utils/utils';
import { Record } from '../../../types/types';
import { api } from '../../../apis/api';

const compareDate = (a: { year: number; month: number; day: number }, b: { year: number; month: number; day: number }): number => {
  if (a.year < b.year) return -1;
  if (a.year > b.year) return 1;
  if (a.month < b.month) return -1;
  if (a.month > b.month) return 1;
  return a.day < b.day ? -1 : 1;
};

const makeDataMonthly = (data: Record[]) => {
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
    total += d.minuteTime;
  }

  plotData.push([total]);
  return plotData;
};

const makeDataCumulative = (data: Record[]) => {
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
    total += d.minuteTime;
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
      labels.push(String(year) + '/' + String(month));
      year = d.year;
      month = d.month;
    }
  }

  labels.push(String(year) + '/' + String(month));
  return labels;
};

type Props = {
  timeUnit: string;
};

const GraphTotal: React.FC<Props> = ({ timeUnit }) => {
  const [data, setData] = useState<Record[]>([]);
  const [plotData, setPlotData] = useState<(string[] | [string, number, number])[]>([['Month', 'Monthly Time', 'Total Time']]);

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
    const dataMonthly = makeDataMonthly(data);
    const dataCumulative = makeDataCumulative(data);
    const labels = makeLabels(data);
  
    const finalData: [string, number, number][] = labels.map((label, index) => [
      label,
      dataMonthly[index] ? dataMonthly[index][0] : 0,
      dataCumulative[index] ? dataCumulative[index][0] : 0,
    ]);
  
    setPlotData([['Month', 'Monthly Time', 'Total Time'], ...finalData]);
  }, [data]);

  const options = {
    title: 'Total and Monthly Time',
    hAxis: { title: 'Month' },
    vAxis: { title: `Time (${timeUnit})` },
    seriesType: 'bars',
    series: { 1: { type: 'line' } },
  };

  return (
    <div className="bg-white">
      <div className="table-responsive">
        <table className="table table-sm">
          <thead>
            <tr>
              <th style={{ backgroundColor: 'black', color: 'white', fontSize: '20px' }}>
                Total: {timeUnit === 'm' ? total : minuteToHour(total)} [{timeUnit}]
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div style={{ position: 'relative', margin: 'auto', width: '95%' }}>
                  <Chart
                    chartType="ComboChart"
                    width="100%"
                    height="400px"
                    data={plotData}
                    options={options}
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

export default GraphTotal;
