import {useState,useEffect} from 'react';
import {useHistory} from 'react-router';
import Button from '@mui/material/Button';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';

import {parseResponse} from '../../utils/utils';
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
	const history = useHistory();

	const record = () => {
		requestRecord()
		.then(data => {
      		if (data && data.startTime) {
   				let startDate = new Date(data.startTime);
        		setStartTime(startDate.toLocaleDateString() + " " 
        			+ startDate.toLocaleTimeString() + "~");
      		}else {
      			setStartTime("");
      			history.go(0);
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

export default RecordButton;