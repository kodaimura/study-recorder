import React, { useState, useEffect, ChangeEvent } from 'react';
import Button from '../atoms/Button';
import Input from '../atoms/Input';
import { Record } from '../../types/types';
import { api } from '../../apis/api';


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
        const fetchData = async () => {
            const records = await api.get(`records?year=${year}&month=${month}`);
            setData(fillUpData(year, month, records));
        };

        fetchData();
        resetEditState();
    }, [year, month, reload]);

    const handleSave = async (day: number) => {
        await api.post('records', {
            year,
            month,
            day,
            comment,
            minuteTime: Number.isNaN(minuteTime) ? 0 : minuteTime,
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

    const handleInputChange = (setter: React.Dispatch<React.SetStateAction<any>>) => (event: ChangeEvent<HTMLInputElement>) => {
        setter(event.target.value);
    };

    return (
        <div className="table-responsive">
            <table className="table table-sm table-bordered">
                <thead className="table-dark">
                    <tr>
                        <th style={{ width: "120px" }}>Year/Month</th>
                        <th style={{ width: "70px" }}>Day</th>
                        <th style={{ width: "90px" }}>Time [m]</th>
                        <th>Comment</th>
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
                                    <Input
                                        type="number"
                                        value={minuteTime}
                                        onChange={handleInputChange(setMinuteTime)}
                                    />
                                ) : (
                                    record.minuteTime
                                )}
                            </td>
                            <td>
                                {editingIndex === index ? (
                                    <Input
                                        placeholder="free comment"
                                        value={comment}
                                        onChange={handleInputChange(setComment)}
                                    />
                                ) : (
                                    record.comment
                                )}
                            </td>
                            <td>
                                {editingIndex === index ? (
                                    <Button
                                        className="btn-sm"
                                        onClick={() => handleSave(record.day)}
                                    >
                                        Save
                                    </Button>
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

export { RecordTable };
