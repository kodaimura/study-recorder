import React, {useState, useEffect} from 'react';
import { styled } from '@mui/material/styles';

import Header from '../../layouts/Header';
import RecordButton from '../../organisms/RecordButton';
import GoalTable from '../../organisms/GoalTable';
import RecordCalendar from '../../organisms/RecordCalendar';
import Graph from '../../organisms/Graph';
import RecordTable from '../../organisms/RecordTable';
import SkillTables from '../../organisms/SkillTables';
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

	useEffect(() => {
		getProfile()
		.then(data => {
			if (data && data.username) setUsername(data.username);
		});
	}, [])


	const Content = () => {
		if (mode === "calendar") {
			return <RecordCalendar year={year} month={month} />;
		}else if (mode === "graph") {
			return <Graph year={year} month={month} />;
		}else if (mode === "skill") {
			return <SkillTables />;
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
		<ContentMenu setContent={setMode} />
		<hr/>
		<RightBox>
		<SelectDate 
			year={year} 
			month={month} 
			setYear={setYear}
			setMonth={setMonth}
		/>
		</RightBox>
		<Content />
		</Box>
		</>
		);
}
