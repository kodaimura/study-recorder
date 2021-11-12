import {useState,useEffect} from 'react';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import Input from '@mui/material/Input';
import { styled } from '@mui/material/styles';

import {parseResponse} from '../../utils/utils';
import {apiDomain} from '../../utils/constants';
import {Record} from '../../types/types';


const postRecord = (
	year: number,
	month: number,
	day: number
) => {
	const comment = (document.getElementById("comment") as HTMLInputElement)?.value;
	const mt = (document.getElementById("minuteTime") as HTMLInputElement)?.value;
	const minuteTime: number = parseInt(mt); 

	if (Number.isNaN(minuteTime)){
		alert("Please enter an integer.");
	}
		
	return fetch(`${apiDomain}/records`, {
     	method: "POST",
      	headers: {
      		"Content-Type": "application/json",
      		Authorization: `Bearer ${localStorage.token}`
      	},
      	body: JSON.stringify({year, month, day, minuteTime, comment})
    }).catch(console.error);
}


const getRecords = (
	year: number,
	month: number,
) => {
	return fetch(`${apiDomain}/records?year=${year}&month=${month}`, {
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
			newData.push({year, month, day: i, minuteTime: 0, comment:""});
		}
	}
	return newData;
}


const RecordsEditor = (props:{
	year: number,
	month: number,
}) => {
	const year = props.year;
  	const month = props.month;
	const [filledData, setFilledData] = useState(fillUpDay(year, month, []));
	const [reload, setReload] = useState(1);
	const [target, setTarget] = useState(0);

	useEffect(() => {
		getRecords(year, month)
 	 	.then(data => setFilledData(fillUpDay(year, month, data)));

  		setTarget(0);
	}, [year, month, reload]);

	const CustomCell = styled(TableCell) (props => ({
		width: props.width,
	}))

	return (
		<div>
		<TableContainer component={Paper}>
		<Table sx={{ minWidth: 500 }} aria-label="simple table">
        <TableHead>
        <TableRow>
        <CustomCell width="70px"></CustomCell>
        <CustomCell width="120px">Year/Month</CustomCell>
        <CustomCell width="70px">Day</CustomCell>
        <CustomCell width="70px"></CustomCell>
        <CustomCell width="90px">Time [m]</CustomCell>
        <CustomCell>Comment</CustomCell>
        </TableRow>
        </TableHead>

        <TableBody>
        {filledData.map((record: Record) => (
        	<TableRow
            	key={record.day}
            	sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
            <TableCell component="th" scope="row">
           		<Button 
              		startIcon={<EditIcon />} 
              		onClick={() => setTarget(record.day)}
            	/>
            </TableCell>
            <TableCell>{record.year}/{record.month}</TableCell>
            <TableCell>{record.day}</TableCell>
            <TableCell>
            {(target === record.day)? 
            	<Button 
            		startIcon={<SaveIcon/>} 
            		onClick={() => {
            			postRecord(year, month, record.day)
            			.then(response => {
            				setReload(reload * (-1));
            			});
            		}}>Save</Button> 
           		: ""}
            </TableCell>
            <TableCell>
            {(target === record.day)? 
            	<Input 
            		id="minuteTime" 
            		defaultValue={record.minuteTime} 
            	/> 
            	: record.minuteTime} 
            </TableCell>
            <TableCell>
            {(target === record.day)? 
            	<Input 
            		placeholder="free comment"
            		id="comment" 
            		fullWidth 
            		defaultValue={record.comment} 
            	/> 
            	: record.comment}
            </TableCell>
            </TableRow>
        ))}
        </TableBody>

      	</Table>
    	</TableContainer>
		</div>
	);
}

export default RecordsEditor;