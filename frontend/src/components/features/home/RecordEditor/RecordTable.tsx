import React, { useState, useEffect, ChangeEvent } from 'react';
import { Form, Button, Table, Badge } from 'react-bootstrap';

import { Record } from 'types/types';
import { api } from 'apis/api';
import { minuteToHour } from 'utils/utils';

const compareDate = (a: { day: number }, b: { day: number }): number => {
    return a.day - b.day;
};

const fillUpData = (year: number, month: number, data: Record[]): Record[] => {
    const newData: Record[] = [];
    data.sort(compareDate);
    const lastDay = new Date(year, month, 0).getDate();

    for (let i = 1; i <= lastDay; i++) {
        if (data[0] && data[0].day === i) {
            newData.push(data.shift()!);
        } else {
            newData.push({ year, month, day: i, minuteTime: 0, comment: '' });
        }
    }
    return newData;
};

const getWeekdayName = (year: number, month: number, day: number): string => {
    return ['日', '月', '火', '水', '木', '金', '土'][new Date(year, month - 1, day).getDay()];
};

const getDayChipClassName = (year: number, month: number, day: number): string => {
    const weekday = new Date(year, month - 1, day).getDay();
    if (weekday === 0) return 'day-chip sunday';
    if (weekday === 6) return 'day-chip saturday';
    return 'day-chip';
};

type Props = {
    year: number;
    month: number;
    recordsVersion: number;
}

const RecordTable: React.FC<Props> = ({ year, month, recordsVersion }) => {
    const [data, setData] = useState<Record[]>(fillUpData(year, month, []));
    const [reload, setReload] = useState<number>(1);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [comment, setComment] = useState<string>('');
    const [minuteTime, setMinuteTime] = useState<string>('0');
    const total = data.reduce((sum, record) => sum + record.minuteTime, 0);
    const activeDays = data.filter((record) => record.minuteTime > 0 || record.comment).length;

    useEffect(() => {
        fetchData(year, month);
        resetEditState();
    }, [year, month, reload, recordsVersion]);

    const fetchData = async (year: number, month: number) => {
        try {
            const records = await api.get(`records?year=${year}&month=${month}`);
            setData(fillUpData(year, month, records));
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleSave = async (day: number) => {
        try {
            await api.post('records', {
                year,
                month,
                day,
                comment,
                minuteTime: Number(minuteTime || 0),
            });
            setReload(reload * -1);
            resetEditState();
        } catch (error) {
            console.error('Error saving data:', error);
        }
    };

    const resetEditState = () => {
        setEditingIndex(null);
        setMinuteTime('0');
        setComment('');
    };

    const handleEditClick = (index: number, record: Record) => {
        if (editingIndex === index) {
            resetEditState();
        } else {
            setEditingIndex(index);
            setMinuteTime(String(record.minuteTime));
            setComment(record.comment);
        }
    };

    const handleMinuteTimeChange = (e: ChangeEvent<HTMLInputElement>) => {
        const digitsOnly = e.target.value.replace(/\D/g, '');
        const nextValue = digitsOnly === '' ? '' : String(Math.min(1440, Number(digitsOnly)));
        setMinuteTime(nextValue);
    };

    return (
        <div className="editor-card record-card">
            <div className="editor-card-heading record-heading">
                <div>
                    <h3>日別記録</h3>
                </div>
                <div className="record-stats">
                    <span>{activeDays} 日記録</span>
                    <strong>{minuteToHour(total)} h</strong>
                </div>
            </div>

            <div className="record-table-wrap">
            <Table hover responsive size="sm" className="editor-record-table">
                <thead>
                    <tr>
                        <th style={{ width: "120px" }}>日付</th>
                        <th style={{ width: "140px" }}>記録</th>
                        <th>コメント</th>
                        <th style={{ width: "150px" }}></th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((record: Record, index: number) => (
                        <tr key={index} className={editingIndex === index ? 'is-editing' : ''}>
                            <td className="align-middle">
                                <div className="record-date-cell">
                                    <span className={getDayChipClassName(year, month, record.day)}>
                                        {record.day}
                                    </span>
                                    <small>{getWeekdayName(year, month, record.day)}</small>
                                </div>
                            </td>
                            <td className="align-middle">
                                {editingIndex === index ? (
                                    <Form.Control
                                        type="text"
                                        inputMode="numeric"
                                        pattern="[0-9]*"
                                        size='sm'
                                        value={minuteTime}
                                        onChange={handleMinuteTimeChange}
                                    />
                                ) : (
                                    <div className="record-time-cell">
                                        <strong>{record.minuteTime}</strong>
                                        <span>分</span>
                                        {record.minuteTime > 0 && <Badge bg="light" text="dark">{minuteToHour(record.minuteTime)}h</Badge>}
                                    </div>
                                )}
                            </td>
                            <td className="align-middle">
                                {editingIndex === index ? (
                                    <Form.Control
                                        size='sm'
                                        placeholder="この日のメモ"
                                        value={comment}
                                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                            setComment(e.target.value);
                                        }}
                                    />
                                ) : (
                                    record.comment
                                )}
                            </td>
                            <td className="align-middle text-end">
                                {editingIndex === index ? (
                                    <div className="record-actions">
                                        <Button
                                            size="sm"
                                            variant="dark"
                                            onClick={() => handleSave(record.day)}
                                        >
                                            保存
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="outline-secondary"
                                            onClick={resetEditState}
                                        >
                                            キャンセル
                                        </Button>
                                    </div>
                                ) : (
                                    <Button
                                        size="sm"
                                        variant={record.minuteTime || record.comment ? 'outline-dark' : 'light'}
                                        className="edit-row-button"
                                        onClick={() => handleEditClick(index, record)}
                                    >
                                        <i className="bi bi-pencil me-1"></i>
                                        編集
                                    </Button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            </div>
        </div>
    );
};

export default RecordTable;
