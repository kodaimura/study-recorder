import {useState,useEffect} from 'react';

import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import Input from '@mui/material/Input';

import {parseResponse} from '../../utils/utils';
import {apiDomain} from '../../utils/constants';


const getGoalForYear = (
	year: number,
) => {
	return fetch(`${apiDomain}/goals/year?year=${year}`, {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${localStorage.token}`
		}
	})
	.then(parseResponse)
	.catch(console.error);
}


const postGoalForYear = (
	year: number
) => {
	const goal = (document.getElementById("yearly-goal") as HTMLInputElement)?.value;
	return fetch(`${apiDomain}/goals/year`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${localStorage.token}`
		},
		body: JSON.stringify({
			year, goal
		})})
	.catch(console.error);
}


const GoalForYear = (props: {
	year: number
}) => {
	const year = props.year;
	const [goal, setGoal] = useState("");
	const [edit, setEdit] = useState(-1);
	const [reload, setReload] = useState(1);

	useEffect(() => {
		getGoalForYear(year)
		.then(data => {(data && data.length)? setGoal(data[0].goal) : setGoal("")});
	}, [year, reload]);

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
					postGoalForYear(year)
					.then(response => {
						setReload(reload * (-1)); 
						setEdit(edit * (-1));
					})
				}}
			>SAVE</Button>
			<Input fullWidth id="yearly-goal" defaultValue={goal} />
			</>}
			</>
			);
}

export default GoalForYear;