import {useState,useEffect} from 'react';
import {useNavigate} from 'react-router';
import Button from '@mui/material/Button';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';

import {
	requestRecord,
	getRecordState
} from '../../../apis/records.api';


export const RecordButton = () => {
	const [startTime, setStartTime ] = useState("");
	const navigate = useNavigate();

	const record = () => {
		requestRecord()
		.then(data => {
      		if (data && data.startTime) {
   				let startDate = new Date(data.startTime);
        		setStartTime(startDate.toLocaleDateString() + " " 
        			+ startDate.toLocaleTimeString() + "~");
      		}else {
      			setStartTime("");
      			navigate(0);
      		}
   		 });
	}

	useEffect(() => {
    	getRecordState().then(data => {
      		if (data && data.startTime > data.stopTime) {
   				let startDate = new Date(data.startTime);
        		setStartTime(startDate.toLocaleDateString() + " " 
        			+ startDate.toLocaleTimeString() + "~");
      		}
   		 });
 	}, [])


	return (
		<>
		<Button 
			variant="contained" 
			color="error" size="large" 
			onClick={() => record()} 
			endIcon={(startTime === "")? <PlayArrowIcon /> : <StopIcon />}
		>
      	Record
     	</Button>
     	&nbsp;&nbsp;&nbsp;{startTime}
     	</> 
    )
}