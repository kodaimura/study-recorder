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
import { styled } from '@mui/material/styles';

import {
    getGoalForYear,
    getGoalForMonth,
    postGoalForYear,
    postGoalForMonth,
    
} from '../../apis/goals.api';

const CustomTableCell = styled(TableCell)({ 
    backgroundColor: "black",
    color: "white",
})


const GoalTable = (props:{
	year: number,
	month: number,
}) => {
	const year = props.year;
  	const month = props.month;
    const [goalForYear, setGoalForYear] = useState("");
	const [goalForMonth, setGoalForMonth] = useState("");
	const [target, setTarget] = useState("");


	useEffect(() => {
		getGoalForYear(year)
 	 	.then(data => {
            (data && data.length)? 
            setGoalForYear(data[0].goal) 
            : setGoalForYear("")
        });
        setTarget("");
    }, [year]);


    useEffect(() => {
        getGoalForMonth(year, month)
        .then(data => {
            (data && data.length)? 
            setGoalForMonth(data[0].goal) 
            : setGoalForMonth("")
        });

  		setTarget("");
	}, [year, month]);


	return (
		<>
		<TableContainer component={Paper}>
		<Table size="small">
        <TableHead>
        <TableRow>
            <CustomTableCell width="70px">Term</CustomTableCell>
            <CustomTableCell>Goal</CustomTableCell>
            <CustomTableCell width="70px"></CustomTableCell>
            <CustomTableCell width="40px"></CustomTableCell>
        </TableRow>
        </TableHead>

        <TableBody>
        <TableRow
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
            <TableCell>{year}</TableCell>
            <TableCell>
            {(target === "yearly")? 
            	<Input 
                    size="small"
            		placeholder="goal for year"
            		fullWidth 
            		defaultValue={goalForYear}
                    onChange={(e) => setGoalForYear(e.target.value)}
            	/> 
            	: goalForYear}
            </TableCell>
            <TableCell>
            {(target === "yearly")? 
                <Button 
                    size="small"
                    startIcon={<SaveIcon/>} 
                    onClick={() => {
                        postGoalForYear(
                            year, 
                            goalForYear
                        ).then(response => { 
                            setTarget("");
                        });
                    }}>Save</Button> 
                : ""}
            </TableCell>
            <TableCell>
            <IconButton
                size="small" 
                onClick={() => setTarget((target === "yearly")? "" : "yearly")} >
                <EditIcon />
            </IconButton>
            </TableCell>
        </TableRow>
        <TableRow
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
            <TableCell>{month}</TableCell>
            <TableCell>
            {(target === "monthly")? 
                <Input 
                    size="small"
                    placeholder="goal for Month"
                    fullWidth 
                    defaultValue={goalForMonth}
                    onChange={(e) => setGoalForMonth(e.target.value)}
                /> 
                : goalForMonth}
            </TableCell>
            <TableCell>
            {(target === "monthly")? 
                <Button 
                    size="small"
                    startIcon={<SaveIcon/>} 
                    onClick={() => {
                        postGoalForMonth(
                            year, 
                            month,
                            goalForMonth
                        ).then(response => {
                            setTarget("");
                        });
                    }}>Save</Button> 
                : ""}
            </TableCell>
            <TableCell>
            <IconButton 
                size="small"
                onClick={() => setTarget((target === "monthly")? "" : "monthly")} >
                <EditIcon />
            </IconButton>
            </TableCell>
        </TableRow>
        </TableBody>

      	</Table>
    	</TableContainer>
		</>
	);
}

export default GoalTable;