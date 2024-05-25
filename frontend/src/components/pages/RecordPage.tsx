import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import Grid from "@mui/material/Grid";
import Button from '@mui/material/Button';

import { RecordTemplate } from '../templates/RecordTemplate';
import {
	ThemeTable,
	RecordCalendar,
	RecordGraph,
	RecordTable,
	SelectDate
} from '../organisms';

type RouteParams = {
    year: string | undefined;
    month: string | undefined;
    mode: string | undefined;
}

export const RecordPage = () => {
    const params = useParams<RouteParams>();
    const mode: string = params.mode?? "calendar";

	const today = new Date();
	const [year, setYear] = useState(today.getFullYear());
	const [month, setMonth] = useState(today.getMonth()+1);
	const [timeUnit, setTimeUnit] = useState("h");

	const Content = () => {
		if (mode === "calendar") {
			return <RecordCalendar year={year} month={month} timeUnit={timeUnit}/>;
		} else if (params.mode === "graph") {
			return <RecordGraph year={year} month={month} timeUnit={timeUnit}/>;
		} else {
			return (
				<>
				<ThemeTable year={year} month={month} /><br/>
				<RecordTable year={year} month={month} />
				</>
			)
		}
	}

	return (
		<RecordTemplate>
			<Grid container>
				<Grid item xs={9}>
					<SelectDate 
						year={year} 
						month={month} 
						setYear={setYear}
						setMonth={setMonth}
					/>
				</Grid>
				<Grid item xs= {3}>
					<Button 
						variant="outlined" 
						size="large" 
						onClick={()=> setTimeUnit((timeUnit === "m")? "h" : "m")} 
					>
					{(timeUnit === "m")? "m → h" : "h → m"}
					</Button>
				</Grid>
			</Grid>
            <Content/>
        </RecordTemplate>
	);
}
