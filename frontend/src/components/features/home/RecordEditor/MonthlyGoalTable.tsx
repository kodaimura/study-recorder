import React, { useEffect, useState, ChangeEvent } from 'react';
import { Form, Button, Table } from 'react-bootstrap';

import { api } from 'apis/api';
import { MonthlyGoal } from 'types/types';
import { minuteToHour } from 'utils/utils';

type Props = {
    year: number;
    month: number;
    onGoalSaved: () => void;
};

const MonthlyGoalTable: React.FC<Props> = ({ year, month, onGoalSaved }) => {
    const [goal, setGoal] = useState<MonthlyGoal | null>(null);
    const [targetMinuteTime, setTargetMinuteTime] = useState(0);
    const [editing, setEditing] = useState(false);

    useEffect(() => {
        const fetchGoal = async () => {
            try {
                const monthlyGoal = await api.get(`goals/monthly?year=${year}&month=${month}`);
                setGoal(monthlyGoal);
                setTargetMinuteTime(monthlyGoal?.targetMinuteTime || 0);
                setEditing(false);
            } catch (error) {
                console.error('Error fetching monthly goal:', error);
                setGoal(null);
                setTargetMinuteTime(0);
                setEditing(false);
            }
        };
        fetchGoal();
    }, [year, month]);

    const handleSave = async () => {
        try {
            await api.post('goals/monthly', {
                year,
                month,
                targetMinuteTime,
            });
            setGoal({ year, month, targetMinuteTime });
            setEditing(false);
            onGoalSaved();
        } catch (error) {
            console.error('Error saving monthly goal:', error);
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value === '' ? 0 : Number(e.target.value);
        const nextValue = isNaN(value) ? 0 : Math.max(0, Math.floor(value));
        setTargetMinuteTime(nextValue);
    };

    return (
        <div className="table-responsive">
            <Table bordered striped hover size="sm">
                <thead>
                    <tr>
                        <th className="bg-dark text-white fs-6 text-center" style={{ width: '130px' }}>月目標</th>
                        <th className="bg-dark text-white fs-6 text-center">目標時間</th>
                        <th className="bg-dark text-white fs-6 text-center" style={{ width: '55px' }}></th>
                        <th className="bg-dark text-white fs-6 text-center" style={{ width: '40px' }}></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="align-middle text-center text-secondary">{year}年{month}月</td>
                        <td className="align-middle">
                            {editing ? (
                                <Form.Control
                                    type="number"
                                    min={0}
                                    max={44640}
                                    size="sm"
                                    value={targetMinuteTime}
                                    onChange={handleChange}
                                />
                            ) : (
                                goal?.targetMinuteTime ? `${goal.targetMinuteTime} 分 / ${minuteToHour(goal.targetMinuteTime)} 時間` : '未設定'
                            )}
                        </td>
                        <td>
                            {editing && (
                                <Button
                                    size="sm"
                                    variant="primary"
                                    onClick={handleSave}
                                >
                                    保存
                                </Button>
                            )}
                        </td>
                        <td>
                            <Button
                                size="sm"
                                variant="outline-primary"
                                onClick={() => setEditing(!editing)}
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

export default MonthlyGoalTable;
