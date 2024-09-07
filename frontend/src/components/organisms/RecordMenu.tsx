import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const RecordMenu: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="d-flex flex-column align-items-center">
            <Button 
                className='btn-secondary btn-lg mb-3'
                onClick={() => navigate("/calendar")}
                aria-label="カレンダーへ移動"
            >
                カレンダー
            </Button>
            <Button 
                className='btn-success btn-lg mb-3'
                onClick={() => navigate("/edit")}
                aria-label="編集ページへ移動"
            >
                編集
            </Button>
            <Button 
                className='btn-primary btn-lg'
                onClick={() => navigate("/graph")}
                aria-label="グラフページへ移動"
            >
                グラフ
            </Button>
        </div>
    );
}

export { RecordMenu };
