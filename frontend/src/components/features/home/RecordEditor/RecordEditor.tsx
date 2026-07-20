import React from 'react';

import ThemeTable from './ThemeTable';
import RecordTable from './RecordTable';

type Props = {
    year: number;
    month: number;
    recordsVersion: number;
};

const RecordEditor: React.FC<Props> = (props) => {
    const { year, month, recordsVersion } = props;

    return (
        <>
            <ThemeTable year={year} month={month} />
            <RecordTable year={year} month={month} recordsVersion={recordsVersion} />
        </>
    );
};

export { RecordEditor };
