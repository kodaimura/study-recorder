import React, { useState, useEffect } from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import { Container, Spinner, Dropdown } from 'react-bootstrap';

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

    const selectTimeUnit = (eventKey: string | null) => {
        if (eventKey) {
            setTimeUnit(eventKey);
        }
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
            <Container>
                <div className="row justify-content-between align-items-center">
                    <div className="col-auto">
                        <RecordButton />
                    </div>
                    <div className="col-auto">
                        <Dropdown onSelect={selectTimeUnit}>
                            <Dropdown.Toggle variant="light">
                                {timeUnit}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item eventKey="h">[h]表示</Dropdown.Item>
                                <Dropdown.Item eventKey="m">[m]表示</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </div>

                <nav>
                    <div className="nav nav-tabs mt-2" role="tablist">
                        <NavLink to="/calendar" className='nav-link'>
                            <i className="bi bi-calendar me-2"></i> カレンダー
                        </NavLink>
                        <NavLink to="/editor" className='nav-link'>
                            <i className="bi bi-pencil-square me-2"></i> 編集
                        </NavLink>
                        <NavLink to="/graph/monthly" className='nav-link'>
                            <i className="bi bi-graph-up me-2"></i> 月次グラフ
                        </NavLink>
                        <NavLink to="/graph/total" className='nav-link'>
                            <i className="bi bi-bar-chart-line me-2"></i> 累計グラフ
                        </NavLink>
                    </div>
                </nav>
                <div className='mt-2 mb-2'>
                    <SelectDate
                        year={year}
                        month={month}
                        setYear={setYear}
                        setMonth={setMonth}
                    />
                </div>
                <Routes>
                    <Route path="" element={<RecordCalendar year={year} month={month} timeUnit={timeUnit} />} />
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