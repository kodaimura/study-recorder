import React, { useEffect, useState, ChangeEvent } from 'react';
import { Form, Button } from 'react-bootstrap';

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
    const [targetHours, setTargetHours] = useState('');
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const fetchGoal = async () => {
            try {
                const monthlyGoal = await api.get(`goals/monthly?year=${year}&month=${month}`);
                setGoal(monthlyGoal);
                setTargetHours(String(minuteToHour(monthlyGoal?.targetMinuteTime || 0)));
            } catch (error) {
                console.error('Error fetching monthly goal:', error);
                setGoal(null);
                setTargetHours('0');
            }
        };
        fetchGoal();
    }, [year, month]);

    const handleSave = async () => {
        const targetHourValue = Math.min(744, Number(targetHours || 0));
        const targetMinuteTime = targetHourValue * 60;

        try {
            setSaving(true);
            await api.post('goals/monthly', {
                year,
                month,
                targetMinuteTime,
            });
            setGoal({ year, month, targetMinuteTime });
            onGoalSaved();
        } catch (error) {
            console.error('Error saving monthly goal:', error);
        } finally {
            setSaving(false);
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const digitsOnly = e.target.value.replace(/\D/g, '');
        const nextValue = digitsOnly === '' ? '' : String(Math.min(744, Number(digitsOnly)));
        setTargetHours(nextValue);
    };

    const targetMinuteTime = goal?.targetMinuteTime || 0;
    const targetHourText = targetMinuteTime ? `${minuteToHour(targetMinuteTime)} h` : '未設定';
    const targetHourValue = Number(targetHours || 0);
    const targetPreviewMinute = targetHourValue * 60;
    const daysInMonth = new Date(year, month, 0).getDate();
    const dailyTarget = targetHourValue > 0 ? targetHourValue / daysInMonth : 0;
    const weeklyTarget = dailyTarget * 7;

    return (
        <div className="editor-card goal-card">
            <div className="editor-card-heading">
                <div>
                    <h3>月目標</h3>
                </div>
                <span className="goal-pill">{targetHourText}</span>
            </div>

            <Form.Group className="mt-3">
                <Form.Label className="editor-form-label">目標時間を時間単位で入力</Form.Label>
                <div className="goal-input-row">
                    <Form.Control
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        value={targetHours}
                        onChange={handleChange}
                    />
                    <span>h</span>
                </div>
                <Form.Text className="text-muted">
                    保存値: {targetPreviewMinute} 分。0にすると未設定扱いです。
                </Form.Text>
            </Form.Group>

            <div className="goal-metrics">
                <div>
                    <span>1日あたり</span>
                    <strong>{dailyTarget ? dailyTarget.toFixed(1) : '-'} h</strong>
                </div>
                <div>
                    <span>週あたり</span>
                    <strong>{weeklyTarget ? weeklyTarget.toFixed(1) : '-'} h</strong>
                </div>
            </div>

            <Button
                className="editor-primary-action mt-3"
                variant="dark"
                onClick={handleSave}
                disabled={saving}
            >
                <i className="bi bi-bullseye me-2"></i>
                {saving ? '保存中...' : '月目標を保存'}
            </Button>
        </div>
    );
};

export default MonthlyGoalTable;
