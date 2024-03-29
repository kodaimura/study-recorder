import React, {useState, useEffect} from 'react';
import { styled } from '@mui/material/styles';
import Grid from "@mui/material/Grid";
import Button from '@mui/material/Button';

import Header from '../../layouts/Header';

import {
	RecordButton,
	GoalTable,
	RecordCalendar,
	Graph,
	RecordTable,
	Skills
} from '../../organisms'
import HeaderMenu from '../../shared/HeaderMenu';

import ContentMenu from './ContentMenu';
import SelectDate from './SelectDate';

import {getProfile} from '../../../apis/users.api';


const Box = styled('div') ({
	width:"90%", 
	margin: "0 auto",
	marginTop: "20px"
})

const RightBox = styled('div') ({
	width:"100%", 
	textAlign:"right"
})


export const MyPage = () => {
	const today = new Date();
	const [year, setYear] = useState(today.getFullYear());
	const [month, setMonth] = useState(today.getMonth()+1);
	const [mode, setMode] = useState("calendar");
	const [username, setUsername] = useState("");
	const [timeUnit, setTimeUnit] = useState("h");

	useEffect(() => {
		getProfile()
		.then(data => {
			if (data && data.username) setUsername(data.username);
		});
	}, [])


	const Content = () => {
		if (mode === "calendar") {
			return <RecordCalendar year={year} month={month} timeUnit={timeUnit}/>;
		}else if (mode === "graph") {
			return <Graph year={year} month={month} timeUnit={timeUnit}/>;
		}else if (mode === "skill") {
			return <Skills />;
		}else {
			return (
				<>
				<GoalTable year={year} month={month} /><br/>
				<RecordTable year={year} month={month} />
				</>
			)
		}
	}

	return (
		<>
		<Header rightContent={<HeaderMenu username={username}/>} />
		<Box>
		<RecordButton />
		<hr />
		<Grid container>
			<Grid item xs={6}>
				<ContentMenu setContent={setMode} />
			</Grid>
			<Grid item xs= {6}>
				<Button 
					variant="outlined" 
					size="large" 
					onClick={()=> (timeUnit === "m")? setTimeUnit("h") : setTimeUnit("m")} 
				>
				{(timeUnit === "m")? "m → h" : "h → m"}
				</Button>
			</Grid>
		</Grid>

		<hr/>
		
		<RightBox>
		{(mode === "graph" || mode === "skill")? "" :
		<SelectDate 
			year={year} 
			month={month} 
			setYear={setYear}
			setMonth={setMonth}
		/>
		}
		</RightBox>
		<Content />
		</Box>
		</>
		);
}
