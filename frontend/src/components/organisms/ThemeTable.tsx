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

import { api } from '../../apis/api';

const CustomTableCell = styled(TableCell)({ 
    backgroundColor: "black",
    color: "white",
})


const ThemeTable = (props:{
	year: number,
	month: number,
}) => {
	const year = props.year;
  	const month = props.month;
    const [themeForYear, setThemeForYear] = useState("");
	const [themeForMonth, setThemeForMonth] = useState("");
	const [target, setTarget] = useState("");


	useEffect(() => {
        (async () => {
            const data = await api.get(`themes?year=${year}&month=0`);
            setThemeForYear((data && data.length)? data[0].theme : "");
        })();
        setTarget("");
    }, [year]);


    useEffect(() => {
        (async () => {
            const data = await api.get(`themes?year=${year}&month=${month}`);
            setThemeForMonth((data && data.length)? data[0].theme : "");
        })();
  		setTarget("");
	}, [year, month]);


	return (
		<>
		<TableContainer component={Paper}>
		<Table size="small">
        <TableHead>
        <TableRow>
            <CustomTableCell width="70px">Term</CustomTableCell>
            <CustomTableCell>Theme</CustomTableCell>
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
            		placeholder="theme for year"
            		value={themeForYear}
                    onChange={(e) => setThemeForYear(e.target.value)}
            	/> 
            	: themeForYear}
            </TableCell>
            <TableCell>
            {(target === "yearly")? 
                <Button 
                    className='btn-sm'
                    onClick={() => {
                        api.post('themes', {
                            year: year,
                            month: 0,
                            theme: themeForYear
                        });
                        setTarget("");
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
                    placeholder="theme for Month"
                    value={themeForMonth}
                    onChange={(e) => setThemeForMonth(e.target.value)}
                /> 
                : themeForMonth}
            </TableCell>
            <TableCell>
            {(target === "monthly")? 
                <Button 
                    className='btn-sm'
                    onClick={() => {
                        api.post('themes', {
                            year: year,
                            month: month,
                            theme: themeForMonth
                        });
                        setTarget("");
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

export { ThemeTable };