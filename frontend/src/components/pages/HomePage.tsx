import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate, useParams } from 'react-router-dom';
import { Container, Spinner, Alert } from 'react-bootstrap';

import { Header, HeaderMenu } from 'components/common';
import { RecordButton, RecordCalendar, RecordGraph, RecordEditor, SelectDate } from 'components/features/home';

import { api } from 'apis/api';

type RouteParams = {
    year: string | undefined;
    month: string | undefined;
    mode: string | undefined;
};

const HomePage: React.FC = () => {
    const params = useParams<RouteParams>();
    const [username, setUsername] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            try {
                const data = await api.get('account/profile');
                if (data && data.username) setUsername(data.username);
            } catch (err) {
                setError('ユーザー情報の取得に失敗しました。');
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    const mode = params.mode ?? "calendar";
    const today = new Date();
    const [year, setYear] = useState(today.getFullYear());
    const [month, setMonth] = useState(today.getMonth() + 1);
    const [timeUnit, setTimeUnit] = useState("h");

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
            <Container>
                <RecordButton />
                <SelectDate
                    year={year}
                    month={month}
                    setYear={setYear}
                    setMonth={setMonth}
                />
                <nav>
                    <div className="nav nav-tabs" id="nav-tab" role="tablist">
                        <Link to="/calendar" className='nav-link'>カレンダー</Link>
                        <Link to="/editor" className='nav-link'>編集</Link>
                        <Link to="/graph" className='nav-link'>グラフ</Link>
                    </div>
                </nav>
                {error && <Alert variant="danger">{error}</Alert>}
                <Routes>
                    <Route path="calendar" element={<RecordCalendar year={year} month={month} timeUnit={timeUnit} />} />
                    <Route path="editor" element={<RecordEditor year={year} month={month} />} />
                    <Route path="graph" element={<RecordGraph year={year} month={month} timeUnit={timeUnit} />} />
                </Routes>
            </Container>
        </>
    );
};

export default HomePage;