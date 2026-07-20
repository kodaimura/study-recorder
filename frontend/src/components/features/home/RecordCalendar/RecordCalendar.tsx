import React, { useState, useEffect, ChangeEvent } from 'react';
import { Form, Table } from 'react-bootstrap';

import { AppModal } from 'components/common';
import { MonthlyGoal, Record } from 'types/types';
import { minuteToHour } from 'utils/utils';
import CalendarBody from './CalendarBody';
import CalendarHeader from './CalendarHeader';

import { api } from 'apis/api';

const compareDate = (a: { day: number }, b: { day: number }): number => (a.day < b.day ? -1 : 1);

const fillUpData = (year: number, month: number, data: Record[]): Record[] => {
    data.sort(compareDate);
    const lastDay = new Date(year, month, 0).getDate();
    const filledData = [];

    for (let i = 1; i <= lastDay; i++) {
        const dayRecord = data.find((record) => record.day === i);
        filledData.push(dayRecord || { year, month, day: i, minuteTime: 0, comment: '' });
    }
    return filledData;
};

const fillUpCalendarFirstWeek = (year: number, month: number, data: Record[]): Record[] => {
    const firstDayOfWeek = new Date(year, month - 1, 1).getDay();
    return [...Array(firstDayOfWeek).fill({ year, month, day: 0, minuteTime: 0, comment: '' }), ...data];
};

const splitArray = <T,>(array: T[], chunkSize: number): T[][] =>
    Array.from({ length: Math.ceil(array.length / chunkSize) }, (_, i) =>
        array.slice(i * chunkSize, (i + 1) * chunkSize)
    );

const makeCalendarData = (year: number, month: number, data: Record[]): Record[][] =>
    splitArray(fillUpCalendarFirstWeek(year, month, fillUpData(year, month, data)), 7);

type ModalType = 'record' | 'goal' | 'theme' | null;

type Props = {
    year: number;
    month: number;
    timeUnit: string;
    recordsVersion: number;
    goalsVersion: number;
    themesVersion: number;
};

