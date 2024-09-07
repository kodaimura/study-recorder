import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { api } from '../../../apis/api';

type Props = {
    year: number,
    month: number,
}

const ThemeTable: React.FC<Props> = (props) => {
    const year = props.year;
    const month = props.month;
    const [themeForYear, setThemeForYear] = useState("");
    const [themeForMonth, setThemeForMonth] = useState("");
    const [target, setTarget] = useState("");

    useEffect(() => {
        (async () => {
            const data = await api.get(`themes?year=${year}&month=0`);
            setThemeForYear((data && data.length) ? data[0].theme : "");
        })();
        setTarget("");
    }, [year]);

    useEffect(() => {
        (async () => {
            const data = await api.get(`themes?year=${year}&month=${month}`);
            setThemeForMonth((data && data.length) ? data[0].theme : "");
        })();
        setTarget("");
    }, [year, month]);
    return (
        <div className="mt-4">
            <table className="table table-sm">
                <thead>
                    <tr>
                        <th className="bg-dark text-white" style={{ width: "70px" }}>期間</th>
                        <th className="bg-dark text-white">テーマ</th>
                        <th className="bg-dark text-white" style={{ width: "70px" }}></th>
                        <th className="bg-dark text-white" style={{ width: "40px" }}></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{year}</td>
                        <td>
                            {(target === "yearly") ?
                                <Form>
                                <Form.Control
                                    placeholder="年のテーマ"
                                    value={themeForYear}
                                    onChange={(e) => setThemeForYear(e.target.value)}
                                />
                                </Form>
                                : themeForYear}
                        </td>
                        <td>
                            {(target === "yearly") ?
                                <Button
                                    className='btn-sm'
                                    onClick={() => {
                                        api.post('themes', {
                                            year: year,
                                            month: 0,
                                            theme: themeForYear
                                        });
                                        setTarget("");
                                    }}>保存</Button>
                                : ""}
                        </td>
                        <td>
                            <button
                                className="btn btn-link btn-sm"
                                onClick={() => setTarget((target === "yearly") ? "" : "yearly")}
                            >
                                <i className="bi bi-pencil"></i>
                            </button>
                        </td>
                    </tr>
                    <tr>
                        <td>{month}</td>
                        <td>
                            {(target === "monthly") ?
                                <Form>
                                <Form.Control
                                    placeholder="月のテーマ"
                                    value={themeForMonth}
                                    onChange={(e) => setThemeForMonth(e.target.value)}
                                />
                                </Form>
                                : themeForMonth}
                        </td>
                        <td>
                            {(target === "monthly") ?
                                <Button
                                    className='btn-sm'
                                    onClick={() => {
                                        api.post('themes', {
                                            year: year,
                                            month: month,
                                            theme: themeForMonth
                                        });
                                        setTarget("");
                                    }}>保存</Button>
                                : ""}
                        </td>
                        <td>
                            <button
                                className="btn btn-link btn-sm"
                                onClick={() => setTarget((target === "monthly") ? "" : "monthly")}
                            >
                                <i className="bi bi-pencil"></i>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default ThemeTable;
