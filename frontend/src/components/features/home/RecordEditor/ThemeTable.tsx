import React, { useState, useEffect } from 'react';
import { Form, Button, Table } from 'react-bootstrap';

import { api } from 'apis/api';

type Props = {
    year: number;
    month: number;
}

const ThemeTable: React.FC<Props> = ({ year, month }) => {
    const [themeForYear, setThemeForYear] = useState<string>("");
    const [themeForMonth, setThemeForMonth] = useState<string>("");
    const [target, setTarget] = useState<string>("");

    useEffect(() => {
        const fetchYearlyTheme = async () => {
            try {
                const data = await api.get(`themes?year=${year}&month=0`);
                setThemeForYear((data && data.length) ? data[0].theme : "");
            } catch (error) {
                console.error('Error fetching yearly theme:', error);
            }
        };
        fetchYearlyTheme();
        setTarget("");
    }, [year]);

    useEffect(() => {
        const fetchMonthlyTheme = async () => {
            try {
                const data = await api.get(`themes?year=${year}&month=${month}`);
                setThemeForMonth((data && data.length) ? data[0].theme : "");
            } catch (error) {
                console.error('Error fetching monthly theme:', error);
            }
        };
        fetchMonthlyTheme();
        setTarget("");
    }, [year, month]);

    const handleSave = async (targetType: string, theme: string) => {
        try {
            await api.post('themes', {
                year,
                month: targetType === "monthly" ? month : 0,
                theme
            });
            setTarget("");
        } catch (error) {
            console.error('Error saving theme:', error);
        }
    };

    return (
        <div>
            <Table bordered striped hover size="sm">
                <thead>
                    <tr>
                        <th className="bg-dark text-white fs-6 text-center" style={{ width: "70px" }}>期間</th>
                        <th className="bg-dark text-white fs-6 text-center">テーマ</th>
                        <th className="bg-dark text-white fs-6 text-center" style={{ width: "55px" }}></th>
                        <th className="bg-dark text-white fs-6 text-center" style={{ width: "40px" }}></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="text-center text-secondary">{year}年</td>
                        <td>
                            {target === "yearly" ? (
                                <Form.Control
                                    size='sm'
                                    placeholder="年のテーマ"
                                    value={themeForYear}
                                    onChange={(e) => setThemeForYear(e.target.value)}
                                />
                            ) : (
                                themeForYear
                            )}
                        </td>
                        <td>
                            {target === "yearly" && (
                                <Button
                                    size="sm"
                                    variant="primary"
                                    onClick={() => handleSave("yearly", themeForYear)}
                                >
                                    保存
                                </Button>
                            )}
                        </td>
                        <td>
                            <Button
                                size="sm"
                                variant="outline-primary"
                                onClick={() => setTarget(target === "yearly" ? "" : "yearly")}
                            >
                                <i className="bi bi-pencil"></i>
                            </Button>
                        </td>
                    </tr>
                    <tr>
                        <td className="text-center text-secondary">{month}月</td>
                        <td>
                            {target === "monthly" ? (
                                <Form.Control
                                    size='sm'
                                    placeholder="月のテーマ"
                                    value={themeForMonth}
                                    onChange={(e) => setThemeForMonth(e.target.value)}
                                />
                            ) : (
                                themeForMonth
                            )}
                        </td>
                        <td>
                            {target === "monthly" && (
                                <Button
                                    size="sm"
                                    variant="primary"
                                    onClick={() => handleSave("monthly", themeForMonth)}
                                >
                                    保存
                                </Button>
                            )}
                        </td>
                        <td>
                            <Button
                                size="sm"
                                variant="outline-primary"
                                onClick={() => setTarget(target === "monthly" ? "" : "monthly")}
                            >
                                <i className="bi bi-pencil"></i>
                            </Button>
                        </td>
                    </tr>
                </tbody>
            </Table>
        </div>
    );
};

export default ThemeTable;
