import { styled } from '@mui/material/styles';


const CalendarCell = (props: {
	day: number, 
	minuteTime: number,
	timeUnit: string,
}) => {
	const day = props.day;
	const minuteTime = props.minuteTime;
	const displayTime = (props.timeUnit === "m")? minuteTime 
	: Math.round(minuteTime / 60 * 100) / 100; 

	let color = "#FFF";

	if (minuteTime > 599) {
		color = "#FFFF00";
	}else  if (minuteTime > 539) {
		color = "#FFFF60";
	}else  if (minuteTime > 479) {
		color = "#FFFF90";
	}else  if (minuteTime > 419) {
		color = "#FFFFB0";
	}else  if (minuteTime > 359) {
		color = "#BBBBBB";
	}else if (minuteTime > 299) {
		color = "#CCCCCC";
	}else if (minuteTime > 239){
		color = "#DDDDDD";
	}else if (minuteTime > 179){
		color = "#E2E2E2";
	}else if (minuteTime > 119) {
		color = "#DC954E"
	}else if (minuteTime > 59) {
		color = "#E2AA72"
	}

	const DayCell = styled('div') ({
		height: "20px",
		fontSize: "1em",
	});

	const DataCell = styled('div') ({
		fontSize: "1.3em",
		height: "60px",
		lineHeight: "50px",
		textAlign: "center" as "center",
	});

	const Cell = styled('td') ({
		backgroundColor: color,
		width: "90px",
		height: "80px",
	})

	return (
		<Cell>
		{(day === 0)? "" :
		<>
		<DayCell>{day}</DayCell>
		<DataCell>{displayTime}</DataCell>
		</>}
		</Cell>);
}

export default CalendarCell;