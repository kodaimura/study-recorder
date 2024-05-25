import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from '../atoms/Button';

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
			<div className='d-flex justify-content-between'>
				<div>
					<SelectDate 
						year={year} 
						month={month} 
						setYear={setYear}
						setMonth={setMonth}
					/>
				</div>
				<div>
					<Button 
						className='btn-outline-secondary'
						onClick={()=> setTimeUnit((timeUnit === "m")? "h" : "m")} 
					>
					{(timeUnit === "m")? "m → h" : "h → m"}
					</Button>
				</div>
			</div>
            <Content/>
        </RecordTemplate>
	);
}
