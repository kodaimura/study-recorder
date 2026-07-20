import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';

import { api } from 'apis/api';
import { formatLocalDateTime, formatLocalDateTimeISO } from 'utils/utils';

const formatElapsedTime = (startedAt: Date, now: Date): string => {
    const elapsedSeconds = Math.max(0, Math.floor((now.getTime() - startedAt.getTime()) / 1000));
    const hours = Math.floor(elapsedSeconds / 3600);
    const minutes = Math.floor((elapsedSeconds % 3600) / 60);
    const seconds = elapsedSeconds % 60;

    return [hours, minutes, seconds]
        .map((value) => String(value).padStart(2, '0'))
        .join(':');
};

type Props = {
    onRecorded?: () => void;
};

const RecordButton: React.FC<Props> = ({ onRecorded }) => {
    const [startedAt, setStartedAt] = useState<Date | null>(null);
    const [now, setNow] = useState(new Date());

    const record = async () => {
        try {
            const localeTime = formatLocalDateTimeISO(new Date());
            const data = await api.post('records/record', { localeTime });
            if (data && data.startedAt) {
                setStartedAt(new Date(data.startedAt));
                setNow(new Date());
            } else {
                setStartedAt(null);
                onRecorded?.();
            }
        } catch (error) {
            console.error("レコード処理中にエラーが発生しました:", error);
            setStartedAt(null);
        }
    }

    useEffect(() => {
        const fetchStartedAt = async () => {
            try {
                const data = await api.get('records/record/started_at');
                if (data && data.startedAt) {
                    setStartedAt(new Date(data.startedAt));
                }
            } catch (error) {
                console.error("開始時間の取得中にエラーが発生しました:", error);
            }
        };

        fetchStartedAt();
    }, []);

    useEffect(() => {
        if (!startedAt) return;

        const timerId = window.setInterval(() => {
            setNow(new Date());
        }, 1000);

        return () => window.clearInterval(timerId);
    }, [startedAt]);

    return (
        <>
            <Button
                variant="danger"
                onClick={record}
            >
                {startedAt === null ? <i className="bi bi-play me-2"></i> : <i className="bi bi-stop me-2"></i>}
                {startedAt === null ? "START" : "STOP"}
            </Button>
            {startedAt && (
                <span className="ms-3">
                    {formatLocalDateTime(startedAt)}~ / {formatElapsedTime(startedAt, now)}
                </span>
            )}
        </>
    );
}

export { RecordButton };
