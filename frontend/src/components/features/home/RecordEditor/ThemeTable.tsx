import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';

import { api } from 'apis/api';

type Props = {
    year: number;
    month: number;
    onThemeSaved: () => void;
}

const ThemeTable: React.FC<Props> = ({ year, month, onThemeSaved }) => {
    const [themeForMonth, setThemeForMonth] = useState<string>("");
    const [saving, setSaving] = useState(false);

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
    }, [year, month]);

    const handleSave = async () => {
        try {
            setSaving(true);
            await api.post('themes', {
                year,
                month,
                theme: themeForMonth
            });
            onThemeSaved();
        } catch (error) {
            console.error('Error saving theme:', error);
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="editor-card theme-card">
            <div className="editor-card-heading">
                <div>
                    <h3>テーマ</h3>
                </div>
            </div>

            <div className="theme-field">
                <Form.Label className="editor-form-label">{month}月のテーマ</Form.Label>
                <div className="theme-input-row">
                    <Form.Control
                        placeholder="例: 毎朝30分読む"
                        value={themeForMonth}
                        onChange={(e) => setThemeForMonth(e.target.value)}
                    />
                    <Button
                        variant="outline-dark"
                        onClick={handleSave}
                        disabled={saving}
                    >
                        {saving ? "保存中" : "保存"}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ThemeTable;
