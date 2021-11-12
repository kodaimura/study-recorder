import React, {useState,useEffect} from 'react';
import Button from '@mui/material/Button';
import CalendarViewMonthIcon from '@mui/icons-material/CalendarViewMonth';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import EditIcon from '@mui/icons-material/Edit';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { styled } from '@mui/material/styles';

import Header from '../organisms/Header';
import RecordButton from '../organisms/RecordButton';
import GoalForYear from '../organisms/GoalForYear';
import GoalForMonth from '../organisms/GoalForMonth';
import RecordsCalendar from '../organisms/RecordsCalendar'
import Graph from '../organisms/Graph'
import RecordsEditor from '../organisms/RecordsEditor'
import {parseResponse} from '../../utils/utils';
import {apiDomain} from '../../utils/constants';


const logout = () => {
	localStorage.removeItem("token");
	document.location.href = "/";
}

const getProfile = () => {
	return fetch(`${apiDomain}/profile`, {
		headers: {"Content-Type": "application/json",
		Authorization: `Bearer ${localStorage.token}`
	}})
	.then(parseResponse)
	.catch(console.error);
}


//mode: "calendar" | "graph" | "edit"
const Mypage = () => {
	const today = new Date();
	const [year, setYear] = useState(today.getFullYear());
	const [month, setMonth] = useState(today.getMonth()+1);
	const [mode, setMode] = useState("calendar");
	const [userName, setUserName] = useState("");

	useEffect(() => {
		getProfile().then(data => {
			data? setUserName(data.userName) : setUserName("");
		});
	}, [])

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


	const Content = styled('div') ({
		width:"70%", 
		margin: "0 auto",
		marginTop: "20px"
	})

	return (
		<div>
		<Header 
      		userName={userName} 
      		button={<Button variant="outlined" onClick={logout} >LOGOUT</Button>} 
    	/>
    	
		<Content>
		<RecordButton />
		<hr/>
		<h2>
		<Button 
			size="small" 
			endIcon={<ArrowBackIosNewIcon />} 
			onClick={() => setYear(year-1)} 
		/>
		{year}年
		<Button 
			size="small" 
			startIcon={<ArrowForwardIosIcon />}
			onClick={() => setYear(year+1)} 
		/>
		<Button 
			size="small" 
			endIcon={<ArrowBackIosNewIcon />}
			onClick={() => subMonth()} 
		/>
		{month}月
		<Button 
			size="small" 
			startIcon={<ArrowForwardIosIcon />}
			onClick={() => addMonth()} 
		/>
		</h2>
		<hr/>

		<h4>
		Yearly Goal:
		<GoalForYear year={year}/>
		</h4>
		<h4>
		Monthly Goal: 
		<GoalForMonth year={year} month={month}/>
		</h4>

		<div style={{paddingBottom: "20px"}}>
		<Button 
			variant="contained" 
			color="primary" 
			size="large" 
			onClick={() => setMode("graph")} startIcon={<ShowChartIcon />}
		>
		Graph
		</Button>
		<Button 
			variant="contained"　
			color="secondary" 
			size="large" 
			onClick={() => setMode("calendar")} startIcon={<CalendarViewMonthIcon />}
		>
		Calendar
		</Button>
		<Button 
			variant="contained" 
			color="success" 
			size="large" 
			onClick={() => setMode("edit")} startIcon={<EditIcon />}
		>
		Edit
		</Button>
		</div>

		{(mode === "calendar")? <RecordsCalendar year={year} month={month} />
			: (mode === "graph")? <Graph year={year} month={month} />
			: <RecordsEditor year={year} month={month} />}
		</Content>
		</div>
		);
}


export default Mypage;