import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Container, Spinner } from 'react-bootstrap';

import { Header, HeaderMenu } from 'components/common';
import { 
	RecordButton, 
	RecordCalendar, 
	RecordGraphMonthly, 
	RecordGraphTotal, 
	RecordEditor, 
	SelectDate 
} from 'components/features/home';

import { api } from 'apis/api';
import { logout } from 'apis/users.api';

const HomePage: React.FC = () => {
    const [username, setUsername] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const data = await api.get('account/profile');
                if (data && data.username) setUsername(data.username);
            } catch (err) {
                logout();
            } finally {
                setLoading(false);
            }
        })();
    }, []);

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
                <nav>
                    <div className="nav nav-tabs" id="nav-tab" role="tablist">
                        <Link to="/calendar" className='nav-link'>カレンダー</Link>
                        <Link to="/editor" className='nav-link'>編集</Link>
                        <Link to="/graph/monthly" className='nav-link'>月次グラフ</Link>
						<Link to="/graph/total" className='nav-link'>累計グラフ</Link>
                    </div>
                </nav>
                <SelectDate
                    year={year}
                    month={month}
                    setYear={setYear}
                    setMonth={setMonth}
                />
                <Routes>
                    <Route path="calendar" element={<RecordCalendar year={year} month={month} timeUnit={timeUnit} />} />
                    <Route path="editor" element={<RecordEditor year={year} month={month} />} />
                    <Route path="graph/monthly" element={<RecordGraphMonthly timeUnit={timeUnit} year={year} month={month} />} />
					<Route path="graph/total" element={<RecordGraphTotal timeUnit={timeUnit} />} />
                </Routes>
            </Container>
        </>
    );
};

export default HomePage;