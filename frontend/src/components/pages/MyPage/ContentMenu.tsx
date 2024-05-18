import React from 'react';
import Button from '@mui/material/Button';
import CalendarViewMonthIcon from '@mui/icons-material/CalendarViewMonth';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import EditIcon from '@mui/icons-material/Edit';
import SchoolIcon from '@mui/icons-material/School';


//content: "calendar" | "graph" | "edit"
const ContentMenu = (props: {
	setContent: (content: string) => void
}) => {
	return (
		<>
		<Button 
			variant="contained"　
			color="secondary" 
			size="large" 
			onClick={() => props.setContent("calendar")} 
			startIcon={<CalendarViewMonthIcon />}>
		Calendar
		</Button>
		<Button 
			variant="contained" 
			color="success" 
			size="large" 
			onClick={() => props.setContent("edit")} 
			startIcon={<EditIcon />}>
		Edit
		</Button>
		<Button 
			variant="contained" 
			color="primary" 
			size="large" 
			onClick={() => props.setContent("graph")}
			startIcon={<ShowChartIcon />}>
		Graph
		</Button>
		</>
		);
}


export default ContentMenu;