const RecordCalendar: React.FC<Props> = (props) => {
    const [data, setData] = useState<Record[][]>([]);
    const [total, setTotal] = useState(0);
    const [goal, setGoal] = useState<MonthlyGoal | null>(null);
    const [theme, setTheme] = useState('');
    const [localRecordsVersion, setLocalRecordsVersion] = useState(0);
    const [localGoalsVersion, setLocalGoalsVersion] = useState(0);
    const [localThemesVersion, setLocalThemesVersion] = useState(0);
    const [modalType, setModalType] = useState<ModalType>(null);
    const [editingRecord, setEditingRecord] = useState<Record | null>(null);
    const [editMinuteTime, setEditMinuteTime] = useState('0');
    const [editComment, setEditComment] = useState('');
    const [editTargetHours, setEditTargetHours] = useState('0');
    const [editTheme, setEditTheme] = useState('');
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const fetchRecords = async () => {
            try {
                const records = await api.get(`records?year=${props.year}&month=${props.month}`);
                if (records) {
                    setTotal(records.reduce((sum: number, record: Record) => sum + record.minuteTime, 0));
                    setData(makeCalendarData(props.year, props.month, records));
                } else {
                    setTotal(0);
                    setData([]);
                }
            } catch (error) {
                console.error('Error fetching records:', error);
                setTotal(0);
                setData([]);
            }
        };
        fetchRecords();
    }, [props.year, props.month, props.recordsVersion, localRecordsVersion]);

    useEffect(() => {
        const fetchGoal = async () => {
            try {
                const monthlyGoal = await api.get(`goals/monthly?year=${props.year}&month=${props.month}`);
                setGoal(monthlyGoal);
            } catch (error) {
                console.error('Error fetching monthly goal:', error);
                setGoal(null);
            }
        };
        fetchGoal();
    }, [props.year, props.month, props.goalsVersion, localGoalsVersion]);

    useEffect(() => {
        const fetchTheme = async () => {
            try {
                const themes = await api.get(`themes?year=${props.year}&month=${props.month}`);
                setTheme((themes && themes.length) ? themes[0].theme : '');
            } catch (error) {
                console.error('Error fetching monthly theme:', error);
                setTheme('');
            }
        };
        fetchTheme();
    }, [props.year, props.month, props.themesVersion, localThemesVersion]);

    const closeModal = () => {
        setModalType(null);
        setEditingRecord(null);
        setEditMinuteTime('0');
        setEditComment('');
        setEditTargetHours('0');
        setEditTheme('');
        setSaving(false);
    };

    const openRecordModal = (record: Record) => {
        setEditingRecord(record);
        setEditMinuteTime(String(record.minuteTime));
        setEditComment(record.comment);
        setModalType('record');
    };

    const openGoalModal = () => {
        setEditTargetHours(String(minuteToHour(goal?.targetMinuteTime || 0)));
        setModalType('goal');
    };

    const openThemeModal = () => {
        setEditTheme(theme);
        setModalType('theme');
    };

    const handleDigitsOnly = (value: string, max: number): string => {
        const digitsOnly = value.replace(/\D/g, '');
        return digitsOnly === '' ? '' : String(Math.min(max, Number(digitsOnly)));
    };

    const saveRecord = async () => {
        if (!editingRecord) return;

        try {
            setSaving(true);
            await api.post('records', {
                year: editingRecord.year,
                month: editingRecord.month,
                day: editingRecord.day,
                minuteTime: Number(editMinuteTime || 0),
                comment: editComment,
            });
            setLocalRecordsVersion((version) => version + 1);
            closeModal();
        } catch (error) {
            console.error('Error saving calendar record:', error);
            setSaving(false);
        }
    };

    const saveGoal = async () => {
        try {
            setSaving(true);
            await api.post('goals/monthly', {
                year: props.year,
                month: props.month,
                targetMinuteTime: Number(editTargetHours || 0) * 60,
            });
            setLocalGoalsVersion((version) => version + 1);
            closeModal();
        } catch (error) {
            console.error('Error saving monthly goal:', error);
            setSaving(false);
        }
    };

    const saveTheme = async () => {
        try {
            setSaving(true);
            await api.post('themes', {
                year: props.year,
                month: props.month,
                theme: editTheme,
            });
            setLocalThemesVersion((version) => version + 1);
            closeModal();
        } catch (error) {
            console.error('Error saving monthly theme:', error);
            setSaving(false);
        }
    };

    const targetMinuteTime = goal?.targetMinuteTime || 0;
    const progress = targetMinuteTime > 0 ? Math.min(999, Math.round(total / targetMinuteTime * 100)) : 0;
    const totalValue = props.timeUnit === 'm' ? total : minuteToHour(total);
    const targetValue = props.timeUnit === 'm' ? targetMinuteTime : minuteToHour(targetMinuteTime);

    return (
        <div className="content-panel">
            <div className='summary-metrics'>
                <div className="summary-metric">
                    <span>合計</span>
                    <strong>{totalValue}<small>{props.timeUnit}</small></strong>
                </div>
                <button type="button" className="summary-metric summary-button" onClick={openGoalModal}>
                    <span>目標</span>
                    <strong>{targetValue}<small>{props.timeUnit}</small></strong>
                </button>
                <div className="summary-metric">
                    <span>達成率</span>
                    <strong>{targetMinuteTime > 0 ? progress : '-'}<small>%</small></strong>
                </div>
                <button type="button" className="summary-theme summary-button" onClick={openThemeModal}>
                    <span>テーマ</span>
                    <strong>{theme || '未設定'}</strong>
                </button>
            </div>
            <Table responsive="sm" className="calendar-table">
                <CalendarHeader />
                <CalendarBody
                    timeUnit={props.timeUnit}
                    records={data}
                    onEditRecord={openRecordModal}
                />
            </Table>

            <AppModal
                show={modalType === 'record'}
                title={editingRecord ? `${editingRecord.month}月${editingRecord.day}日の記録` : '記録編集'}
                onHide={closeModal}
                onSave={saveRecord}
                saving={saving}
            >
                <Form.Group className="mb-3">
                    <Form.Label>記録時間 [m]</Form.Label>
                    <Form.Control
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        value={editMinuteTime}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setEditMinuteTime(handleDigitsOnly(e.target.value, 1440))}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>メモ</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        value={editComment}
                        onChange={(e) => setEditComment(e.target.value)}
                    />
                </Form.Group>
            </AppModal>

            <AppModal
                show={modalType === 'goal'}
                title={`${props.year}年${props.month}月の目標`}
                onHide={closeModal}
                onSave={saveGoal}
                saving={saving}
            >
                <Form.Group>
                    <Form.Label>月目標 [h]</Form.Label>
                    <Form.Control
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        value={editTargetHours}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setEditTargetHours(handleDigitsOnly(e.target.value, 744))}
                    />
                </Form.Group>
            </AppModal>

            <AppModal
                show={modalType === 'theme'}
                title={`${props.year}年${props.month}月のテーマ`}
                onHide={closeModal}
                onSave={saveTheme}
                saving={saving}
            >
                <Form.Group>
                    <Form.Label>テーマ</Form.Label>
                    <Form.Control
                        value={editTheme}
                        onChange={(e) => setEditTheme(e.target.value)}
                    />
                </Form.Group>
            </AppModal>
        </div>
    );
};

export { RecordCalendar };
