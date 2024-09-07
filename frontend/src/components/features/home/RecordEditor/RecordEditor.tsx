import React from 'react';

import ThemeTable from './ThemeTable';
import RecordTable from './RecordTable';

type Props = {
    year: number;
    month: number;
};

const RecordEditor: React.FC<Props> = (props) => {
    const { year, month } = props;

    return (
        <>
			<ThemeTable year={year} month={month} />
			<RecordTable year={year} month={month} />
		</>
    );
};

export { RecordEditor };
