import React, {useState} from 'react';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import CalendarViewMonthIcon from '@mui/icons-material/CalendarViewMonth';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import EditIcon from '@mui/icons-material/Edit';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import SchoolIcon from '@mui/icons-material/School';
import { styled } from '@mui/material/styles';

import Header from '../parts/Header';
import RecordButton from '../organisms/RecordButton';
import GoalTable from '../organisms/GoalTable';
import RecordsCalendar from '../organisms/RecordsCalendar';
import Graph from '../organisms/Graph';
import RecordsTable from '../organisms/RecordsTable';
import SkillTables from '../organisms/SkillTables';
import HeaderMenu from '../organisms/HeaderMenu';


//mode: "calendar" | "graph" | "edit"
const MyPage = () => {
	const today = new Date();
	const [year, setYear] = useState(today.getFullYear());
	const [month, setMonth] = useState(today.getMonth()+1);
	const [mode, setMode] = useState("calendar");


	const addMonth = () => {
		if (month === 12) {
			setMonth(1);
			setYear(year + 1);
		}else {
			setMonth(month + 1);
		}
	}

	const subMonth = () => {
		if (month === 1) {
			setMonth(12);
			setYear(year - 1);
		}else {
			setMonth(month - 1);
		}
	}

	const Box = styled('div') ({
		width:"90%", 
		margin: "0 auto",
		marginTop: "20px"
	})

	const RightBox = styled('div') ({
		width:"100%", 
		textAlign:"right"
	})

	const Content = () => {
		if (mode === "calendar") {
			return <RecordsCalendar year={year} month={month} />;
		}else if (mode === "graph") {
			return <Graph year={year} month={month} />;
		}else if (mode === "skill") {
			return <SkillTables />;
		}else {
			return (<>
				<GoalTable year={year} month={month} /><br/>
				<RecordsTable year={year} month={month} /></>)
		}
	}

	return (
		<>
		<Header 
      		rightContent={<HeaderMenu />} />
		<Box>
		<RecordButton />
		<hr/>
		<Button 
			variant="contained"　
			color="secondary" 
			size="large" 
			onClick={() => setMode("calendar")} 
			startIcon={<CalendarViewMonthIcon />}>
		Calendar
		</Button>
		<Button 
			variant="contained" 
			color="primary" 
			size="large" 
			onClick={() => setMode("graph")}
			startIcon={<ShowChartIcon />}>
		Graph
		</Button>
		<Button 
			variant="contained" 
			color="success" 
			size="large" 
			onClick={() => setMode("edit")} 
			startIcon={<EditIcon />}>
		Edit & TABLE
		</Button>
		<Button 
			variant="contained" 
			color="warning" 
			size="large" 
			onClick={() => setMode("skill")} 
			startIcon={<SchoolIcon />}>
		Skill
		</Button>
		<hr/>

		<RightBox>
		<ButtonGroup 
			color="inherit" 
			variant="contained" >

		<Button 
			endIcon={<ArrowBackIosNewIcon />}
			size="small"
			onClick={() => setYear(year-1)} >
		</Button>

		<Button>{year}</Button>
		
		<Button
			startIcon={<ArrowForwardIosIcon />} 
			size="small"
			onClick={() => setYear(year+1)} >
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

		<Button>{month}</Button>
		
		<Button 
			startIcon={<ArrowForwardIosIcon />}
			size="small"
			onClick={() => addMonth()} >
		</Button>

		</ButtonGroup>
		</RightBox>
		<Content />

		</Box>
		</>
		);
}


export default MyPage;