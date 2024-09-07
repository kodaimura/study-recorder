import React, { useState, useEffect, ChangeEvent } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Record } from '../../../types/types';
import { api } from '../../../apis/api';


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

type Props = {
	year: number,
	month: number,
}

const RecordTable: React.FC<Props> = ({year, month}) => {
    const [data, setData] = useState<Record[]>(fillUpData(year, month, []));
    const [reload, setReload] = useState<number>(1);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [comment, setComment] = useState<string>('');
    const [minuteTime, setMinuteTime] = useState<number>(0);

    useEffect(() => {
        fetchData(year, month);
        resetEditState();
    }, [year, month, reload]);

	const fetchData = async (year: number, month: number) => {
		const records = await api.get(`records?year=${year}&month=${month}`);
		setData(fillUpData(year, month, records));
	};

    const handleSave = async (day: number) => {
        await api.post('records', {
            year,
            month,
            day,
            comment,
            minuteTime,
        });
        setReload(reload * -1);
    };

    const resetEditState = () => {
        setEditingIndex(null);
        setMinuteTime(0);
        setComment('');
    };

    const handleEditClick = (index: number, record: Record) => {
        if (editingIndex === index) {
            resetEditState();
        } else {
            setEditingIndex(index);
            setMinuteTime(record.minuteTime);
            setComment(record.comment);
        }
    };

    return (
        <div className="table-responsive">
            <table className="table table-sm table-bordered">
                <thead className="table-dark">
                    <tr>
                        <th style={{ width: "120px" }}>年月</th>
                        <th style={{ width: "70px" }}>日</th>
                        <th style={{ width: "90px" }}>記録 [m]</th>
                        <th>コメント</th>
                        <th style={{ width: "70px" }}></th>
                        <th style={{ width: "40px" }}></th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((record: Record, index: number) => (
                        <tr key={index}>
                            <td>{record.year}/{record.month}</td>
                            <td>{record.day}</td>
                            <td>
                                {editingIndex === index ? (
                                    <Form>
                                        <Form.Control
                                            type="number"
                                            value={minuteTime}
                                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
									    		const value = e.target.value === '' ? 0 : Number(e.target.value);
									    		setMinuteTime(isNaN(value) ? 0 : value);
									    	}}
                                        />
                                    </Form>
                                ) : (
                                    record.minuteTime
                                )}
                            </td>
                            <td>
                                {editingIndex === index ? (
                                    <Form>
                                        <Form.Control
                                            placeholder="free comment"
                                            value={comment}
                                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
									    		setComment(e.target.value);
									    	}}
                                        />
                                    </Form>
                                ) : (
                                    record.comment
                                )}
                            </td>
                            <td>
                                {editingIndex === index ? (
                                    <Button
                                        size="sm"
                                        onClick={() => handleSave(record.day)}
                                    >保存</Button>
                                ) : null}
                            </td>
                            <td>
                                <button
                                    className="btn btn-sm btn-outline-primary"
                                    onClick={() => handleEditClick(index, record)}
                                >
                                    <i className="bi bi-pencil"></i>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default RecordTable;
