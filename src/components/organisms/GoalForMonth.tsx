import React, {useState,useEffect} from 'react';

import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import Input from '@mui/material/Input';

import {parseResponse} from '../../utils/utils';
import {apiDomain} from '../../utils/constants';


const getGoalForMonth = (
	year: number,
	month: number,
	) => {
	return fetch(`${apiDomain}/goals/month?year=${year}&month=${month}`, {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${localStorage.token}`
		}
	})
	.then(parseResponse)
	.catch(console.error);
}


const postGoalForMonth = (
	year: number,
	month: number,
	) => {
	const goal = (document.getElementById("monthly-goal") as HTMLInputElement)?.value;
	return fetch(`${apiDomain}/goals/month`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${localStorage.token}`
		},
		body: JSON.stringify({
			year, month, goal
		})})
	.catch(console.error);
}


const GoalForMonth = (props: {
	year: number,
	month: number
}) => {
	const year = props.year;
	const month = props.month;
	const [goal, setGoal] = useState("");
	const [edit, setEdit] = useState(-1);
	const [reload, setReload] = useState(1);

	useEffect(() => {
		getGoalForMonth(year, month)
		.then(data => {(data && data.length)? setGoal(data[0].goal) : setGoal("")})
	}, [year, month, reload]);

	return (
		<>
		<Button 
			startIcon={<EditIcon />} 
			onClick={() => {setEdit(edit * (-1))}} 
		/>
		{(edit === -1)? goal:
			<>
			<Button 
				startIcon={<SaveIcon/>} 
				onClick={() => {
					postGoalForMonth(year, month)
					.then(response => {
						setReload(reload * (-1)); 
						setEdit(edit * (-1));
					});
				}}
			>
			SAVE
			</Button>
			<Input fullWidth id="monthly-goal" defaultValue={goal} />
			</>
		}
		</>
		);
}

export default GoalForMonth;