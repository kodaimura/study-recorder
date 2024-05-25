import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../atoms/Button';


const RecordMenu = () => {
    const navigate = useNavigate();

	return (
		<>
		<Button 
			className='btn-secondary btn-lg'
            onClick={() => navigate("/calendar")}>
		Calendar
		</Button>
		<Button 
			className='btn-success btn-lg'
			onClick={() => navigate("/edit")}>
		Edit
		</Button>
		<Button 
			className='btn-primary btn-lg'
			onClick={() => navigate("/graph")}>
		Graph
		</Button>
		</>
		);
}

export { RecordMenu };