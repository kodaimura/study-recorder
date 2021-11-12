import {useState,useEffect} from 'react';
import Button from '@mui/material/Button';
import {parseResponse} from '../../utils/utils';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';

import {apiDomain} from '../../utils/constants';


const requestRecord = () => {
  	return fetch(`${apiDomain}/records/record`, {
      	headers: {
        	"Content-Type": "application/json",
        	Authorization: `Bearer ${localStorage.token}`
      	}
  	})
  	.then(parseResponse)
  	.catch(console.error);
}


const getRecordState = () => {
  	return fetch(`${apiDomain}/records/state`, {
      	headers: {
        	"Content-Type": "application/json",
        	Authorization: `Bearer ${localStorage.token}`
      	}
  	})
  	.then(parseResponse)
  	.catch(console.error);
}


const RecordButton = () => {
	const [startTime, setStartTime ] = useState("");

	useEffect(() => {
    	getRecordState().then(data => {
      		if (data && data.startTime > data.stopTime) {
   				let startDate = new Date(data.startTime);
        		setStartTime(startDate.toLocaleDateString() + " " 
        			+ startDate.toLocaleTimeString() + "~");
      		}
   		 });
 	}, [])

	const record = () => {
		requestRecord().then(data => {
      		if (data && data.startTime) {
   				let startDate = new Date(data.startTime);
        		setStartTime(startDate.toLocaleDateString() + " " 
        			+ startDate.toLocaleTimeString() + "~");
      		}else {
      			setStartTime("");
      		}
   		 });
	}

	return (
		<div>
		<Button 
			variant="contained" 
			color="error" size="large" 
			onClick={() => record()} 
			endIcon={(startTime === "")? <PlayArrowIcon /> : <StopIcon />}
		>
      	Record
     	</Button>
     	&nbsp;&nbsp;&nbsp;{startTime}
     	</div> 
    )
}

export default RecordButton;