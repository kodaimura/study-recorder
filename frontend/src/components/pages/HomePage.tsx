import React, { useState, useEffect } from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import { Container, Spinner } from 'react-bootstrap';

import { Header, HeaderMenu } from 'components/common';
import {
    RecordButton,
    RecordCalendar,
    RecordGraphMonthly,
    RecordGraphTotal,
    SelectDate
} from 'components/features/home';

import { api } from 'apis/api';
import { getStoredTimeUnit, isTimeUnit, TIME_UNIT_STORAGE_KEY, TimeUnit } from 'utils/timeUnit';

const HomePage: React.FC = () => {
    const [username, setUsername] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [recordsVersion, setRecordsVersion] = useState(0);
    const [goalsVersion, setGoalsVersion] = useState(0);
    const [themesVersion, setThemesVersion] = useState(0);

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

    const today = new Date();
    const [year, setYear] = useState(today.getFullYear());
    const [month, setMonth] = useState(today.getMonth() + 1);
    const [timeUnit, setTimeUnit] = useState<TimeUnit>(getStoredTimeUnit);

    useEffect(() => {
        const handleStorageChange = (event: StorageEvent) => {
            if (event.key !== TIME_UNIT_STORAGE_KEY) return;
            if (isTimeUnit(event.newValue)) setTimeUnit(event.newValue);
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    const refreshRecords = () => {
        setRecordsVersion((version) => version + 1);
    };

    const refreshGoals = () => {
        setGoalsVersion((version) => version + 1);
    };

    const refreshThemes = () => {
        setThemesVersion((version) => version + 1);
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
            <Container className="app-main">
                <div className="home-toolbar">
                    <div className="col-auto">
                        <RecordButton onRecorded={refreshRecords} />
                    </div>
                </div>

                <div className="date-selector-wrap">
                    <SelectDate
                        year={year}
                        month={month}
                        setYear={setYear}
                        setMonth={setMonth}
                    />
                </div>

                <nav className="home-nav">
                    <div className="nav nav-tabs" role="tablist">
                        <NavLink to="/calendar" className='nav-link'>
                            <i className="bi bi-calendar me-2"></i> カレンダー
                        </NavLink>
                        <NavLink to="/graph/monthly" className='nav-link'>
                            <i className="bi bi-graph-up me-2"></i> 月次グラフ
                        </NavLink>
                        <NavLink to="/graph/total" className='nav-link'>
                            <i className="bi bi-bar-chart-line me-2"></i> 累計グラフ
                        </NavLink>
                    </div>
                </nav>
                <Routes>
                    <Route path="" element={<RecordCalendar year={year} month={month} timeUnit={timeUnit} recordsVersion={recordsVersion} goalsVersion={goalsVersion} themesVersion={themesVersion} />} />
                    <Route path="calendar" element={<RecordCalendar year={year} month={month} timeUnit={timeUnit} recordsVersion={recordsVersion} goalsVersion={goalsVersion} themesVersion={themesVersion} />} />
                    <Route path="graph/monthly" element={<RecordGraphMonthly timeUnit={timeUnit} year={year} month={month} recordsVersion={recordsVersion} goalsVersion={goalsVersion} />} />
                    <Route path="graph/total" element={<RecordGraphTotal timeUnit={timeUnit} recordsVersion={recordsVersion} />} />
                </Routes>
            </Container>
        </>
    );
};

export default HomePage;
