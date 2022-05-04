import {useState, useEffect} from 'react';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import Input from '@mui/material/Input';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';

import {responseFilter} from '../../utils/utils';
import {apiurl} from '../../utils/constants';
import {Record} from '../../types/types';


const postRecord = (
	year: number,
	month: number,
	day: number,
	comment0: string | undefined,
	minuteTime0: string
) => {

	const comment: string = (comment0)? comment0 : ""; 
	const minuteTime: number = (minuteTime0)? parseInt(minuteTime0) : NaN; 

	if (Number.isNaN(minuteTime)){
		alert("Please enter an integer.");
	}
		
	return fetch(`${apiurl}/records`, {
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
	return fetch(`${apiurl}/records?year=${year}&month=${month}`, {
     	headers: {
      		"Content-Type": "application/json",
      		Authorization: `Bearer ${localStorage.token}`
    	}
    })
  	.then(responseFilter)
  	.catch(console.error);
}


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


const RecordsTable = (props:{
	year: number,
	month: number,
}) => {
	const year = props.year;
  	const month = props.month;
	const [data, setData] = useState(fillUpData(year, month, []));
	const [reload, setReload] = useState(1);
	const [target, setTarget] = useState(NaN);
	const [comment, setComment] = useState<string | undefined>("");
	const [minuteTime, setMinuteTime] = useState("")


	useEffect(() => {
		getRecords(year, month)
 	 	.then(data => setData(fillUpData(year, month, data)));

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
            	<TextField 
            		size="small"
            		type="number"
          			InputLabelProps={{
            			shrink: true,
          			}}
            		defaultValue={record.minuteTime} 
            		onChange={(e) => setMinuteTime(e.target.value)}
            	/> 
            	: record.minuteTime} 
            </TableCell>
            <TableCell>
            {(target === index)? 
            	<Input 
            		size="small"
            		placeholder="free comment"
            		fullWidth 
            		defaultValue={record.comment} 
            		onChange={(e) => setComment(e.target.value)}
            	/> 
            	: record.comment}
            </TableCell>
            <TableCell>
            {(target === index)? 
            	<Button 
            		size="small"
            		startIcon={<SaveIcon/>} 
            		onClick={() => {
            			postRecord(
            				year, 
          					month, 
            				record.day,
            				comment,
            				minuteTime
            			).then(response => {
            				setReload(reload * (-1));
         				});
        			}}>Save</Button> 
           		: ""}
            </TableCell>
            <TableCell>
           		<IconButton 
           			size="small"
           			onClick={() => {
           				if (target !== index) {
           					setTarget(index);
           					setMinuteTime(record.minuteTime.toString());
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

export default RecordsTable;