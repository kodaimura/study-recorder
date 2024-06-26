import React, {useState, useEffect} from 'react';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '../atoms/Button';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import Input from '../atoms/Input';
import { styled } from '@mui/material/styles';

import {Record} from '../../types/types';

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
			newData.push({year, month, day: i, minuteTime: 0, comment:""});
		}
	}
	return newData;
}


const CustomTableCell = styled(TableCell)({ 
	backgroundColor: "black",
    color: "white", 
})


const RecordTable = (props:{
	year: number,
	month: number,
}) => {
	const year = props.year;
  	const month = props.month;
	const [data, setData] = useState(fillUpData(year, month, []));
	const [reload, setReload] = useState(1);
	const [target, setTarget] = useState(NaN);
	const [comment, setComment] = useState("");
	const [minuteTime, setMinuteTime] = useState(0)


	useEffect(() => {
		(async () => {
			const data = await api.get(`records?year=${year}&month=${month}`);
 	 		setData(fillUpData(year, month, data));
		})();
  		setTarget(NaN);
	}, [year, month, reload]);


	return (
		<>
		<TableContainer component={Paper}>
		<Table size="small">
        <TableHead>
        <TableRow>
        	<CustomTableCell width="120px">Year/Month</CustomTableCell>
        	<CustomTableCell width="70px">Day</CustomTableCell>
        	<CustomTableCell width="90px">Time [m]</CustomTableCell>
        	<CustomTableCell>Comment</CustomTableCell>
        	<CustomTableCell width="70px"></CustomTableCell>
        	<CustomTableCell width="40px"></CustomTableCell>
        </TableRow>
        </TableHead>

        <TableBody>
        {data.map((record: Record, index: number) => (
        	<TableRow
            	key={index}
            	sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
            <TableCell>{record.year}/{record.month}</TableCell>
            <TableCell>{record.day}</TableCell>
            <TableCell>
            {(target === index)? 
            	<Input
                    type="number"
            		value={minuteTime} 
            		onChange={(e) => setMinuteTime(parseInt(e.target.value))}
            	/> 
            	: record.minuteTime} 
            </TableCell>
            <TableCell>
            {(target === index)? 
            	<Input 
            		placeholder="free comment"
            		value={comment} 
            		onChange={(e) => setComment(e.target.value)}
            	/> 
            	: record.comment}
            </TableCell>
            <TableCell>
            {(target === index)? 
            	<Button 
                    className='btn-sm'
            		onClick={() => {
						api.post('records', {
							year: year, 
          					month: month, 
            				day: record.day,
            				comment: comment,
            				minuteTime: Number.isNaN(minuteTime)? 0 : minuteTime,
						});
            			setReload(reload * (-1));
        			}}>Save</Button> 
           		: ""}
            </TableCell>
            <TableCell>
           		<IconButton 
           			size="small"
           			onClick={() => {
           				if (target !== index) {
           					setTarget(index);
           					setMinuteTime(record.minuteTime);
 	 						setComment(record.comment);
           				} else {
           					setTarget(NaN)
           				}
           			}}>
           			<EditIcon />
           		</IconButton>
            </TableCell>
            </TableRow>
        ))}
        </TableBody>

      	</Table>
    	</TableContainer>
		</>
	);
}

export { RecordTable };