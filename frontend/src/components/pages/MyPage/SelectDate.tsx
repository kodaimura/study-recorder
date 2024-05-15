import React, {useState} from 'react';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';


const SelectDate = (props: {
	year?: number,
	month?: number,
	setYear: (year: number) => void,
	setMonth: (month: number) => void,
}) => {
	const d = new Date();
	const [y, setY] = useState((props.year === undefined)? d.getFullYear() : props.year);
	const [m, setM] = useState((props.month === undefined)? d.getMonth()+1 : props.month);

	const addYear = () => {
		props.setYear(y + 1);
		setY(y + 1);
	}

	const subYear = () => {
		props.setYear(y - 1);
		setY(y - 1);
	}

	const addMonth = () => {
		if (props.month === 12) {
			props.setMonth(1);
			setM(1);
			props.setYear(y + 1);
			setY(y + 1);
		}else {
			props.setMonth(m + 1);
			setM(m + 1);
		}
	}

	const subMonth = () => {
		if (props.month === 1) {
			props.setMonth(12);
			setM(12);
			props.setYear(y - 1);
			setY(y - 1);
		}else {
			props.setMonth(m - 1);
			setM(m - 1);
		}
	}


	return (
		<>
		<ButtonGroup 
			color="inherit" 
			variant="contained" >
		<Button 
			endIcon={<ArrowBackIosNewIcon />}
			size="small"
			onClick={() => subYear()} >
		</Button>
		<Button>{y}</Button>
		<Button
			startIcon={<ArrowForwardIosIcon />} 
			size="small"
			onClick={() => addYear()} >
		</Button>
		</ButtonGroup>

		<ButtonGroup 
			color="inherit" 
			variant="contained" >
		<Button 
			endIcon={<ArrowBackIosNewIcon />}
			size="small"
			onClick={() => subMonth()} >
		
		</Button>
		<Button>{m}</Button>
		<Button 
			startIcon={<ArrowForwardIosIcon />}
			size="small"
			onClick={() => addMonth()} >
		</Button>
		</ButtonGroup>
		</>
		);
}


export default SelectDate ;