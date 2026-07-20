import React, { useEffect, useState } from 'react';
import { Container, Spinner, Form } from 'react-bootstrap';

import { Header, HeaderMenu } from 'components/common';
import { api } from 'apis/api';
import { getStoredTimeUnit, isTimeUnit, saveTimeUnit } from 'utils/timeUnit';

const SettingsPage: React.FC = () => {
    const [username, setUsername] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [timeUnit, setTimeUnit] = useState(getStoredTimeUnit);

    useEffect(() => {
        (async () => {
            try {
                const data = await api.get('account/profile');
                if (data && data.username) setUsername(data.username);
            } catch (err) {
                console.error('プロフィールの取得に失敗しました:', err);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    const handleTimeUnitChange = (value: string) => {
        if (!isTimeUnit(value)) return;
        setTimeUnit(value);
        saveTimeUnit(value);
    };

    if (loading) {
        return (
            <Container className='mt-5 text-center'>
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">読み込み中...</span>
                </Spinner>
            </Container>
        );
    }

    return (
        <>
            <Header rightContent={<HeaderMenu username={username || ''} />} />
            <Container className="app-main settings-page">
                <div className="settings-panel">
                    <h1>設定</h1>
                    <Form.Group>
                        <Form.Label>時間表示</Form.Label>
                        <div className="settings-radio-list">
                            <Form.Check
                                type="radio"
                                id="time-unit-hour"
                                name="timeUnit"
                                label="時間 [h] で表示"
                                checked={timeUnit === 'h'}
                                onChange={() => handleTimeUnitChange('h')}
                            />
                            <Form.Check
                                type="radio"
                                id="time-unit-minute"
                                name="timeUnit"
                                label="分 [m] で表示"
                                checked={timeUnit === 'm'}
                                onChange={() => handleTimeUnitChange('m')}
                            />
                        </div>
                    </Form.Group>
                </div>
            </Container>
        </>
    );
};

export default SettingsPage;
