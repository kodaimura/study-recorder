import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import CalendarViewMonthIcon from '@mui/icons-material/CalendarViewMonth';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import EditIcon from '@mui/icons-material/Edit';
import SchoolIcon from '@mui/icons-material/School';


const RecordMenu = () => {
    const navigate = useNavigate();

	return (
		<>
		<Button 
			variant="contained"
			color="secondary" 
			size="large" 
            onClick={() => navigate("/records/calendar")}
			startIcon={<CalendarViewMonthIcon />}>
		Calendar
		</Button>
		<Button 
			variant="contained" 
			color="success" 
			size="large" 
			onClick={() => navigate("/records/edit")} 
			startIcon={<EditIcon />}>
		Edit
		</Button>
		<Button 
			variant="contained" 
			color="primary" 
			size="large" 
			onClick={() => navigate("/records/graph")}
			startIcon={<ShowChartIcon />}>
		Graph
		</Button>
		</>
		);
}

export { RecordMenu };