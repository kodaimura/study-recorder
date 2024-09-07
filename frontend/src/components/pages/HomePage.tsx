import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate, useParams } from 'react-router-dom';
import Container from '../layouts/Container';
import Header from '../layouts/Header';
import { RecordButton } from '../organisms'
import HeaderMenu from '../molecules/HeaderMenu';

import { api } from '../../apis/api';

import {
	RecordCalendar,
	RecordGraph,
	RecordEditor,
	SelectDate
} from '../organisms';

type RouteParams = {
    year: string | undefined;
    month: string | undefined;
    mode: string | undefined;
}

export const HomePage: React.FC = () => {
    const params = useParams<RouteParams>();
	const [username, setUsername] = useState("");
	const navigate = useNavigate();

	useEffect(() => {
		(async () => {
			const data = await api.get('account/profile');
			if (data && data.username) setUsername(data.username);
		})();
	}, []);
    const mode: string = params.mode?? "calendar";

	const today = new Date();
	const [year, setYear] = useState(today.getFullYear());
	const [month, setMonth] = useState(today.getMonth()+1);
	const [timeUnit, setTimeUnit] = useState("h");

	return (
		<>
		<Header rightContent={<HeaderMenu username={username}/>} />
        <Container>
		<RecordButton />
		<SelectDate 
			year={year} 
			month={month} 
			setYear={setYear}
			setMonth={setMonth}
		/>
		<nav>
			<div className="nav nav-tabs" id="nav-tab" role="tablist">
				<Link to="/calendar" className='nav-link'>カレンダー</Link>
				<Link to="/editor" className='nav-link'>編集</Link>
				<Link to="/graph" className='nav-link'>グラフ</Link>
  			</div>
		</nav>
      <Routes>
        <Route path="calendar" element={<RecordCalendar year={year} month={month} timeUnit={timeUnit}/>} />
		<Route path="editor" element={<RecordEditor year={year} month={month} />} />
        <Route path="graph" element={<RecordGraph year={year} month={month} timeUnit={timeUnit}/>} />
      </Routes>

		</Container>
		</>
	);
}
