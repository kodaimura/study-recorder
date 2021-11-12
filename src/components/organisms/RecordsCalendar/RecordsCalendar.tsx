import {useState,useEffect} from 'react';

import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

import CalendarCell from './CalendarCell';
import {parseResponse} from '../../../utils/utils';
import {apiDomain} from '../../../utils/constants';
import {Record} from '../../../types/types';

const getRecords = (
	year: number,
	month: number,
) => {
	return fetch(`${apiDomain}/records?year=${year}&month=${month}`, {
		mode: 'cors',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.token}`
        }
    })
    .then(parseResponse)
    .catch(console.error);
}


const compareDate = (
	a: {day: number}, 
  	b: {day: number}
):number => {
  	return (a.day < b.day)? -1 : 1;
}

const fillUpDay = (
	year: number,
	month: number,
	data: Record[]
) => {
  	let newData = [];
  	data.sort(compareDate);
  	const lastDay = (new Date(year, month, 0)).getDate();

  	for (let i = 1; i <= lastDay; i++) {
    	if (data[0] && data[0].day === i) {
      		newData.push(data[0]);
      		data.shift();
  		}else {
      		newData.push({year, month, day: i, minuteTime: 0});
  		}
	}
	return newData;
}


const fillUpCalendarFirstWeek = (
	year: number,
 	month: number,
 	data: Record[]
) => {
	const firstDayOfWeek = (new Date(year, month - 1, 1)).getDay();

	for (let i = 0; i < firstDayOfWeek; i++) {
        data.unshift({year, month, day: 0, minuteTime: 0});
    }

    return data;
}


const splitArray = (
	array: any[], 
	x: number
) => {
	const size = Math.ceil(array.length / x);
	return [...new Array(size)].map((_, i: number) => array.slice(i * x, (i + 1) * x));
}


const makeCalendarData = (
	year: number,
  	month: number,
  	data: Record[]
) => {
	return splitArray(
			fillUpCalendarFirstWeek(year, month, fillUpDay(year, month, data)), 
			7);
}


const CalBody = (props: {
	timeUnit: string,
	records: Record[][]
}) => {
	const records = props.records;
	const timeUnit = props.timeUnit;

	return (
		<tbody>
		{records.map((
			weekRecord: {
				day: number, 
				minuteTime: number }[],
			index: number 
		) => 
     		<tr key={index}>
     		{weekRecord.map((
        		record: {
        			day: number, 
        			minuteTime: number
        		},
        		i: number,
        	) => 
     			<CalendarCell
     				key={i}
     				day={record.day} 
     				minuteTime={record.minuteTime} 
     				timeUnit={timeUnit} 
     			/>
     		)}
     		</tr>
    	)}
		</tbody>
	);
}


const RecordsCalendar = (props: {
	year: number, 
	month: number
}) => {
	const year = props.year;
    const month = props.month;
    const [data, setData] = useState([[{year: 0, month: 0, day:0, minuteTime:0}]]);
    const [timeUnit, setTimeUnit] = useState("m");

    const CalHead = styled('thead')({
        backgroundColor: "#000",
        color: "#FFF"
    });

  	useEffect(() => {
    	getRecords(year, month)
    	.then(records => {
    		records? setData(makeCalendarData(year, month, records)) : setData([]);
    	});
	}, [year, month]);

  	return (
     	<div>
      	<Button 
      		variant="outlined" 
      		size="large" 
      		onClick={()=> (timeUnit === "m")? setTimeUnit("h") : setTimeUnit("m")} 
      	>
      	{(timeUnit === "m")? "m → h" : "h → m"}
      	</Button>

      	<table width= "100%">
      	<CalHead>
      	<tr>
      	<th>Sun</th><th>Mon</th><th>Tue</th><th>Wed</th>
      	<th>Thu</th><th>Fri</th><th>Sat</th>
      	</tr>
      	</CalHead>
      	<CalBody timeUnit={timeUnit} records={data} />
      	</table>
      	</div>
     )
}

export default RecordsCalendar;