import React from 'react';

import ThemeTable from './ThemeTable';
import RecordTable from './RecordTable';
import MonthlyGoalTable from './MonthlyGoalTable';

type Props = {
    year: number;
    month: number;
    recordsVersion: number;
    onGoalSaved: () => void;
};

const RecordEditor: React.FC<Props> = (props) => {
    const { year, month, recordsVersion, onGoalSaved } = props;

    return (
        <section className="record-editor">
            <div className="editor-summary-grid">
                <MonthlyGoalTable year={year} month={month} onGoalSaved={onGoalSaved} />
                <ThemeTable year={year} month={month} />
            </div>

            <RecordTable year={year} month={month} recordsVersion={recordsVersion} />
        </section>
    );
};

export { RecordEditor };
