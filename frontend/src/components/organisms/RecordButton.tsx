import React, {useState,useEffect} from 'react';
import {useNavigate} from 'react-router';
import Button from '../atoms/Button';

import { api } from '../../apis/api';


const RecordButton: React.FC = () => {
	const [startTime, setStartTime ] = useState("");
	const navigate = useNavigate();

	const record = async () => {
		const data = await api.post('records/record', {});
		if (data && data.startTime !== 0) {
			let startDate = new Date(data.startTime);
			setStartTime(startDate.toLocaleDateString() + " " + startDate.toLocaleTimeString() + "~");
		} else {
		   setStartTime("");
		   navigate(0);
		}
	}

	useEffect(() => {
		(async () => {
			const data = await api.get('records/record/start_time');
			if (data && data.startTime !== 0) {
				let startDate = new Date(data.startTime);
				setStartTime(startDate.toLocaleDateString() + " " + startDate.toLocaleTimeString() + "~");
			}
		})();
 	}, [])


	return (
		<>
		<Button 
            className='btn-danger btn-lg'
			onClick={() => record()} 
		>
      	{startTime == "" ? "START" : "STOP" }
     	</Button>
     	&nbsp;&nbsp;&nbsp;{startTime}
     	</> 
    )
}

export { RecordButton };