import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';


const RecordMenu: React.FC = () => {
    const navigate = useNavigate();

	return (
		<>
		<Button 
			className='btn-secondary btn-lg'
            onClick={() => navigate("/calendar")}>
		カレンダー
		</Button>
		<Button 
			className='btn-success btn-lg'
			onClick={() => navigate("/edit")}>
		編集
		</Button>
		<Button 
			className='btn-primary btn-lg'
			onClick={() => navigate("/graph")}>
		グラフ
		</Button>
		</>
		);
}

export { RecordMenu };