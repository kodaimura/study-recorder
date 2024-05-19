import React, {useState,useEffect} from 'react';
import {useNavigate} from 'react-router';
import Button from '@mui/material/Button';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';

import {
	requestRecord,
	getRecordStartTime
} from '../../../apis/records.api';


export const RecordButton = () => {
	const [startTime, setStartTime ] = useState("");
	const navigate = useNavigate();

	const record = () => {
		requestRecord()
		.then(data => {
      		if (data && data.startTime !== 0) {
   				let startDate = new Date(data.startTime);
        		setStartTime(startDate.toLocaleDateString() + " " 
        			+ startDate.toLocaleTimeString() + "~");
      		} else {
      			setStartTime("");
      			navigate(0);
      		}
   		 });
	}

	useEffect(() => {
    	getRecordStartTime().then(data => {
      		if (data && data.startTime !== 0) {
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