import React, {useState,useEffect} from 'react';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';

import { Record } from '../../types/types';
import { minuteToHour } from '../../utils/utils';

import { api } from '../../apis/api'


const compareDate = (
	a: {day: number}, 
  	b: {day: number}
):number => {
  	return (a.day < b.day)? -1 : 1;
}


const fillUpData = (
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
      		newData.push({year, month, day: i, minuteTime: 0, comment: ''});
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
        data.unshift({year, month, day: 0, minuteTime: 0, comment: ''});
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
		fillUpCalendarFirstWeek(year, month, fillUpData(year, month, data)), 
	7);
}


const CalendarCell = (props: {
	day: number, 
	minuteTime: number,
	timeUnit: string,
}) => {
	const day = props.day;
	const minuteTime = props.minuteTime;
	const displayTime = (props.timeUnit === "m")? minuteTime 
	: Math.round(minuteTime / 60 * 100) / 100; 

	let color = "#FFF";

	if (minuteTime > 599) {
		color = "#FFFF00";
	}else  if (minuteTime > 539) {
		color = "#FFFF60";
	}else  if (minuteTime > 479) {
		color = "#FFFF90";
	}else  if (minuteTime > 419) {
		color = "#FFFFB0";
	}else  if (minuteTime > 359) {
		color = "#BBBBBB";
	}else if (minuteTime > 299) {
		color = "#CCCCCC";
	}else if (minuteTime > 239){
		color = "#DDDDDD";
	}else if (minuteTime > 179){
		color = "#E2E2E2";
	}else if (minuteTime > 119) {
		color = "#DC954E"
	}else if (minuteTime > 59) {
		color = "#E2AA72"
	}

	const DayCell = styled('div') ({
		height: "20px",
		fontSize: "1em",
	});

	const DataCell = styled('div') ({
		fontSize: "1.3em",
		height: "60px",
		lineHeight: "50px",
		textAlign: "center" as "center",
	});

	const Cell = styled(TableCell) ({
		backgroundColor: color,
		width: "90px",
		height: "80px",
		borderRight: "1px solid rgba(224,224,224,1)"
	})

	return (
		<Cell>
		{(day === 0)? "" :
		<>
			<DayCell>{day}</DayCell>
			<DataCell>{displayTime}</DataCell>
		</>}
		</Cell>);
}


const CalendarBody = (props: {
	timeUnit: string,
	records: Record[][]
}) => {
	const records = props.records;
	const timeUnit = props.timeUnit;

	return (
		<TableBody>
		{records.map((
			weekRecord: {
				day: number, 
				minuteTime: number }[],
			index: number 
		) =>  (
     		<TableRow key={index}>
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
     		</TableRow>
    	))}
		</TableBody>
	);
}


const CustomTableCell = styled(TableCell) (props => ({ 
	backgroundColor: "black",
    color: "white",
    fontSize: "20px",
    borderLeft: "1px solid rgba(224, 224, 224, 1)"
}))

const RecordCalendar = (props: {
	year: number, 
	month: number,
	timeUnit: string
}) => {
	const year = props.year;
    const month = props.month;
    const timeUnit = props.timeUnit;
    const [data, setData] = useState([[{year: 0, month: 0, day:0, minuteTime:0, comment:''}]]);
    const [total, setTotal] = useState(0);


  	useEffect(() => {
		(async () => {
			const records = await api.get(`records?year=${year}&month=${month}`);
    		if (records) {
				setTotal(records.reduce((sum: number, row: Record) => sum + row.minuteTime, 0));
				setData(makeCalendarData(year, month, records));
			} else {
				setTotal(0);
				setData([]);
			}
		})();
	}, [year, month]);


  	return (
  		<>
      	<TableContainer component={Paper}>
		<Table size="small">
        <TableHead>
        <TableRow>
        <CustomTableCell colSpan={7}>
        Monthly Total: {
        	(timeUnit === "m")? total 
      		: minuteToHour(total)} [{timeUnit}]
      	</CustomTableCell>
        </TableRow>
        <TableRow>
        <CustomTableCell>Sun</CustomTableCell>
        <CustomTableCell>Mon</CustomTableCell>
        <CustomTableCell>Tue</CustomTableCell>
        <CustomTableCell>Wed</CustomTableCell>
        <CustomTableCell>Thu</CustomTableCell>
        <CustomTableCell>Fri</CustomTableCell>
        <CustomTableCell>Sat</CustomTableCell>
        </TableRow>
        </TableHead>

      	<CalendarBody timeUnit={timeUnit} records={data} />
      	</Table>
      	</TableContainer>
      	</>
     )
}

export { RecordCalendar };