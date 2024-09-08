import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Button } from 'react-bootstrap';

import { api } from 'apis/api';
import { formatLocalDateTime, formatLocalDateTimeISO } from 'utils/utils';

const RecordButton: React.FC = () => {
    const [startedAt, setStartedAt] = useState<string>("");
    const navigate = useNavigate();

    const record = async () => {
        try {
            const localeTime = formatLocalDateTimeISO(new Date());
            const data = await api.post('records/record', { localeTime });
            if (data && data.startedAt) {
                setStartedAt(formatLocalDateTime(new Date(data.startedAt)) + "~");
            } else {
                setStartedAt("");
                navigate(0);
            }
        } catch (error) {
            console.error("レコード処理中にエラーが発生しました:", error);
            setStartedAt("");
        }
    }

    useEffect(() => {
        const fetchStartedAt = async () => {
            try {
                const data = await api.get('records/record/started_at');
                if (data && data.startedAt) {
                    setStartedAt(formatLocalDateTime(new Date(data.startedAt)) + "~");
                }
            } catch (error) {
                console.error("開始時間の取得中にエラーが発生しました:", error);
            }
        };

        fetchStartedAt();
    }, [navigate]);

    return (
        <>
            <Button
                size="lg"
                variant="danger"
                onClick={record}
            >
                {startedAt === "" ? <i className="bi bi-play me-2"></i> : <i className="bi bi-stop me-2"></i>}
                {startedAt === "" ? "START" : "STOP"}
            </Button>
            &nbsp;&nbsp;&nbsp;{startedAt}
        </>
    );
}

export { RecordButton };
