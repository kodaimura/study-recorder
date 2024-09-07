import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Button } from 'react-bootstrap';
import { api } from '../../apis/api';

const RecordButton: React.FC = () => {
    const [startTime, setStartTime] = useState<string>("");
    const navigate = useNavigate();

    const record = async () => {
        try {
            const data = await api.post('records/record', {});
            if (data && data.startTime !== 0) {
                const startDate = new Date(data.startTime);
                setStartTime(startDate.toLocaleDateString() + " " + startDate.toLocaleTimeString() + "~");
            } else {
                setStartTime("");
                navigate(0);
            }
        } catch (error) {
            console.error("レコード処理中にエラーが発生しました:", error);
            setStartTime("");
        }
    }

    useEffect(() => {
        const fetchStartTime = async () => {
            try {
                const data = await api.get('records/record/start_time');
                if (data && data.startTime !== 0) {
                    const startDate = new Date(data.startTime);
                    setStartTime(startDate.toLocaleDateString() + " " + startDate.toLocaleTimeString() + "~");
                }
            } catch (error) {
                console.error("開始時間の取得中にエラーが発生しました:", error);
            }
        };

        fetchStartTime();
    }, [navigate]);

    return (
        <>
            <Button
                className='btn-danger btn-lg'
                onClick={record}
            >
                {startTime === "" ? "START" : "STOP"}
            </Button>
            &nbsp;&nbsp;&nbsp;{startTime}
        </>
    );
}

export { RecordButton };
